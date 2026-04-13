import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Timer, Plus, X, Search, Filter, Trophy, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import './SalaryCap.css';

interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  salary: number;
  avgPoints: number;
  image?: string;
}

const PLAYERS: Player[] = [
  { id: 1, name: "LeBron James", team: "LAL", position: "SF", salary: 10500, avgPoints: 52.4 },
  { id: 2, name: "Stephen Curry", team: "GSW", position: "PG", salary: 10200, avgPoints: 48.9 },
  { id: 3, name: "Giannis Antetokounmpo", team: "MIL", position: "PF", salary: 11000, avgPoints: 55.2 },
  { id: 4, name: "Kevin Durant", team: "PHX", position: "SF", salary: 9800, avgPoints: 46.5 },
  { id: 5, name: "Luka Doncic", team: "DAL", position: "PG", salary: 11500, avgPoints: 58.1 },
  { id: 6, name: "Joel Embiid", team: "PHI", position: "C", salary: 10800, avgPoints: 54.3 },
  { id: 7, name: "Jayson Tatum", team: "BOS", position: "SF", salary: 9500, avgPoints: 44.8 },
  { id: 8, name: "Nikola Jokic", team: "DEN", position: "C", salary: 11200, avgPoints: 56.7 },
  { id: 9, name: "Shai Gilgeous-Alexander", team: "OKC", position: "SG", salary: 10000, avgPoints: 49.2 },
  { id: 10, name: "Anthony Davis", team: "LAL", position: "PF", salary: 9600, avgPoints: 47.1 },
  { id: 11, name: "Damian Lillard", team: "MIL", position: "PG", salary: 9200, avgPoints: 42.5 },
  { id: 12, name: "Devin Booker", team: "PHX", position: "SG", salary: 9000, avgPoints: 41.8 },
  { id: 13, name: "Jimmy Butler", team: "MIA", position: "SF", salary: 8800, avgPoints: 40.2 },
  { id: 14, name: "Kawhi Leonard", team: "LAC", position: "SF", salary: 9100, avgPoints: 41.5 },
  { id: 15, name: "Kyrie Irving", team: "DAL", position: "SG", salary: 8900, avgPoints: 40.8 },
  { id: 16, name: "Ja Morant", team: "MEM", position: "PG", salary: 9400, avgPoints: 43.2 },
  { id: 17, name: "Trae Young", team: "ATL", position: "PG", salary: 9300, avgPoints: 42.8 },
  { id: 18, name: "Donovan Mitchell", team: "CLE", position: "SG", salary: 9200, avgPoints: 42.1 },
  { id: 19, name: "Bam Adebayo", team: "MIA", position: "C", salary: 8500, avgPoints: 38.5 },
  { id: 20, name: "Domantas Sabonis", team: "SAC", position: "PF", salary: 8700, avgPoints: 39.8 },
];

const SLOTS = [
  { id: 'PG', label: 'PG' },
  { id: 'SG', label: 'SG' },
  { id: 'SF', label: 'SF' },
  { id: 'PF', label: 'PF' },
  { id: 'C', label: 'C' },
  { id: 'G', label: 'G' },
  { id: 'F', label: 'F' },
  { id: 'UTIL', label: 'UTIL' },
];

const TOTAL_SALARY = 50000;

export default function SalaryCap() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedPlayers, setSelectedPlayers] = useState<Record<string, Player | null>>({
    PG: null, SG: null, SF: null, PF: null, C: null, G: null, F: null, UTIL: null
  });
  const [activeSlot, setActiveSlot] = useState<string>('PG');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'points' | 'salary' | 'value'>('points');
  const [showReview, setShowReview] = useState(false);

  const usedSalary = (Object.values(selectedPlayers) as (Player | null)[]).reduce((sum, p) => sum + (p?.salary || 0), 0);
  const remainingSalary = TOTAL_SALARY - usedSalary;
  const isOverBudget = remainingSalary < 0;
  const isLineupComplete = (Object.values(selectedPlayers) as (Player | null)[]).every(p => p !== null);

  const filteredPlayers = useMemo(() => {
    return PLAYERS.filter(player => {
      // Basic search
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           player.team.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Position filtering based on active slot
      let matchesPosition = false;
      if (activeSlot === 'G') {
        matchesPosition = ['PG', 'SG'].includes(player.position);
      } else if (activeSlot === 'F') {
        matchesPosition = ['SF', 'PF'].includes(player.position);
      } else if (activeSlot === 'UTIL') {
        matchesPosition = true;
      } else {
        matchesPosition = player.position === activeSlot;
      }

      // Check if player is already selected in another slot
      const isAlreadySelected = (Object.values(selectedPlayers) as (Player | null)[]).some(p => p?.id === player.id);

      return matchesSearch && matchesPosition && !isAlreadySelected;
    }).sort((a, b) => {
      if (sortBy === 'points') return b.avgPoints - a.avgPoints;
      if (sortBy === 'salary') return a.salary - b.salary;
      if (sortBy === 'value') return (b.avgPoints / b.salary) - (a.avgPoints / a.salary);
      return 0;
    });
  }, [activeSlot, searchQuery, selectedPlayers, sortBy]);

  const handleAddPlayer = (player: Player) => {
    if (isOverBudget && player.salary > 0) {
      // Allow adding even if over budget, but UI will show red
    }
    
    setSelectedPlayers(prev => {
      const next = { ...prev, [activeSlot]: player };
      
      // Auto-focus next empty slot
      const nextEmptySlot = SLOTS.find(s => next[s.id] === null);
      if (nextEmptySlot) {
        setActiveSlot(nextEmptySlot.id);
      }
      
      return next;
    });
  };

  const handleRemovePlayer = (slotId: string) => {
    setSelectedPlayers(prev => ({ ...prev, [slotId]: null }));
    setActiveSlot(slotId);
  };

  return (
    <main className="salary-cap-container flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 sticky-header-draft px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-sm font-black text-white uppercase tracking-tight">NBA Mega Slam</h1>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 uppercase">
                <Timer className="w-3 h-3" /> 02h 45m
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Remaining Salary</p>
            <p className={cn("text-xl font-black italic", isOverBudget ? "text-red-500" : "text-accent")}>
              ₹{remainingSalary.toLocaleString()}
            </p>
          </div>
        </div>
        
        {/* Salary Progress Bar */}
        <div className="salary-bar-container">
          <div 
            className={cn("salary-bar-fill", isOverBudget ? "bg-red-500" : "bg-accent")}
            style={{ width: `${Math.min(100, (usedSalary / TOTAL_SALARY) * 100)}%` }}
          />
        </div>
      </header>

      {/* Team Slots Section */}
      <section className="px-6 py-6 bg-primary/30">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {SLOTS.map((slot) => {
            const player = selectedPlayers[slot.id];
            const isActive = activeSlot === slot.id;

            return (
              <button
                key={slot.id}
                onClick={() => setActiveSlot(slot.id)}
                className={cn(
                  "flex-shrink-0 w-28 h-28 rounded-2xl glass border border-white/5 flex flex-col items-center justify-center p-3 text-center transition-all slot-card",
                  isActive && "slot-card-active scale-105",
                  player && "border-accent/20"
                )}
              >
                {player ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRemovePlayer(slot.id); }}
                      className="absolute -top-1 -right-1 p-1 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 transition-colors hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <p className="text-[9px] font-bold text-accent uppercase mb-1">{slot.label}</p>
                    <p className="text-[11px] font-black text-white line-clamp-2 leading-tight mb-1">{player.name}</p>
                    <p className="text-[9px] font-bold text-white/40">₹{player.salary.toLocaleString()}</p>
                  </div>
                ) : (
                  <>
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mb-2", isActive ? "bg-accent/20 text-accent" : "bg-white/5 text-white/20")}>
                      <Plus className="w-4 h-4" />
                    </div>
                    <p className={cn("text-[10px] font-bold uppercase", isActive ? "text-accent" : "text-white/20")}>{slot.label}</p>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Player List Section */}
      <section className="flex-grow flex flex-col px-6 pb-32">
        {/* Filters & Sorting */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Search players..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <Filter className="w-3 h-3" /> Filter
            </button>
            {[
              { id: 'points', label: 'Proj. Points' },
              { id: 'salary', label: 'Salary' },
              { id: 'value', label: 'Value' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id as any)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap",
                  sortBy === opt.id ? "bg-accent/10 border-accent/30 text-accent" : "bg-white/5 border-white/5 text-white/40"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="glass rounded-[32px] border-white/5 overflow-hidden flex-grow">
          <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Player</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Salary / Proj</span>
          </div>
          <div className="divide-y divide-white/5 overflow-y-auto max-h-[500px] no-scrollbar">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <div key={player.id} className="player-row p-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs text-white/40">
                      {player.team}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{player.name}</h4>
                      <p className="text-[10px] font-bold text-accent uppercase">{player.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-black text-white">₹{player.salary.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-white/40">{player.avgPoints} FPTS</p>
                    </div>
                    <button 
                      onClick={() => handleAddPlayer(player)}
                      className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center hover:scale-110 transition-transform neon-glow"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-white/20 font-bold italic">No players found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-6 py-6 bg-gradient-to-t from-primary via-primary/90 to-transparent border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <button 
            disabled={!isLineupComplete || isOverBudget}
            onClick={() => setShowReview(true)}
            className={cn(
              "w-full py-4 rounded-2xl font-black text-lg transition-all uppercase tracking-tighter italic flex items-center justify-center gap-2",
              isLineupComplete && !isOverBudget 
                ? "bg-accent text-primary neon-glow hover:scale-[1.02]" 
                : "bg-white/5 text-white/20 cursor-not-allowed"
            )}
          >
            {isOverBudget ? "Over Budget" : !isLineupComplete ? "Complete Lineup" : "Review Team"}
          </button>
        </div>
      </div>

      {/* Review Screen Overlay */}
      <AnimatePresence>
        {showReview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary flex flex-col"
          >
            <header className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
              <button onClick={() => setShowReview(false)} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-black italic uppercase">Review Lineup</h2>
              <div className="w-10" />
            </header>

            <div className="flex-grow overflow-y-auto px-6 py-8">
              <div className="max-w-md mx-auto space-y-4">
                <div className="glass p-6 rounded-3xl border-accent/20 mb-8 text-center">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Total Salary Used</p>
                  <h3 className="text-4xl font-black italic text-accent">₹{usedSalary.toLocaleString()}</h3>
                  <div className="flex items-center justify-center gap-2 mt-4 text-accent text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Lineup Valid
                  </div>
                </div>

                <div className="space-y-2">
                  {SLOTS.map(slot => {
                    const p = selectedPlayers[slot.id];
                    return (
                      <div key={slot.id} className="glass p-4 rounded-2xl border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-[10px] text-accent">
                            {slot.label}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{p?.name}</p>
                            <p className="text-[10px] font-bold text-white/40 uppercase">{p?.team} • {p?.position}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-white">₹{p?.salary.toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-accent">{p?.avgPoints} FPTS</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-6 bg-accent/5 rounded-2xl border border-accent/10 flex gap-4 items-start mt-8">
                  <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-white/60 leading-relaxed">
                    By confirming, you agree to the contest rules and entry fee. Your lineup will be locked when the first match starts.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-8 border-t border-white/5">
              <div className="max-w-md mx-auto">
                <button 
                  onClick={() => {
                    alert("Lineup Confirmed! Good luck!");
                    navigate('/lobby');
                  }}
                  className="w-full bg-accent text-primary py-4 rounded-2xl font-black text-xl neon-glow hover:scale-[1.02] transition-all uppercase italic tracking-tighter"
                >
                  Confirm Entry
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
