import { motion } from 'motion/react';
import { ShieldCheck, Zap, BarChart3, Wallet, Layers } from 'lucide-react';

const FEATURES = [
  {
    icon: Layers,
    title: "Salary Cap Draft System",
    desc: "Strategic drafting that rewards knowledge over deep pockets."
  },
  {
    icon: Zap,
    title: "Real-time Leaderboard",
    desc: "Watch your rank climb in real-time with every basket, goal, or run."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    desc: "Access player stats, injury reports, and expert projections."
  },
  {
    icon: Wallet,
    title: "Instant Payouts",
    desc: "Withdraw your winnings instantly to your bank account or UPI."
  },
  {
    icon: ShieldCheck,
    title: "Fair Play Guaranteed",
    desc: "Certified RNG and secure systems ensure a level playing field for all."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-primary/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black italic uppercase mb-6 leading-tight">
              Built for the <br />
              <span className="text-accent">Competitive Edge</span>
            </h2>
            <p className="text-white/50 mb-10 leading-relaxed">
              Sportspick isn't just another fantasy app. We've built a high-performance 
              platform designed for serious players who want the best experience.
            </p>

            <div className="space-y-8">
              {FEATURES.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <f.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{f.title}</h4>
                    <p className="text-sm text-white/40">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-[40px] glass overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop" 
                alt="Basketball Action"
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
              
              {/* Floating UI Element */}
              <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl border-accent/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-accent uppercase tracking-widest">Live Draft</span>
                  <span className="text-xs font-bold text-white/40">12:45 Left</span>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-accent rounded-full" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold">Salary Remaining</span>
                    <span className="text-sm font-bold text-accent">$12,500</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
