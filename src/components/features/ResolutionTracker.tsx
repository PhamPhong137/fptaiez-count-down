import React, { useState } from 'react';
import { Target, Plus, Check, X } from 'lucide-react';
import type { Resolution } from '@/types';
import { INITIAL_RESOLUTIONS } from '@/constants';

const ResolutionTracker: React.FC = () => {
  const [resolutions, setResolutions] = useState<Resolution[]>(
    INITIAL_RESOLUTIONS.map((text, i) => ({
      id: String(i),
      text,
      completed: false,
    }))
  );
  const [newText, setNewText] = useState('');

  const addResolution = () => {
    if (!newText.trim()) return;
    setResolutions([
      ...resolutions,
      { id: Date.now().toString(), text: newText, completed: false },
    ]);
    setNewText('');
  };

  const toggle = (id: string) => {
    setResolutions(
      resolutions.map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  };

  const remove = (id: string) => {
    setResolutions(resolutions.filter((r) => r.id !== id));
  };

  return (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-full max-w-md mx-auto mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Target className="text-yellow-400 w-5 h-5" />
        <h3 className="text-xl font-semibold">2026 Goals</h3>
      </div>

      <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {resolutions.map((res) => (
          <div key={res.id} className="flex items-center justify-between group">
            <div
              onClick={() => toggle(res.id)}
              className="flex items-center gap-3 cursor-pointer flex-1"
            >
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  res.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-white/30'
                }`}
              >
                {res.completed && <Check size={14} className="text-white" />}
              </div>
              <span
                className={`text-sm ${
                  res.completed ? 'line-through text-white/40' : 'text-white/80'
                }`}
              >
                {res.text}
              </span>
            </div>
            <button
              onClick={() => remove(res.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-400"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="New goal..."
          className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 border border-white/5"
          onKeyDown={(e) => e.key === 'Enter' && addResolution()}
        />
        <button
          onClick={addResolution}
          className="bg-yellow-400 text-black p-2 rounded-lg hover:bg-yellow-300 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default ResolutionTracker;
