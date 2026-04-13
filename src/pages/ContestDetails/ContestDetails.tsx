import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Share2, Timer, Trophy, Users, ShieldCheck, Zap, Info, ListOrdered, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import './ContestDetails.css';

export default function ContestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  // Mock data for the selected contest
  const contest = {
    id,
    title: "NBA Mega Slam - $10K GPP",
    prizePool: 10000,
    entryFee: 49,
    firstPrize: 2000,
    spotsTotal: 250,
    spotsLeft: 42,
    timeLeft: "02h 45m",
    winnersPercent: 20,
    maxEntries: 20,
    startTime: "Today, 7:30 PM",
    matches: [
      { teams: "LAL vs GSW", time: "7:30 PM" },
      { teams: "BOS vs MIA", time: "8:00 PM" },
      { teams: "PHX vs DEN", time: "9:30 PM" }
    ],
    payouts: [
      { rank: "1st", prize: "$2,000" },
      { rank: "2nd", prize: "$1,000" },
      { rank: "3rd", prize: "$500" },
      { rank: "4th - 10th", prize: "$200" },
      { rank: "11th - 50th", prize: "$50" }
    ]
  };

  const tabs = ['Overview', 'Prizes', 'Rules'];

  return (
    <main className="bg-primary min-h-screen pb-32">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-lg border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-tight line-clamp-1">{contest.title}</h1>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 uppercase">
              <Timer className="w-3 h-3" /> {contest.timeLeft}
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <Share2 className="w-5 h-5 text-white/60" />
        </button>
      </header>

      {/* Hero Section */}
      <section className="pt-24 px-6 details-hero-gradient">
        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-3xl p-8 border-accent/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="text-[10px] font-black bg-red-500 text-white px-2 py-1 rounded uppercase tracking-widest animate-pulse">
                Filling Fast
              </span>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-2">Total Prize Pool</p>
              <h2 className="text-5xl font-black italic text-accent tracking-tighter">${contest.prizePool.toLocaleString()}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Entry Fee</p>
                <p className="text-xl font-black">${contest.entryFee}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                <p className="text-[10px] font-bold text-white/40 uppercase mb-1">1st Prize</p>
                <p className="text-xl font-black text-accent-blue">${contest.firstPrize.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <div className="flex items-center gap-1.5 text-white/60">
                  <Users className="w-4 h-4" />
                  <span>{contest.spotsLeft} spots left</span>
                </div>
                <span className="text-white/30">{contest.spotsTotal} total</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((contest.spotsTotal - contest.spotsLeft) / contest.spotsTotal) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-accent to-accent-blue rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="px-6 mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex border-b border-white/5 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-4 text-xs font-black uppercase tracking-widest relative transition-colors",
                  activeTab === tab ? "text-accent" : "text-white/40 hover:text-white/60"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Contest Size', value: contest.spotsTotal, icon: Users },
                      { label: 'Max Entries', value: contest.maxEntries, icon: ListOrdered },
                      { label: 'Winners', value: `${contest.winnersPercent}%`, icon: Trophy },
                      { label: 'Start Time', value: contest.startTime, icon: Timer },
                    ].map((item, i) => (
                      <div key={i} className="glass p-4 rounded-2xl border-white/5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white/30 uppercase">{item.label}</p>
                          <p className="text-sm font-black">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="glass p-6 rounded-3xl border-white/5">
                    <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent" /> Match Slate
                    </h4>
                    <div className="space-y-4">
                      {contest.matches.map((match, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                          <span className="font-bold text-sm">{match.teams}</span>
                          <span className="text-xs text-white/40">{match.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Prizes' && (
                <div className="glass rounded-3xl border-white/5 overflow-hidden">
                  <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Rank</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Prize</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {contest.payouts.map((payout, i) => (
                      <div key={i} className="px-6 py-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                        <span className={cn("font-bold text-sm", i === 0 && "text-accent")}>{payout.rank}</span>
                        <span className={cn("font-black text-sm", i === 0 && "text-accent")}>{payout.prize}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 bg-accent/5 text-center">
                    <p className="text-xs font-bold text-accent">Top {contest.winnersPercent}% of players win a prize!</p>
                  </div>
                </div>
              )}

              {activeTab === 'Rules' && (
                <div className="space-y-6">
                  <div className="glass p-6 rounded-3xl border-white/5">
                    <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Info className="w-4 h-4 text-accent" /> Quick Rules
                    </h4>
                    <ul className="space-y-4">
                      {[
                        "Select 8 players under $50,000 salary cap",
                        "Earn points based on real performance",
                        "Captain gets 2x points",
                        "Lineups lock at match start time",
                        "Late swap available for upcoming matches"
                      ].map((rule, i) => (
                        <li key={i} className="flex gap-3 text-sm text-white/60 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="glass p-6 rounded-3xl border-white/5">
                    <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-accent-blue" /> Scoring Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-white/40">Point</span>
                        <span className="font-bold">+1.0</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-white/40">Rebound</span>
                        <span className="font-bold">+1.2</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-white/40">Assist</span>
                        <span className="font-bold">+1.5</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-white/40">Steal/Block</span>
                        <span className="font-bold">+3.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 mt-12 mb-8">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-8 opacity-40">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> 100% Secure
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <Zap className="w-4 h-4" /> Instant Payouts
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <Trophy className="w-4 h-4" /> Fair Play
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-6 py-6 sticky-cta-container border-t border-white/5">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3">
          <button 
            onClick={() => navigate(`/draft/${id}`)}
            className="bg-white/5 text-white border border-white/10 py-4 rounded-2xl font-black text-[10px] hover:bg-white/10 transition-all uppercase tracking-tighter italic"
          >
            Snake
          </button>
          <button 
            onClick={() => navigate(`/salary-cap/${id}`)}
            className="bg-white/5 text-white border border-white/10 py-4 rounded-2xl font-black text-[10px] hover:bg-white/10 transition-all uppercase tracking-tighter italic"
          >
            Salary
          </button>
          <button 
            onClick={() => navigate(`/auction/${id}`)}
            className="bg-accent text-primary py-4 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all neon-glow uppercase tracking-tighter italic"
          >
            Auction
          </button>
        </div>
      </div>
    </main>
  );
}
