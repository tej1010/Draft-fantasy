import { motion } from 'motion/react';
import { Star, Shield, CheckCircle2, Award, Trophy } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Rahul S.",
    role: "Pro DFS Player",
    text: "Sportspick has the best UI in the game. The instant payouts are a lifesaver!",
    rating: 5
  },
  {
    name: "Ankit M.",
    role: "NBA Enthusiast",
    text: "I won $50k in my first week. The salary cap system is very fair and strategic.",
    rating: 5
  },
  {
    name: "Vikram K.",
    role: "Cricket Fanatic",
    text: "The real-time leaderboard updates are incredibly fast. Love the adrenaline!",
    rating: 4
  }
];

const STATS = [
  { label: "Total Winnings", value: "$2.5B+" },
  { label: "Active Users", value: "1.2M+" },
  { label: "Contests Daily", value: "500+" },
  { label: "Security Score", value: "99.9%" }
];

export default function TrustSocial() {
  return (
    <section className="py-24 bg-primary/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8 mb-24">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center p-8 glass rounded-3xl border-white/5">
              <p className="text-4xl font-black italic text-accent mb-2">{stat.value}</p>
              <p className="text-sm font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black italic uppercase mb-8 leading-tight">
              Trusted by <span className="text-accent">Millions</span> <br />
              of Sports Fans
            </h2>
            <div className="space-y-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass p-6 rounded-2xl border-white/5"
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-white/70 italic mb-4">"{t.text}"</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{t.name}</span>
                    <span className="text-xs text-white/40 font-bold uppercase">{t.role}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="glass p-8 rounded-3xl border-white/5 flex flex-col items-center text-center">
                <Shield className="w-12 h-12 text-accent mb-4" />
                <h4 className="font-bold mb-2">100% Secure</h4>
                <p className="text-xs text-white/40">SSL encrypted transactions and data protection.</p>
              </div>
              <div className="glass p-8 rounded-3xl border-white/5 flex flex-col items-center text-center">
                <Award className="w-12 h-12 text-accent-blue mb-4" />
                <h4 className="font-bold mb-2">Fair Play</h4>
                <p className="text-xs text-white/40">Certified algorithms for unbiased gameplay.</p>
              </div>
            </div>
            <div className="space-y-6 pt-12">
              <div className="glass p-8 rounded-3xl border-white/5 flex flex-col items-center text-center">
                <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
                <h4 className="font-bold mb-2">Verified</h4>
                <p className="text-xs text-white/40">Registered and compliant with gaming regulations.</p>
              </div>
              <div className="bg-accent/10 p-8 rounded-3xl border border-accent/20 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2 text-accent">Top Rated</h4>
                <p className="text-xs text-accent/60">#1 Fantasy App for NBA & Cricket enthusiasts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
