import { useState } from 'react';
import { motion } from 'motion/react';
import { Timer, Users, Trophy, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

const CONTESTS = [
  {
    id: 1,
    title: "NBA Mega GPP - $1M GTD",
    sport: "NBA",
    entryFee: 49,
    prizePool: 1000000,
    spotsTotal: 25000,
    spotsLeft: 4291,
    timeLeft: "02h 45m",
    type: "GPP",
    isHot: true
  },
  {
    id: 2,
    title: "Cricket Bash: Ind vs Aus",
    sport: "Cricket",
    entryFee: 99,
    prizePool: 500000,
    spotsTotal: 10000,
    spotsLeft: 120,
    timeLeft: "00h 15m",
    type: "Paid",
    isHot: true
  },
  {
    id: 3,
    title: "NBA Head-to-Head",
    sport: "NBA",
    entryFee: 500,
    prizePool: 900,
    spotsTotal: 2,
    spotsLeft: 1,
    timeLeft: "01h 10m",
    type: "Head-to-Head",
    isHot: false
  },
  {
    id: 4,
    title: "Rugby Championship Freebie",
    sport: "Rugby",
    entryFee: 0,
    prizePool: 1000,
    spotsTotal: 5000,
    spotsLeft: 2100,
    timeLeft: "05h 20m",
    type: "Free",
    isHot: false
  }
];

export default function Contests() {
  const [activeFilter, setActiveFilter] = useState('All');
  const sports = ['All', 'NBA', 'Cricket', 'Rugby'];

  const filteredContests = activeFilter === 'All' 
    ? CONTESTS 
    : CONTESTS.filter(c => c.sport === activeFilter);

  return (
    <section id="lobby" className="py-24 bg-primary relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black italic uppercase mb-4">
              Live & Upcoming <span className="text-accent">Contests</span>
            </h2>
            <p className="text-white/50 max-w-md">
              Choose your sport, join a contest, and start drafting your winning lineup.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setActiveFilter(sport)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                  activeFilter === sport 
                    ? "bg-accent text-primary neon-glow" 
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                )}
              >
                {sport}
              </button>
            ))}
            <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white/60">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredContests.map((contest, idx) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass p-5 rounded-2xl hover:border-accent/50 transition-all group relative"
            >
              {contest.isHot && (
                <div className="absolute -top-3 left-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter animate-pulse">
                  Filling Fast
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{contest.sport}</span>
                  <h3 className="font-bold text-sm leading-tight group-hover:text-accent transition-colors">
                    {contest.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-white/40 uppercase">Entry</span>
                  <p className="font-black text-lg">
                    {contest.entryFee === 0 ? 'FREE' : `$${contest.entryFee}`}
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-white/40 uppercase">Prize Pool</span>
                  <Trophy className="w-3 h-3 text-accent" />
                </div>
                <p className="text-xl font-black italic text-accent-blue">${contest.prizePool.toLocaleString()}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-white/60">
                    <Users className="w-3.5 h-3.5" />
                    <span>{contest.spotsLeft} spots left</span>
                  </div>
                  <span className="text-white/40">{contest.spotsTotal} total</span>
                </div>
                
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent to-accent-blue rounded-full"
                    style={{ width: `${((contest.spotsTotal - contest.spotsLeft) / contest.spotsTotal) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                    <Timer className="w-3.5 h-3.5" />
                    <span>{contest.timeLeft}</span>
                  </div>
                  <button className="bg-white text-primary px-4 py-1.5 rounded-lg text-xs font-black hover:bg-accent transition-colors">
                    JOIN
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="text-sm font-bold text-accent hover:underline underline-offset-4">
            View All Contests in Lobby
          </button>
        </div>
      </div>
    </section>
  );
}
