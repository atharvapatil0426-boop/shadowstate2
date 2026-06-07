import React, { useRef } from 'react';
import { useYjs } from '../context/YjsContext';
import { useCanvasState } from '../hooks/useCanvasState';
import { MapPin } from 'lucide-react';

export const CollaborativeCanvas: React.FC = () => {
  const { ydoc } = useYjs();
  const { pins, addPin } = useCanvasState(ydoc);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.map-pin-icon')) return;
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = parseFloat((((e.clientX - rect.left) / rect.width) * 100).toFixed(1));
    const y = parseFloat((((e.clientY - rect.top) / rect.height) * 100).toFixed(1));

    // IMPROVISATION: Sequential naming calculation avoiding modal thread blocks
    const nodeIndex = pins.length + 1;
    const computedLabel = `Sensor-${String.fromCharCode(65 + (nodeIndex % 26))}${nodeIndex}`;

    // Generates a random alphanumeric id string cleanly matching parameters
    const safeGeneratedId = Math.random().toString(36).substring(2, 11);
    addPin(safeGeneratedId, x, y, computedLabel);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 p-6 select-none">
      <div className="mb-4">
        <h1 className="text-xl font-bold font-mono tracking-tight text-emerald-400">
          ShadowState Blueprint Workspace
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-0.5">
          Click anywhere inside the grid mesh below to deploy an offline data node.
        </p>
      </div>

      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="flex-1 relative rounded-xl border border-slate-800/80 bg-slate-950 overflow-hidden cursor-crosshair shadow-inner bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] before:bg-[size:3rem_3rem] before:pointer-events-none"
      >
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="map-pin-icon absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10 transition-transform duration-150"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-full shadow-lg shadow-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center animate-in fade-in zoom-in-75 duration-200">
              <MapPin size={16} className="fill-emerald-400/20 stroke-[2.5]" />
            </div>
            <div className="mt-1 bg-slate-950/90 border border-slate-800 text-[10px] font-mono px-1.5 py-0.5 rounded text-emerald-400 shadow-xl font-bold whitespace-nowrap">
              {pin.label}
            </div>
          </div>
        ))}

        {pins.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <p className="text-xs font-mono text-slate-500 tracking-wider">
              [ GRID MESH MATRIX EMPTY & LOGGED ]
            </p>
          </div>
        )}
      </div>
    </div>
  );
};