import { motion } from 'motion/react';
import { Gift, Users, Ticket } from 'lucide-react';

export default function Promotions() {
  return (
    <section id="promos" className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Welcome Bonus */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 p-8 flex flex-col justify-between min-h-[300px]"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-black italic uppercase mb-2">Welcome Bonus</h3>
              <p className="text-white/60 text-sm mb-6">Get $500 bonus cash on your first signup. Limited time offer!</p>
            </div>
            <button className="relative z-10 w-full py-4 bg-accent text-primary font-black rounded-2xl hover:bg-white transition-colors">
              CLAIM NOW
            </button>
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[60px]" />
          </motion.div>

          {/* Referral Program */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 border border-accent-blue/20 p-8 flex flex-col justify-between min-h-[300px]"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-accent-blue flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-black italic uppercase mb-2">Refer & Earn</h3>
              <p className="text-white/60 text-sm mb-6">Invite your friends and get $100 for every successful referral.</p>
            </div>
            <button className="relative z-10 w-full py-4 bg-accent-blue text-primary font-black rounded-2xl hover:bg-white transition-colors">
              INVITE FRIENDS
            </button>
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-accent-blue/10 rounded-full blur-[60px]" />
          </motion.div>

          {/* First Contest Free */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 flex flex-col justify-between min-h-[300px]"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6">
                <Ticket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-black italic uppercase mb-2">First Free</h3>
              <p className="text-white/60 text-sm mb-6">Join your first paid contest absolutely free. No strings attached.</p>
            </div>
            <button className="relative z-10 w-full py-4 bg-white text-primary font-black rounded-2xl hover:bg-accent transition-colors">
              JOIN FREE
            </button>
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-white/5 rounded-full blur-[60px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
