import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Gavel, Timer, Users, Trophy, Plus, Check, Info, AlertCircle, Zap, DollarSign, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import './AuctionDraft.css';

interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  minBid: number;
  avgPoints: number;
  image: string;
}

interface Bid {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: number;
}

interface DraftResult {
  player: Player;
  winnerName: string;
  winnerId: string;
  amount: number;
}

const AUCTION_PLAYERS: Player[] = [
  { id: 1, name: "LeBron James", team: "LAL", position: "SF", minBid: 5000, avgPoints: 52.4, image: "https://picsum.photos/seed/lebron/400/400" },
  { id: 2, name: "Stephen Curry", team: "GSW", position: "PG", minBid: 4800, avgPoints: 48.9, image: "https://picsum.photos/seed/curry/400/400" },
  { id: 3, name: "Giannis Antetokounmpo", team: "MIL", position: "PF", minBid: 5200, avgPoints: 55.2, image: "https://picsum.photos/seed/giannis/400/400" },
  { id: 4, name: "Kevin Durant", team: "PHX", position: "SF", minBid: 4500, avgPoints: 46.5, image: "https://picsum.photos/seed/kd/400/400" },
  { id: 5, name: "Luka Doncic", team: "DAL", position: "PG", minBid: 5500, avgPoints: 58.1, image: "https://picsum.photos/seed/luka/400/400" },
  { id: 6, name: "Joel Embiid", team: "PHI", position: "C", minBid: 5100, avgPoints: 54.3, image: "https://picsum.photos/seed/embiid/400/400" },
  { id: 7, name: "Jayson Tatum", team: "BOS", position: "SF", minBid: 4600, avgPoints: 44.8, image: "https://picsum.photos/seed/tatum/400/400" },
  { id: 8, name: "Nikola Jokic", team: "DEN", position: "C", minBid: 5300, avgPoints: 56.7, image: "https://picsum.photos/seed/jokic/400/400" },
];

const OTHER_USERS = [
  { id: 'user2', name: 'DraftKing99', avatar: 'https://i.pravatar.cc/100?img=2', budget: 50000, roster: [] as Player[] },
  { id: 'user3', name: 'BallerPro', avatar: 'https://i.pravatar.cc/100?img=3', budget: 50000, roster: [] as Player[] },
  { id: 'user4', name: 'HoopsMaster', avatar: 'https://i.pravatar.cc/100?img=4', budget: 50000, roster: [] as Player[] },
];

export default function AuctionDraft() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per auction
  const [bids, setBids] = useState<Bid[]>([]);
  const [userBid, setUserBid] = useState<string>('');
  const [userBudget, setUserBudget] = useState(50000);
  const [userLineup, setUserLineup] = useState<Player[]>([]);
  const [auctionStatus, setAuctionStatus] = useState<'active' | 'closed'>('active');
  const [winner, setWinner] = useState<{ name: string; amount: number } | null>(null);
  const [draftHistory, setDraftHistory] = useState<DraftResult[]>([]);
  const [activeTab, setActiveTab] = useState<'Feed' | 'Queue' | 'Board' | 'Teams'>('Feed');
  const [otherUsers, setOtherUsers] = useState(OTHER_USERS);

  const currentPlayer = AUCTION_PLAYERS[currentPlayerIndex];
  const upcomingPlayers = AUCTION_PLAYERS.slice(currentPlayerIndex + 1);
  const currentHighBid = bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : currentPlayer.minBid;
  const highBidder = bids.length > 0 ? bids.sort((a, b) => b.amount - a.amount)[0] : null;

  // Auction Timer
  useEffect(() => {
    if (auctionStatus === 'active' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (auctionStatus === 'active' && timeLeft === 0) {
      handleAuctionEnd();
    }
  }, [timeLeft, auctionStatus]);

  // Simulate other users bidding
  useEffect(() => {
    if (auctionStatus === 'active' && timeLeft > 3) {
      const bidChance = Math.random();
      if (bidChance > 0.7) { // 30% chance of a bid every few seconds
        const randomDelay = Math.random() * 3000 + 1000;
        const timeout = setTimeout(() => {
          const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
          // Only bid if they have budget
          if (randomUser.budget > currentHighBid + 500) {
            const bidAmount = currentHighBid + Math.floor(Math.random() * 500 + 100);
            placeBid(randomUser.id, randomUser.name, bidAmount);
          }
        }, randomDelay);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentHighBid, auctionStatus, timeLeft, otherUsers]);

  const placeBid = (userId: string, userName: string, amount: number) => {
    if (amount <= currentHighBid) return;
    
    const newBid: Bid = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      userName,
      amount,
      timestamp: Date.now()
    };

    setBids(prev => [newBid, ...prev].slice(0, 5)); // Keep last 5 bids
    setTimeLeft(prev => Math.min(prev + 3, 15)); // Add time on bid (max 15s)
  };

  const handleUserBid = () => {
    const amount = parseInt(userBid);
    if (isNaN(amount) || amount <= currentHighBid) {
      alert(`Bid must be higher than ₹${currentHighBid.toLocaleString()}`);
      return;
    }
    if (amount > userBudget) {
      alert("Insufficient budget!");
      return;
    }

    placeBid('user1', 'You', amount);
    setUserBid('');
  };

  const handleAuctionEnd = () => {
    setAuctionStatus('closed');
    const winningBid = bids.length > 0 ? bids[0] : null;
    
    if (winningBid) {
      setWinner({ name: winningBid.userName, amount: winningBid.amount });
      
      const result: DraftResult = {
        player: currentPlayer,
        winnerName: winningBid.userName,
        winnerId: winningBid.userId,
        amount: winningBid.amount
      };
      setDraftHistory(prev => [result, ...prev]);

      if (winningBid.userId === 'user1') {
        setUserBudget(prev => prev - winningBid.amount);
        setUserLineup(prev => [...prev, currentPlayer]);
      } else {
        setOtherUsers(prev => prev.map(u => 
          u.id === winningBid.userId 
            ? { ...u, budget: u.budget - winningBid.amount, roster: [...u.roster, currentPlayer] }
            : u
        ));
      }
    } else {
      setWinner({ name: 'No One', amount: 0 });
    }

    // Move to next player after 3 seconds
    setTimeout(() => {
      if (currentPlayerIndex < AUCTION_PLAYERS.length - 1) {
        setCurrentPlayerIndex(prev => prev + 1);
        setBids([]);
        setTimeLeft(15);
        setAuctionStatus('active');
        setWinner(null);
      } else {
        alert("Auction Draft Complete!");
        navigate('/lobby');
      }
    }, 3000);
  };

  return (
    <main className="auction-draft-container flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-primary/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-tight">Auction Draft Room</h1>
            <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Player {currentPlayerIndex + 1} of {AUCTION_PLAYERS.length}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Your Budget</p>
          <p className="text-sm font-black text-accent">₹{userBudget.toLocaleString()}</p>
        </div>
      </header>

      {/* Auction Hero Section */}
      <section className="auction-hero p-6 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Player Image & Info */}
          <div className="relative mb-6">
            <motion.div 
              key={currentPlayer.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-48 h-48 mx-auto rounded-[40px] overflow-hidden border-2 border-accent/20 neon-border-pulse"
            >
              <img src={currentPlayer.image} alt={currentPlayer.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-accent text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              {currentPlayer.position}
            </div>
          </div>

          <h2 className="text-3xl font-black italic uppercase text-white mb-1">{currentPlayer.name}</h2>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs mb-6">{currentPlayer.team} • {currentPlayer.avgPoints} Avg FPTS</p>

          {/* Current Bid & Timer */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="glass p-4 rounded-2xl border-white/5">
              <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Current Bid</p>
              <p className="text-2xl font-black italic text-accent">₹{currentHighBid.toLocaleString()}</p>
              <p className="text-[9px] font-bold text-white/20 uppercase mt-1">Min: ₹{currentPlayer.minBid.toLocaleString()}</p>
            </div>
            <div className="glass p-4 rounded-2xl border-white/5 flex flex-col items-center justify-center">
              <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Time Left</p>
              <div className="flex items-center gap-2">
                <Timer className={cn("w-5 h-5", timeLeft < 5 ? "text-red-500 animate-pulse" : "text-white")} />
                <span className={cn("text-2xl font-black italic tabular-nums", timeLeft < 5 ? "text-red-500" : "text-white")}>
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
              </div>
            </div>
          </div>

          {/* Bidding Controls */}
          {auctionStatus === 'active' ? (
            <div className="flex gap-3">
              <div className="relative flex-grow">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                  type="number"
                  placeholder="Enter bid amount"
                  value={userBid}
                  onChange={(e) => setUserBid(e.target.value)}
                  className="w-full bid-input rounded-2xl py-4 pl-10 pr-4 text-sm font-bold"
                />
              </div>
              <button 
                onClick={handleUserBid}
                className="bg-accent text-primary px-8 rounded-2xl font-black uppercase italic tracking-tighter hover:scale-105 transition-transform neon-glow"
              >
                Bid
              </button>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
              <h3 className="text-xl font-black italic uppercase text-red-500 mb-2">Bid Closed</h3>
              <p className="text-white/60 font-bold">
                Assigned to <span className="text-accent">{winner?.name}</span> for ₹{winner?.amount.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Tabs for Feed, Queue, Board, Teams */}
      <section className="flex-grow flex flex-col overflow-hidden">
        <div className="flex border-b border-white/5 px-6">
          {['Feed', 'Queue', 'Board', 'Teams'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "flex-1 py-4 text-[10px] font-black uppercase tracking-widest relative transition-colors",
                activeTab === tab ? "text-accent" : "text-white/40"
              )}
            >
              {tab}
              {activeTab === tab && <motion.div layoutId="auctionTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
            </button>
          ))}
        </div>

        <div className="flex-grow overflow-y-auto p-6 no-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'Feed' && (
              <motion.div 
                key="feed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {bids.map((bid) => (
                  <div 
                    key={bid.id}
                    className={cn(
                      "p-4 rounded-2xl border flex items-center justify-between",
                      bid.userId === 'user1' ? "bg-accent/10 border-accent/30" : "bg-white/5 border-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px]",
                        bid.userId === 'user1' ? "bg-accent text-primary" : "bg-white/10 text-white/60"
                      )}>
                        {bid.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{bid.userName}</p>
                        <p className="text-[8px] font-bold text-white/30 uppercase">Just now</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-black italic", bid.userId === 'user1' ? "text-accent" : "text-white")}>
                        ₹{bid.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                {bids.length === 0 && (
                  <div className="py-12 text-center opacity-20">
                    <Gavel className="w-8 h-8 mx-auto mb-3" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">No bids yet</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'Queue' && (
              <motion.div 
                key="queue"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {upcomingPlayers.map((p, i) => (
                  <div key={p.id} className="p-4 glass rounded-2xl border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-[10px] text-white/40">
                        {p.team}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{p.name}</p>
                        <p className="text-[10px] font-bold text-accent uppercase">{p.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-white">Min: ₹{p.minBid.toLocaleString()}</p>
                      <p className="text-[9px] font-bold text-white/40 uppercase">Upcoming in {i + 1}</p>
                    </div>
                  </div>
                ))}
                {upcomingPlayers.length === 0 && (
                  <div className="py-12 text-center opacity-20">
                    <AlertCircle className="w-8 h-8 mx-auto mb-3" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">No more players in queue</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'Board' && (
              <motion.div 
                key="board"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {draftHistory.map((res, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <img src={res.player.image} alt={res.player.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{res.player.name}</p>
                        <p className="text-[10px] font-bold text-white/40 uppercase">Won by <span className="text-accent">{res.winnerName}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black italic text-accent">₹{res.amount.toLocaleString()}</p>
                      <p className="text-[9px] font-bold text-white/20 uppercase">Final Price</p>
                    </div>
                  </div>
                ))}
                {draftHistory.length === 0 && (
                  <div className="py-12 text-center opacity-20">
                    <Trophy className="w-8 h-8 mx-auto mb-3" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">No players drafted yet</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'Teams' && (
              <motion.div 
                key="teams"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* User Team */}
                <div className="p-4 glass rounded-2xl border-accent/20">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center text-[10px] font-black">Y</div>
                      <p className="text-xs font-black uppercase text-white">Your Team</p>
                    </div>
                    <p className="text-xs font-black text-accent">₹{userBudget.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {userLineup.map((p, i) => (
                      <div key={i} className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Teams */}
                {otherUsers.map(user => (
                  <div key={user.id} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                        <p className="text-xs font-bold text-white/60">{user.name}</p>
                      </div>
                      <p className="text-xs font-bold text-white/40">₹{user.budget.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                      {user.roster.map((p, i) => (
                        <div key={i} className="w-8 h-8 rounded-lg overflow-hidden border border-white/5 flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* User Lineup Preview (Bottom) */}
      <section className="px-6 py-4 bg-primary border-t border-white/5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40">Your Roster ({userLineup.length}/8)</h3>
          <button onClick={() => setActiveTab('Teams')} className="text-[10px] font-black text-accent uppercase tracking-widest">View All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {userLineup.map((p, i) => (
            <div key={i} className="flex-shrink-0 w-12 h-12 rounded-xl border border-accent/20 overflow-hidden bg-white/5">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
          ))}
          {Array.from({ length: 8 - userLineup.length }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-12 h-12 rounded-xl border border-dashed border-white/10 flex items-center justify-center">
              <Plus className="w-4 h-4 text-white/10" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
