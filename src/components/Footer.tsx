import { Trophy, Facebook, Twitter, Instagram, Youtube, Smartphone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-accent p-1.5 rounded-lg">
                <Trophy className="w-6 h-6 text-primary fill-primary" />
              </div>
              <span className="text-2xl font-bold tracking-tighter italic">
                SPORTS<span className="text-accent">PICK</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              The ultimate daily fantasy sports platform. Draft your winning team, 
              compete with millions, and win real cash prizes every day.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">How to Play</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Responsible Gaming</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Fair Play Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Get the App</h4>
            <p className="text-sm text-white/40 mb-6">Experience the best of DFS on the go. Download our mobile app.</p>
            <div className="space-y-4">
              <button className="w-full glass p-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors">
                <Smartphone className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-white/40 uppercase">Download on the</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </button>
              <button className="w-full glass p-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors">
                <Smartphone className="w-6 h-6 text-accent-blue" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-white/40 uppercase">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/20">
            © 2026 Sportspick. All rights reserved. 18+ Only. Play Responsibly.
          </p>
          <div className="flex gap-8">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 opacity-30 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6 opacity-30 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
            <img src="https://img.icons8.com/color/48/upi.png" alt="UPI" className="h-6 opacity-30 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
