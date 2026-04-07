import { motion } from 'motion/react';
import { Play, Users, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary" />
        <img 
          src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop" 
          alt="NBA Stadium"
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        {/* Animated Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-blue/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-6 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              NBA Season Live Now
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 italic uppercase">
              Draft Your Team.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-blue">
                Win Real Money.
              </span>
            </h1>
            
            <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
              Compete in daily fantasy contests across NBA, Rugby & Cricket. 
              Build your dream lineup and climb the leaderboard to win massive cash prizes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-accent text-primary px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 neon-glow">
                Join Contest <ChevronRight className="w-5 h-5" />
              </button>
              <button className="glass px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                Create Lineup <Play className="w-4 h-4 fill-current" />
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-primary"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-white">10K+ Active Players</p>
                <p className="text-white/50">Winning $25M+ Daily</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Mockup of a Contest Card or Scoreboard */}
            <div className="glass p-6 rounded-3xl border-white/20 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-white/50">LIVE SCOREBOARD</span>
                <span className="text-xs bg-red-500 px-2 py-0.5 rounded text-white font-bold animate-pulse">LIVE</span>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold">LAL</div>
                    <span className="font-bold">Lakers</span>
                  </div>
                  <span className="text-3xl font-black italic">102</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold">GSW</div>
                    <span className="font-bold">Warriors</span>
                  </div>
                  <span className="text-3xl font-black italic text-accent">108</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex justify-between text-xs font-bold text-white/40 mb-2 uppercase tracking-tighter">
                  <span>Top Performer</span>
                  <span>FPTS</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center text-accent font-bold text-xs">SC</div>
                    <span className="text-sm font-bold">Stephen Curry</span>
                  </div>
                  <span className="text-sm font-bold text-accent">42.5</span>
                </div>
              </div>
            </div>

            {/* Floating Accents */}
            <div className="absolute -top-10 -right-10 glass p-4 rounded-2xl animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent-blue" />
                <span className="text-sm font-bold">4,291 Entered</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
