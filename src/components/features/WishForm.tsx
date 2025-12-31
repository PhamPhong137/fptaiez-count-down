import React, { useState } from 'react';
import { Heart, Send, Sparkles } from 'lucide-react';

const FPTAIEZ_WISHES = [
  'a 2026 full of joy and success! 🎉',
  'good health and everything you wish for! ✨',
  'all your dreams come true in the new year! 🌟',
  'a prosperous and peaceful new year! 🧧',
  'happiness and lots of luck! 🍀',
  'wealth and prosperity in the new year! 💰',
  'a brilliant and memorable 2026! 🎆',
  'achieving all your goals! 🎯',
];

const WishForm: React.FC = () => {
  const [wish, setWish] = useState('');
  const [submittedWish, setSubmittedWish] = useState('');
  const [fptWish, setFptWish] = useState('');

  const handleSubmit = () => {
    if (!wish.trim()) return;
    
    const randomWish = FPTAIEZ_WISHES[Math.floor(Math.random() * FPTAIEZ_WISHES.length)];
    setSubmittedWish(wish);
    setFptWish(randomWish);
    setWish('');
  };

  const handleReset = () => {
    setSubmittedWish('');
    setFptWish('');
  };

  return (
    <div className="mt-16 w-full max-w-lg flex flex-col items-center px-4">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="text-pink-400" size={20} />
          <h3 className="font-semibold text-lg">Send Your New Year Wish</h3>
        </div>

        {submittedWish ? (
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl border-l-4 border-pink-400">
              <p className="text-white/60 text-sm mb-1">Your wish:</p>
              <p className="text-white italic leading-relaxed">"{submittedWish}"</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 rounded-xl border-l-4 border-yellow-400 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-yellow-400" size={16} />
                <span className="text-yellow-400 font-bold text-sm">FPTAIEZ</span>
              </div>
              <p className="text-white leading-relaxed text-lg">
                Wishing you {fptWish}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full text-sm text-white/40 hover:text-white transition-colors uppercase tracking-widest py-2"
            >
              Send another wish
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Enter your wish and hopes for 2026..."
              rows={3}
              className="bg-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400 border border-white/5 placeholder:text-white/20 resize-none"
            />
            <button
              onClick={handleSubmit}
              disabled={!wish.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Send Wish
              <Send size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishForm;
