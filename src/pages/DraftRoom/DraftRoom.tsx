import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Timer, Users, Trophy, Plus, Check, Info, AlertCircle, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import './DraftRoom.css';

interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  salary: number;
  avgPoints: number;
  isPicked?: boolean;
  pickedBy?: string;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  pickedCount: number;
}

const INITIAL_PLAYERS: Player[] = [
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
];

const PARTICIPANTS: Participant[] = [
  { id: 'user1', name: 'You', avatar: 'https://i.pravatar.cc/100?img=1', pickedCount: 0 },
  { id: 'user2', name: 'DraftKing99', avatar: 'https://i.pravatar.cc/100?img=2', pickedCount: 0 },
  { id: 'user3', name: 'BallerPro', avatar: 'https://i.pravatar.cc/100?img=3', pickedCount: 0 },
  { id: 'user4', name: 'HoopsMaster', avatar: 'https://i.pravatar.cc/100?img=4', pickedCount: 0 },
  { id: 'user5', name: 'NetSwish', avatar: 'https://i.pravatar.cc/100?img=5', pickedCount: 0 },
];

const SLOTS = ['PG', 'SG', 'SF', 'PF', 'C', 'G', 'F', 'UTIL'];

export default function DraftRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [timeLeft, setTimeLeft] = useState(30);
  const [round, setRound] = useState(1);
  const [currentPickerIndex, setCurrentPickerIndex] = useState(0);
  const [isSnakeReversed, setIsSnakeReversed] = useState(false);
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [userLineup, setUserLineup] = useState<(Player | null)[]>(new Array(8).fill(null));
  const [participants, setParticipants] = useState<Participant[]>(PARTICIPANTS);
  const [autoPickMessage, setAutoPickMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Available');
  const [showRoundOverlay, setShowRoundOverlay] = useState(false);
  const [isDraftStarted, setIsDraftStarted] = useState(false);
  const [preDraftTime, setPreDraftTime] = useState(60); // 1 minute countdown
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Pre-draft countdown logic
  useEffect(() => {
    if (!isDraftStarted && preDraftTime > 0) {
      const timer = setTimeout(() => setPreDraftTime(preDraftTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (!isDraftStarted && preDraftTime === 0) {
      setIsDraftStarted(true);
    }
  }, [preDraftTime, isDraftStarted]);

  // Round transition overlay
  useEffect(() => {
    if (isDraftStarted) {
      setShowRoundOverlay(true);
      const timeout = setTimeout(() => setShowRoundOverlay(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [round, isDraftStarted]);

  const currentPicker = participants[currentPickerIndex];
  const isUserTurn = currentPicker.id === 'user1';

  // Timer logic
  useEffect(() => {
    if (isDraftStarted && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isDraftStarted && timeLeft === 0) {
      handleAutoPick();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, currentPickerIndex, isDraftStarted]);

  // Simulate other users picking
  useEffect(() => {
    if (isDraftStarted && !isUserTurn) {
      const pickDelay = Math.random() * 5000 + 2000; // 2-7 seconds
      const timeout = setTimeout(() => {
        const bestAvailable = availablePlayers.find(p => !p.isPicked);
        if (bestAvailable) {
          handlePick(bestAvailable, currentPicker.id);
        }
      }, pickDelay);
      return () => clearTimeout(timeout);
    }
  }, [currentPickerIndex, isUserTurn]);

  const handlePick = (player: Player, userId: string) => {
    // Mark player as picked
    setAvailablePlayers(prev => prev.map(p => 
      p.id === player.id ? { ...p, isPicked: true, pickedBy: userId } : p
    ));

    // Update participant count
    setParticipants(prev => prev.map(p => 
      p.id === userId ? { ...p, pickedCount: p.pickedCount + 1 } : p
    ));

    // If it's the user, add to lineup
    if (userId === 'user1') {
      const emptySlotIndex = userLineup.findIndex(slot => slot === null);
      if (emptySlotIndex !== -1) {
        const newLineup = [...userLineup];
        newLineup[emptySlotIndex] = player;
        setUserLineup(newLineup);
      }
    }

    nextTurn();
  };

  const handleAutoPick = () => {
    const bestAvailable = availablePlayers.find(p => !p.isPicked);
    if (bestAvailable) {
      if (isUserTurn) {
        setAutoPickMessage(`Auto-picked: ${bestAvailable.name}`);
        setTimeout(() => setAutoPickMessage(null), 3000);
      }
      handlePick(bestAvailable, currentPicker.id);
    }
  };

  const nextTurn = () => {
    let nextIndex = currentPickerIndex;
    let nextReversed = isSnakeReversed;
    let nextRound = round;

    if (!isSnakeReversed) {
      if (currentPickerIndex === participants.length - 1) {
        // End of round, start snake reverse
        nextReversed = true;
        nextRound += 1;
      } else {
        nextIndex += 1;
      }
    } else {
      if (currentPickerIndex === 0) {
        // End of reversed round, start normal
        nextReversed = false;
        nextRound += 1;
      } else {
        nextIndex -= 1;
      }
    }

    if (nextRound > 8) {
      // Draft Finished
      alert("Draft Complete! Your lineup is locked.");
      navigate('/lobby');
      return;
    }

    setCurrentPickerIndex(nextIndex);
    setIsSnakeReversed(nextReversed);
    setRound(nextRound);
    setTimeLeft(30);
  };

  const salaryUsed = userLineup.reduce((sum, p) => sum + (p?.salary || 0), 0);
  const salaryRemaining = 50000 - salaryUsed;

  const timerColor = timeLeft > 15 ? 'text-accent' : timeLeft > 5 ? 'text-yellow-400' : 'text-red-500';
  const strokeDashoffset = (timeLeft / 30) * 283;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <main className="draft-room-container flex flex-col">
      {/* Pre-Draft Countdown Overlay */}
      <AnimatePresence>
        {!isDraftStarted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-primary flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="glass p-12 rounded-[40px] border-accent/20 relative overflow-hidden max-w-md w-full"
            >
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-[60px]" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent-blue/10 rounded-full blur-[60px]" />
              
              <Trophy className="w-16 h-16 text-accent mx-auto mb-6" />
              <h2 className="text-3xl font-black italic uppercase mb-2 tracking-tighter">Draft Starting Soon</h2>
              <p className="text-white/40 font-bold uppercase tracking-widest text-xs mb-8">Prepare your strategy</p>
              
              <div className="text-6xl font-black italic text-white mb-4 tabular-nums">
                {formatTime(preDraftTime)}
              </div>
              
              <div className="space-y-4 text-left bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">Draft Rules</p>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  30 seconds per pick
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Snake draft format
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  8 players per team
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Status Bar */}
      <header className="bg-primary/80 backdrop-blur-lg border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-tight">NBA Mega Slam Draft</h1>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Round {round} of 8</p>
          </div>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse",
          isUserTurn ? "bg-accent/20 text-accent border border-accent/30" : "bg-white/5 text-white/40"
        )}>
          {isUserTurn ? "Your Turn to Pick" : "Waiting for others..."}
        </div>
      </header>

      {/* Timer & Draft Order Section */}
      <section className="p-6 bg-gradient-to-b from-primary/50 to-transparent">
        <div className="flex items-center justify-between gap-8 mb-8">
          {/* Timer Ring */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="48" cy="48" r="45"
                className="stroke-white/5 fill-none"
                strokeWidth="6"
              />
              <motion.circle
                cx="48" cy="48" r="45"
                className={cn("fill-none transition-colors duration-500", 
                  timeLeft > 15 ? "stroke-accent" : timeLeft > 5 ? "stroke-yellow-400" : "stroke-red-500"
                )}
                strokeWidth="6"
                strokeDasharray="283"
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-2xl font-black italic", timerColor)}>
                {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
              <span className="text-[8px] font-bold text-white/30 uppercase">SEC</span>
            </div>
          </div>

          {/* Draft Order Strip */}
          <div className="flex-grow overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center gap-4">
              {participants.map((p, i) => (
                <div 
                  key={p.id}
                  className={cn(
                    "snake-order-item flex-shrink-0 flex flex-col items-center gap-2 p-2 rounded-2xl border border-transparent",
                    currentPickerIndex === i && "snake-order-active bg-white/5 border-white/10"
                  )}
                >
                  <div className="relative">
                    <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full border-2 border-primary" />
                    {currentPickerIndex === i && (
                      <div className="absolute -bottom-1 -right-1 bg-accent p-0.5 rounded-full">
                        <Zap className="w-2.5 h-2.5 text-primary fill-primary" />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-white/60 uppercase truncate w-16">{p.name}</p>
                    <p className="text-[8px] font-bold text-accent">{p.pickedCount}/8</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Salary Info */}
        <div className="glass p-4 rounded-2xl border-white/5 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-white/40 uppercase">Salary Used</p>
            <p className="text-sm font-black">${salaryUsed.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-white/40 uppercase">Remaining</p>
            <p className="text-sm font-black text-accent">${salaryRemaining.toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* Main Content: Lineup & Player List */}
      <section className="flex-grow px-6 pb-6 overflow-hidden flex flex-col gap-6">
        {/* User Lineup Slots */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {SLOTS.map((pos, i) => (
            <div 
              key={i}
              className={cn(
                "flex-shrink-0 w-24 h-24 rounded-2xl glass border border-white/5 flex flex-col items-center justify-center p-2 text-center transition-all",
                userLineup[i] ? "border-accent/20" : (isUserTurn && userLineup.findIndex(s => s === null) === i ? "user-slot-active" : "")
              )}
            >
              {userLineup[i] ? (
                <>
                  <p className="text-[8px] font-bold text-accent uppercase mb-1">{pos}</p>
                  <p className="text-[10px] font-black text-white line-clamp-2 leading-tight">{userLineup[i]?.name}</p>
                  <p className="text-[8px] font-bold text-white/40 mt-1">${userLineup[i]?.salary.toLocaleString()}</p>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-white/20" />
                  </div>
                  <p className="text-[10px] font-bold text-white/20 uppercase">{pos}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Tabs & Player List */}
        <div className="flex-grow flex flex-col glass rounded-[32px] border-white/5 overflow-hidden">
          <div className="flex border-b border-white/5">
            {['Available', 'Picked', 'Watchlist'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-4 text-[10px] font-black uppercase tracking-widest relative",
                  activeTab === tab ? "text-accent" : "text-white/40"
                )}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
              </button>
            ))}
          </div>

          <div className="player-list-container divide-y divide-white/5">
            {availablePlayers
              .filter(p => activeTab === 'Available' ? !p.isPicked : p.isPicked)
              .map((player) => (
                <div key={player.id} className="p-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs text-white/40">
                      {player.team}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{player.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase">
                        <span className="text-accent">{player.position}</span>
                        <span>•</span>
                        <span>{player.avgPoints} FPTS</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-black text-white">${player.salary.toLocaleString()}</p>
                      <p className="text-[9px] font-bold text-white/20 uppercase">Salary</p>
                    </div>
                    {player.isPicked ? (
                      <div className="px-3 py-1.5 rounded-lg bg-white/5 text-[10px] font-bold text-white/30 uppercase">
                        {player.pickedBy === 'user1' ? 'Picked' : 'Taken'}
                      </div>
                    ) : (
                      <button 
                        disabled={!isUserTurn}
                        onClick={() => handlePick(player, 'user1')}
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                          isUserTurn ? "bg-accent text-primary hover:scale-110 neon-glow" : "bg-white/5 text-white/20 cursor-not-allowed"
                        )}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Auto-pick Alert */}
      <AnimatePresence>
        {autoPickMessage && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-6 right-6 z-[60] auto-pick-toast"
          >
            <div className="bg-yellow-400 text-primary p-4 rounded-2xl flex items-center gap-3 font-bold shadow-2xl">
              <AlertCircle className="w-5 h-5" />
              {autoPickMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Round Transition Overlay */}
      <AnimatePresence>
        {showRoundOverlay && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-primary/40 backdrop-blur-sm pointer-events-none"
          >
            <div className="text-center">
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-accent font-black uppercase tracking-[0.3em] mb-2"
              >
                Get Ready
              </motion.p>
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-7xl font-black italic uppercase text-white drop-shadow-[0_0_30px_rgba(0,255,136,0.5)]"
              >
                Round {round}
              </motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Turn Notification */}
      <AnimatePresence>
        {isUserTurn && timeLeft === 30 && (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-accent text-primary px-12 py-6 rounded-[40px] font-black italic text-4xl uppercase tracking-tighter neon-glow">
              Your Turn!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
