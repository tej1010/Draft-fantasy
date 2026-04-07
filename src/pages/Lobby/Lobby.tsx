import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContestCard from '../../components/ContestCard';
import { Wallet, User, Filter, Search, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import './Lobby.css';

const CONTESTS = [
  {
    id: "1",
    title: "NBA Mega Slam - $10K GPP",
    sport: "NBA",
    entryFee: 49,
    prizePool: 10000,
    spotsTotal: 250,
    spotsLeft: 42,
    firstPrize: 2000,
    winnersPercent: 20,
    maxEntries: 20,
    type: "GPP",
    isHot: true
  },
  {
    id: "2",
    title: "NBA Head-to-Head Battle",
    sport: "NBA",
    entryFee: 500,
    prizePool: 900,
    spotsTotal: 2,
    spotsLeft: 1,
    firstPrize: 900,
    winnersPercent: 50,
    maxEntries: 1,
    type: "H2H",
    isHot: false
  },
  {
    id: "3",
    title: "NBA Small League - 10 Spots",
    sport: "NBA",
    entryFee: 100,
    prizePool: 800,
    spotsTotal: 10,
    spotsLeft: 3,
    firstPrize: 400,
    winnersPercent: 30,
    maxEntries: 1,
    type: "Small League",
    isHot: true
  },
  {
    id: "4",
    title: "NBA Freebie Contest",
    sport: "NBA",
    entryFee: 0,
    prizePool: 100,
    spotsTotal: 1000,
    spotsLeft: 450,
    firstPrize: 20,
    winnersPercent: 10,
    maxEntries: 1,
    type: "Free",
    isHot: false
  }
];

export default function Lobby() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Free', 'Paid', 'H2H', 'Small League', 'Mega Contest'];

  return (
    <main className="bg-primary min-h-screen lobby-container pb-24">
      {/* Lobby Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-lg border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent/10 px-3 py-1.5 rounded-xl border border-accent/20 flex items-center gap-2 cursor-pointer hover:bg-accent/20 transition-colors">
              <span className="text-xs font-black text-accent uppercase tracking-widest">NBA</span>
              <ChevronDown className="w-3.5 h-3.5 text-accent" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-accent" />
              <span className="text-sm font-black text-white">$1,245.50</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
              <User className="w-5 h-5 text-white/60" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input 
              type="text" 
              placeholder="Search contests..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <button className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3.5 flex items-center justify-center gap-2 text-sm font-bold hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all whitespace-nowrap uppercase tracking-widest",
                activeTab === tab 
                  ? "bg-accent text-primary neon-glow" 
                  : "bg-white/5 text-white/40 hover:bg-white/10 border border-white/5"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Contest List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTESTS.map((contest) => (
            <ContestCard 
              key={contest.id} 
              id={contest.id}
              title={contest.title}
              prizePool={contest.prizePool}
              entryFee={contest.entryFee}
              type={contest.type}
              spotsTotal={contest.spotsTotal}
              spotsLeft={contest.spotsLeft}
              firstPrize={contest.firstPrize}
              winnersPercent={contest.winnersPercent}
              maxEntries={contest.maxEntries}
              isHot={contest.isHot}
            />
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
