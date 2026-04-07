import { motion } from 'motion/react';
import { UserPlus, Layout, Award } from 'lucide-react';

const STEPS = [
  {
    icon: UserPlus,
    title: "Join a Contest",
    desc: "Browse our lobby and pick a contest that fits your strategy and budget.",
    color: "accent"
  },
  {
    icon: Layout,
    title: "Draft Your Team",
    desc: "Build your dream lineup within the salary cap. Every pick counts.",
    color: "accent-blue"
  },
  {
    icon: Award,
    title: "Win Real Money",
    desc: "Watch live as your players score points. Top the leaderboard to win cash.",
    color: "accent"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-to-play" className="py-24 bg-primary relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black italic uppercase mb-4">
            How It <span className="text-accent">Works</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Get started in minutes. No complex rules, just pure sports knowledge and strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="relative text-center group"
            >
              {idx < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-[2px] bg-gradient-to-r from-accent/20 to-transparent z-0" />
              )}
              
              <div className={`relative z-10 w-24 h-24 mx-auto mb-8 rounded-3xl glass flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                <step.icon className={`w-10 h-10 ${step.color === 'accent' ? 'text-accent' : 'text-accent-blue'}`} />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary border border-white/10 flex items-center justify-center text-xs font-black">
                  0{idx + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
