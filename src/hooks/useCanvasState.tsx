import { useEffect, useState, useCallback } from 'react';
import * as Y from 'yjs';

export interface Pin {
  id: string;
  x: number;
  y: number;
  label: string;
  timestamp: number;
}

interface RawPinData {
  x: number;
  y: number;
  label: string;
  timestamp: number;
}

export const useCanvasState = (ydoc: Y.Doc | null) => {
  const [pins, setPins] = useState<Pin[]>([]);

  const getSharedMap = useCallback(() => {
    if (!ydoc) return null;
    return ydoc.getMap<RawPinData>('canvas-elements');
  }, [ydoc]);

  const updatePinsFromMap = useCallback(() => {
    const sharedMap = getSharedMap();
    if (!sharedMap) return;

    const currentPins: Pin[] = [];
    sharedMap.forEach((value, key) => {
      currentPins.push({ id: key, ...value });
    });
    
    setPins(currentPins.sort((a, b) => b.timestamp - a.timestamp));
  }, [getSharedMap]);

  useEffect(() => {
    const sharedMap = getSharedMap();
    if (!sharedMap) return;

    let isActive = true;

    // Defers initial local state synchronization safely
    const timer = setTimeout(() => {
      if (isActive) {
        updatePinsFromMap();
      }
    }, 0);

    const observerCallback = () => {
      if (isActive) updatePinsFromMap();
    };

    sharedMap.observe(observerCallback);

    return () => {
      isActive = false;
      clearTimeout(timer);
      sharedMap.unobserve(observerCallback);
    };
  }, [ydoc, getSharedMap, updatePinsFromMap]);

  const addPin = useCallback((id: string, x: number, y: number, label: string) => {
    const sharedMap = getSharedMap();
    if (!sharedMap || !ydoc) return;

    ydoc.transact(() => {
      sharedMap.set(id, {
        x,
        y,
        label,
        timestamp: Date.now(),
      });
    });
  }, [ydoc, getSharedMap]);

  return { pins, addPin };
};