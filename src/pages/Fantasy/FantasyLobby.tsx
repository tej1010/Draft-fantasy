import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, Users, ArrowRight, Star, Zap } from 'lucide-react';
import Header from '../../components/Header';
import './FantasyLobby.css';

interface Tournament {
  id: string;
  title: string;
  prizePool: string;
  entryFee: string;
  duration: string;
  matches: number;
  participants: number;
  maxParticipants: number;
  status: 'Open' | 'Filling' | 'Full';
  image: string;
}

const TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    title: 'NBA Weekly Warriors',
    prizePool: '₹10,00,000',
    entryFee: '₹499',
    duration: 'Apr 14 - Apr 21',
    matches: 5,
    participants: 1240,
    maxParticipants: 2500,
    status: 'Open',
    image: 'https://picsum.photos/seed/nba1/800/400'
  },
  {
    id: 't2',
    title: 'Grand Slam Fantasy',
    prizePool: '₹25,00,000',
    entryFee: '₹999',
    duration: 'Apr 15 - Apr 22',
    matches: 7,
    participants: 850,
    maxParticipants: 1000,
    status: 'Filling',
    image: 'https://picsum.photos/seed/tennis/800/400'
  },
  {
    id: 't3',
    title: 'IPL Weekend Blitz',
    prizePool: '₹5,00,000',
    entryFee: '₹199',
    duration: 'Apr 19 - Apr 21',
    matches: 3,
    participants: 4500,
    maxParticipants: 5000,
    status: 'Open',
    image: 'https://picsum.photos/seed/cricket/800/400'
  }
];

export default function FantasyLobby() {
  const navigate = useNavigate();

  return (
    <div className="fantasy-lobby-container">
      <Header />
      
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-accent/20 p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-accent" />
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Fantasy <span className="text-accent">Tournaments</span></h1>
          </div>
          <p className="text-white/60 max-w-2xl font-medium">
            Join week-long fantasy tournaments spanning multiple matches. Build your ultimate roster from all participating teams and climb the leaderboard for massive prizes.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tournament List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Available Leagues</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/60">All Sports</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/60">High Stakes</span>
              </div>
            </div>

            {TOURNAMENTS.map((tournament) => (
              <div key={tournament.id} className="tournament-card group">
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  <img 
                    src={tournament.image} 
                    alt={tournament.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-accent text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {tournament.status}
                  </div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-black italic uppercase text-white mb-1">{tournament.title}</h3>
                    <div className="flex items-center gap-4 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {tournament.duration}</span>
                      <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> {tournament.matches} Matches</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white/5 border-x border-b border-white/10 rounded-b-3xl flex items-center justify-between">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Prize Pool</p>
                      <p className="text-xl font-black italic text-accent">{tournament.prizePool}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Entry Fee</p>
                      <p className="text-xl font-black italic text-white">{tournament.entryFee}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/fantasy/tournament/${tournament.id}`)}
                    className="bg-white text-primary px-8 py-3 rounded-2xl font-black uppercase italic tracking-tighter hover:bg-accent hover:scale-105 transition-all flex items-center gap-2"
                  >
                    Join League <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="glass p-8 rounded-[40px] border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Star className="w-24 h-24 text-accent" />
              </div>
              <h3 className="text-xl font-black italic uppercase text-white mb-4">How it Works</h3>
              <ul className="space-y-4">
                {[
                  'Select a tournament from the lobby',
                  'Pick players from all participating teams',
                  'Stay within the tournament salary cap',
                  'Points accumulate across all N matches',
                  'Top rankers win massive prize pools'
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/60 font-medium">
                    <span className="text-accent font-black">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-accent/10 border border-accent/20 p-8 rounded-[40px]">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-black italic uppercase text-white">Live Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white/40 uppercase">Active Players</span>
                  <span className="text-sm font-black text-white">12,450+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white/40 uppercase">Total Winnings</span>
                  <span className="text-sm font-black text-accent">₹2.5 Cr+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
