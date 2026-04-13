import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  Info, 
  Plus, 
  X, 
  Check, 
  Zap, 
  Calendar,
  Shield,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../lib/utils';
import './TournamentTeamBuilder.css';

interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  salary: number;
  avgPoints: number;
  image: string;
  match: string;
}

const PLAYERS: Player[] = [
  { id: 1, name: "LeBron James", team: "LAL", position: "SF", salary: 10500, avgPoints: 52.4, image: "https://picsum.photos/seed/lebron/200/200", match: "LAL vs GSW" },
  { id: 2, name: "Stephen Curry", team: "GSW", position: "PG", salary: 10200, avgPoints: 48.9, image: "https://picsum.photos/seed/curry/200/200", match: "LAL vs GSW" },
  { id: 3, name: "Giannis Antetokounmpo", team: "MIL", position: "PF", salary: 11000, avgPoints: 55.2, image: "https://picsum.photos/seed/giannis/200/200", match: "MIL vs PHI" },
  { id: 4, name: "Joel Embiid", team: "PHI", position: "C", salary: 10800, avgPoints: 54.3, image: "https://picsum.photos/seed/embiid/200/200", match: "MIL vs PHI" },
  { id: 5, name: "Luka Doncic", team: "DAL", position: "PG", salary: 11500, avgPoints: 58.1, image: "https://picsum.photos/seed/luka/200/200", match: "DAL vs PHX" },
  { id: 6, name: "Kevin Durant", team: "PHX", position: "SF", salary: 10000, avgPoints: 46.5, image: "https://picsum.photos/seed/kd/200/200", match: "DAL vs PHX" },
  { id: 7, name: "Jayson Tatum", team: "BOS", position: "SF", salary: 9800, avgPoints: 44.8, image: "https://picsum.photos/seed/tatum/200/200", match: "BOS vs MIA" },
  { id: 8, name: "Jimmy Butler", team: "MIA", position: "SF", salary: 9200, avgPoints: 41.2, image: "https://picsum.photos/seed/butler/200/200", match: "BOS vs MIA" },
  { id: 9, name: "Nikola Jokic", team: "DEN", position: "C", salary: 11200, avgPoints: 56.7, image: "https://picsum.photos/seed/jokic/200/200", match: "DEN vs LAC" },
  { id: 10, name: "Kawhi Leonard", team: "LAC", position: "SF", salary: 9500, avgPoints: 43.5, image: "https://picsum.photos/seed/kawhi/200/200", match: "DEN vs LAC" },
];

const MATCHES = [
  { id: 'm1', teams: 'LAL vs GSW', date: 'Apr 14' },
  { id: 'm2', teams: 'MIL vs PHI', date: 'Apr 15' },
  { id: 'm3', teams: 'DAL vs PHX', date: 'Apr 16' },
  { id: 'm4', teams: 'BOS vs MIA', date: 'Apr 17' },
  { id: 'm5', teams: 'DEN vs LAC', date: 'Apr 18' },
];

const SLOTS = ['PG', 'SG', 'SF', 'PF', 'C', 'G', 'F', 'UTIL'];
const TOTAL_SALARY = 100000; // Larger budget for tournament

export default function TournamentTeamBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedPlayers, setSelectedPlayers] = useState<Record<string, Player | null>>({
    PG: null, SG: null, SF: null, PF: null, C: null, G: null, F: null, UTIL: null
  });
  const [activeSlot, setActiveSlot] = useState<string>('PG');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMatchFilter, setActiveMatchFilter] = useState<string>('All');

  const usedSalary = (Object.values(selectedPlayers) as (Player | null)[]).reduce((sum, p) => sum + (p?.salary || 0), 0);
  const remainingSalary = TOTAL_SALARY - usedSalary;
  const isOverBudget = remainingSalary < 0;
  const isLineupComplete = (Object.values(selectedPlayers) as (Player | null)[]).every(p => p !== null);

  const filteredPlayers = useMemo(() => {
    return PLAYERS.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           player.team.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesMatch = activeMatchFilter === 'All' || player.match === activeMatchFilter;

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

      const isAlreadySelected = (Object.values(selectedPlayers) as (Player | null)[]).some(p => p?.id === player.id);

      return matchesSearch && matchesMatch && matchesPosition && !isAlreadySelected;
    }).sort((a, b) => b.avgPoints - a.avgPoints);
  }, [activeSlot, searchQuery, selectedPlayers, activeMatchFilter]);

  const togglePlayer = (player: Player) => {
    if (selectedPlayers[activeSlot]?.id === player.id) {
      setSelectedPlayers(prev => ({ ...prev, [activeSlot]: null }));
    } else {
      setSelectedPlayers(prev => ({ ...prev, [activeSlot]: player }));
      // Auto move to next empty slot
      const nextSlot = SLOTS.find(s => !selectedPlayers[s] && s !== activeSlot);
      if (nextSlot) setActiveSlot(nextSlot);
    }
  };

  const removePlayer = (slot: string) => {
    setSelectedPlayers(prev => ({ ...prev, [slot]: null }));
  };

  return (
    <div className="tournament-builder-container">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-sm font-black text-white uppercase tracking-tight">Tournament Lineup</h1>
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 text-accent" />
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">5 Matches • Week 14</p>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Budget Used</p>
              <p className={cn("text-xl font-black italic", isOverBudget ? "text-red-500" : "text-white")}>
                ₹{usedSalary.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Remaining</p>
              <p className={cn("text-xl font-black italic", isOverBudget ? "text-red-500" : "text-accent")}>
                ₹{remainingSalary.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        {/* Salary Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
          <motion.div 
            className={cn("h-full transition-colors duration-500", isOverBudget ? "bg-red-500" : "bg-accent")}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (usedSalary / TOTAL_SALARY) * 100)}%` }}
          />
        </div>
      </header>

      <main className="pt-28 pb-32 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Team Slots */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Your Tournament Roster</h2>
            <button 
              onClick={() => setSelectedPlayers({ PG: null, SG: null, SF: null, PF: null, C: null, G: null, F: null, UTIL: null })}
              className="text-[10px] font-black text-red-500/60 uppercase hover:text-red-500 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {SLOTS.map((slot) => {
              const player = selectedPlayers[slot];
              return (
                <div 
                  key={slot}
                  onClick={() => setActiveSlot(slot)}
                  className={cn(
                    "slot-row group cursor-pointer transition-all duration-300",
                    activeSlot === slot ? "active-slot" : "hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-4 p-3 rounded-2xl border border-white/5">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-colors",
                      player ? "bg-accent text-primary" : "bg-white/5 text-white/40"
                    )}>
                      {slot}
                    </div>
                    
                    {player ? (
                      <div className="flex-grow flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={player.image} alt={player.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <p className="text-sm font-bold text-white">{player.name}</p>
                            <p className="text-[10px] font-bold text-white/40 uppercase">{player.team} • {player.match}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-black italic text-white">₹{player.salary.toLocaleString()}</p>
                          <button 
                            onClick={(e) => { e.stopPropagation(); removePlayer(slot); }}
                            className="p-1.5 hover:bg-red-500/20 rounded-lg text-red-500/40 hover:text-red-500 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-grow flex items-center justify-between">
                        <p className="text-sm font-bold text-white/20 uppercase italic tracking-tighter">Select {slot}...</p>
                        <Plus className="w-4 h-4 text-white/10 group-hover:text-accent transition-colors" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Player Selection */}
        <div className="lg:col-span-7 flex flex-col h-[calc(100vh-12rem)]">
          {/* Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text"
                  placeholder="Search players or teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-accent outline-none transition-all"
                />
              </div>
              <button className="bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition-all">
                <Filter className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Match Filter */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              <button 
                onClick={() => setActiveMatchFilter('All')}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                  activeMatchFilter === 'All' ? "bg-accent text-primary" : "bg-white/5 text-white/40 hover:bg-white/10"
                )}
              >
                All Matches
              </button>
              {MATCHES.map(match => (
                <button 
                  key={match.id}
                  onClick={() => setActiveMatchFilter(match.teams)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                    activeMatchFilter === match.teams ? "bg-accent text-primary" : "bg-white/5 text-white/40 hover:bg-white/10"
                  )}
                >
                  {match.teams}
                </button>
              ))}
            </div>
          </div>

          {/* Player List */}
          <div className="flex-grow overflow-y-auto no-scrollbar space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredPlayers.map((player) => (
                <motion.div 
                  key={player.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="player-card group"
                >
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-accent/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={player.image} alt={player.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="absolute -bottom-1 -right-1 bg-primary border border-white/10 px-1.5 rounded text-[8px] font-black text-accent">
                          {player.position}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-accent transition-colors">{player.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-bold text-white/40 uppercase">{player.team}</span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span className="text-[10px] font-bold text-accent/60 uppercase">{player.match}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-xs font-black text-white">₹{player.salary.toLocaleString()}</p>
                        <div className="flex items-center gap-1 justify-end mt-0.5">
                          <TrendingUp className="w-3 h-3 text-accent" />
                          <p className="text-[10px] font-bold text-accent uppercase">{player.avgPoints} FPTS</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => togglePlayer(player)}
                        className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center hover:bg-accent hover:text-primary transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-primary/80 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:block">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Lineup Status</p>
            <div className="flex items-center gap-2">
              {SLOTS.map((s, i) => (
                <div key={i} className={cn("w-2 h-2 rounded-full", selectedPlayers[s] ? "bg-accent" : "bg-white/10")} />
              ))}
              <span className="text-xs font-bold text-white ml-2">
                {Object.values(selectedPlayers).filter(p => p !== null).length}/8 Selected
              </span>
            </div>
          </div>

          <button 
            disabled={!isLineupComplete || isOverBudget}
            className={cn(
              "w-full md:w-auto px-12 py-4 rounded-2xl font-black uppercase italic tracking-tighter text-lg transition-all flex items-center justify-center gap-3",
              isLineupComplete && !isOverBudget 
                ? "bg-accent text-primary neon-glow hover:scale-105 active:scale-95" 
                : "bg-white/5 text-white/20 cursor-not-allowed"
            )}
          >
            Enter Tournament <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
