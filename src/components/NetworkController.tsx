import React from 'react';
import { useYjs } from '../context/YjsContext';
import { Wifi, WifiOff, Activity } from 'lucide-react';

export const NetworkController: React.FC = () => {
  const { webrtcProvider, connectedPeers, isMeshConnected } = useYjs();

  // Determine if a connection is active locally or through network
  const isOnline = isMeshConnected || connectedPeers.length > 0;
  
  // Clean fallback mapping for cross-tab peers vs external socket connections
  const peerCount = connectedPeers.length > 0 
    ? connectedPeers.length 
    : webrtcProvider && webrtcProvider.awareness.getStates().size > 1 
      ? webrtcProvider.awareness.getStates().size - 1 
      : 0;

  const handleHealMesh = () => {
    if (!webrtcProvider) return;
    webrtcProvider.disconnect();
    setTimeout(() => {
      webrtcProvider.connect();
    }, 150);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 backdrop-blur-sm">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          System Infrastructure
        </h2>
        
        <div className="space-y-3">
          {/* MESH CHANNEL BADGE */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400 flex items-center gap-2">
              {isOnline ? <Wifi size={14} className="text-emerald-400" /> : <WifiOff size={14} className="text-rose-400" />}
              Mesh Channel:
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors duration-200 ${
              isOnline ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              {isOnline ? 'Mesh Online' : 'Offline Mode'}
            </span>
          </div>

          {/* ACTIVE PEERS COUNT */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400 flex items-center gap-2">
              <Activity size={14} className="text-blue-400" />
              Active Peers:
            </span>
            <span className="text-sm font-mono font-bold text-slate-200 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {peerCount}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800/60">
          <button
            onClick={handleHealMesh}
            className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          >
            Re-Sync Mesh Channel
          </button>
        </div>
      </div>
    </div>
  );
};