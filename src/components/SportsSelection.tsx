import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const SPORTS = [
  {
    name: "NBA",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format&fit=crop",
    count: "124 Contests",
    isPrimary: true
  },
  {
    name: "Rugby",
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=80&w=2070&auto=format&fit=crop",
    count: "42 Contests",
    isPrimary: false
  },
  {
    name: "Cricket",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop",
    count: "86 Contests",
    isPrimary: false
  }
];

export default function SportsSelection() {
  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black italic uppercase mb-4">
              Explore <span className="text-accent">Sports</span>
            </h2>
            <p className="text-white/50">Pick your favorite sport and dominate the league.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SPORTS.map((sport, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer overflow-hidden rounded-[32px] aspect-[4/5]"
            >
              <img 
                src={sport.image} 
                alt={sport.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-black italic uppercase mb-1">{sport.name}</h3>
                    <p className="text-accent font-bold text-sm">{sport.count}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {sport.isPrimary && (
                <div className="absolute top-6 left-6 bg-accent text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  Featured
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
