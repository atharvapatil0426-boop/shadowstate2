/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebrtcProvider } from 'y-webrtc';

interface YjsContextType {
  ydoc: Y.Doc | null;
  indexeddbProvider: IndexeddbPersistence | null;
  webrtcProvider: WebrtcProvider | null;
  connectedPeers: string[];
  isMeshConnected: boolean;
  isLoaded: boolean;
  clientId: number;
}

const YjsContext = createContext<YjsContextType | undefined>(undefined);

export const YjsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [indexeddbProvider, setIndexeddbProvider] = useState<IndexeddbPersistence | null>(null);
  const [webrtcProvider, setWebrtcProvider] = useState<WebrtcProvider | null>(null);
  const [connectedPeers, setConnectedPeers] = useState<string[]>([]);
  const [isMeshConnected, setIsMeshConnected] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [clientId, setClientId] = useState<number>(0);

  useEffect(() => {
    let isActive = true;
    const doc = new Y.Doc();
    const id = doc.clientID;
    
    if (isActive) {
      setYdoc(doc);
      setClientId(id);
    }

    const localIndexeddb = new IndexeddbPersistence('shadow-state-blueprint-cache', doc);
    const localWebrtc = new WebrtcProvider('shadow-state-mesh-network', doc, {
      // Pointing to fallback local networks + public targets cleanly
      signaling: [
        'ws://localhost:4444',
        'wss://small-tires-kneel.loca.lt'
      ],
      peerOpts: {
        config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
      }
    });

    if (isActive) {
      setIndexeddbProvider(localIndexeddb);
      setWebrtcProvider(localWebrtc);
    }

    const syncPeerCount = () => {
      if (!isActive || !localWebrtc) return;
      const states = localWebrtc.awareness.getStates();
      const peerKeys = Array.from(states.keys())
        .map((key) => key.toString())
        .filter((peerId) => peerId !== doc.clientID.toString());
      
      setConnectedPeers(peerKeys);
      setIsMeshConnected(localWebrtc.connected || states.size > 1);
    };

    localWebrtc.on('status', syncPeerCount);
    localWebrtc.awareness.on('change', syncPeerCount);
    localWebrtc.awareness.on('update', syncPeerCount);

    localWebrtc.awareness.setLocalStateField('user', { 
      name: `Peer-${id}`,
      active: true 
    });

    // IMPROVISATION: Fallback protection logic if the cache database fires early
    localIndexeddb.on('synced', () => {
      if (isActive) setIsLoaded(true);
    });

    const fallbackTimeout = setTimeout(() => {
      if (isActive) setIsLoaded(true);
    }, 450);

    return () => {
      isActive = false;
      clearTimeout(fallbackTimeout);
      localWebrtc.destroy();
      localIndexeddb.destroy();
      doc.destroy();
    };
  }, []);

  return (
    <YjsContext.Provider value={{ 
      ydoc, 
      indexeddbProvider, 
      webrtcProvider, 
      connectedPeers, 
      isMeshConnected, 
      isLoaded, 
      clientId 
    }}>
      {children}
    </YjsContext.Provider>
  );
};

export const useYjs = () => {
  const context = useContext(YjsContext);
  if (!context) throw new Error('useYjs must be used within a YjsProvider');
  return context;
};