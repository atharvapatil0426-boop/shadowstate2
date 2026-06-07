import React from 'react';
import { YjsProvider, useYjs } from './context/YjsContext';
import { CollaborativeCanvas } from './components/CollaborativeCanvas';
import { CollaborativeSidebar } from './components/CollaborativeSidebar';

const AppContent: React.FC = () => {
  const { isLoaded } = useYjs();

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-mono text-slate-400">Initializing Local-First Ledger Cache...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 antialiased">
      <CollaborativeCanvas />
      <CollaborativeSidebar />
    </div>
  );
};

function App() {
  return (
    <YjsProvider>
      <AppContent />
    </YjsProvider>
  );
}

export default App;