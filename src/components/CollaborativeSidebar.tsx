import React from 'react';
import { useYjs } from '../context/YjsContext';
import { useCanvasState } from '../hooks/useCanvasState';
import { Users, Wifi, WifiOff, ShieldAlert, History } from 'lucide-react';
import { NetworkController } from './NetworkController';

export const CollaborativeSidebar: React.FC = () => {
  const { ydoc, webrtcProvider, connectedPeers, isMeshConnected } = useYjs();
  const { pins } = useCanvasState(ydoc);

  const isOnline = isMeshConnected || connectedPeers.length > 0;
  const peerCount = connectedPeers.length > 0 
    ? connectedPeers.length 
    : webrtcProvider && webrtcProvider.awareness.getStates().size > 1 
      ? webrtcProvider.awareness.getStates().size - 1 
      : 0;

  return (
    <div className="w-80 h-full border-l border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 flex flex-col overflow-hidden select-none">
      <div className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          System Infrastructure
        </h2>
        <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300 flex items-center gap-2">
              {isOnline ? <Wifi size={16} className="text-emerald-400" /> : <WifiOff size={16} className="text-rose-400" />}
              Mesh Channel:
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isOnline ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
              {isOnline ? 'Active' : 'Offline Mode'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300 flex items-center gap-2">
              <Users size={16} className="text-indigo-400" />
              Active Peers:
            </span>
            <span className="text-sm font-mono font-bold text-slate-200 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
              {peerCount}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <NetworkController />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <History size={14} />
          Shared Node Ledger
        </h2>
        
        {pins.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-xl p-4 text-center">
            <ShieldAlert size={24} className="text-slate-600 mb-2" />
            <p className="text-xs text-slate-500">No telemetry data recorded in session space.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {pins.map((pin) => (
              <div key={pin.id} className="p-3 bg-slate-950/40 rounded-lg border border-slate-800 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-emerald-400 font-mono truncate max-w-[140px]">{pin.label}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(pin.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Coordinates: X[{pin.x.toFixed(1)}%] Y[{pin.y.toFixed(1)}%]
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};