import React from 'react';
import { motion } from 'motion/react';
import { Users, Trophy, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

interface ContestCardProps {
  id: string | number;
  title: string;
  prizePool: number;
  entryFee: number;
  type: string;
  spotsTotal: number;
  spotsLeft: number;
  firstPrize: number;
  winnersPercent: number;
  maxEntries: number;
  isHot?: boolean;
  key?: React.Key;
}

export default function ContestCard({
  id,
  title,
  prizePool,
  entryFee,
  type,
  spotsTotal,
  spotsLeft,
  firstPrize,
  winnersPercent,
  maxEntries,
  isHot
}: ContestCardProps) {
  const navigate = useNavigate();
  const spotsFilled = spotsTotal - spotsLeft;
  const fillPercentage = (spotsFilled / spotsTotal) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-4 border-white/5 hover:border-accent/30 transition-all group"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black bg-white/10 px-2 py-0.5 rounded uppercase tracking-widest text-white/60">
              {type}
            </span>
            {isHot && (
              <span className="text-[10px] font-black bg-red-500/20 text-red-400 px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 fill-current" /> Hot
              </span>
            )}
          </div>
          <h3 className="font-bold text-sm text-white group-hover:text-accent transition-colors line-clamp-1">
            {title}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-white/40 uppercase mb-0.5">Entry</p>
          <p className="text-lg font-black text-white">
            {entryFee === 0 ? 'FREE' : `$${entryFee}`}
          </p>
        </div>
      </div>

      {/* Prize Pool Highlight */}
      <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/5">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-bold text-white/40 uppercase">Prize Pool</span>
          <Trophy className="w-3 h-3 text-accent" />
        </div>
        <p className="text-2xl font-black italic text-accent-blue tracking-tight">
          ${prizePool.toLocaleString()}
        </p>
      </div>

      {/* Middle Section: Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center text-[11px] font-bold mb-2">
          <div className="flex items-center gap-1 text-white/60">
            <Users className="w-3.5 h-3.5" />
            <span>{spotsLeft.toLocaleString()} spots left</span>
          </div>
          <span className="text-white/30">{spotsTotal.toLocaleString()} total</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${fillPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-accent to-accent-blue rounded-full"
          />
        </div>
      </div>

      {/* Bottom Section: Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex gap-4">
          <div>
            <p className="text-[9px] font-bold text-white/30 uppercase">1st Prize</p>
            <p className="text-xs font-bold text-accent">${firstPrize.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-white/30 uppercase">Winners</p>
            <p className="text-xs font-bold text-white">{winnersPercent}%</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-white/30 uppercase">Max Entry</p>
            <p className="text-xs font-bold text-white">{maxEntries}</p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate(`/contest/${id}`)}
          className="bg-accent text-primary px-6 py-2 rounded-xl text-xs font-black hover:scale-105 transition-transform neon-glow flex items-center gap-1"
        >
          JOIN <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}
