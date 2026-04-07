import { useState, useEffect } from 'react';
import { Trophy, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Lobby', path: '/lobby' },
    { name: 'How to Play', path: '/how-to-play' },
    { name: 'Promos', path: '/promos' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-primary/80 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-accent p-1.5 rounded-lg">
            <Trophy className="w-6 h-6 text-primary fill-primary" />
          </div>
          <span className="text-2xl font-bold tracking-tighter italic">
            SPORTS<span className="text-accent">PICK</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === item.path ? "text-accent" : "text-white/70 hover:text-accent"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-semibold hover:text-accent transition-colors">
            Log In
          </button>
          <button className="bg-accent text-primary px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform neon-glow">
            Sign Up
          </button>
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-primary border-b border-white/10 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className={cn(
                "text-lg font-medium",
                location.pathname === item.path ? "text-accent" : "text-white/70 hover:text-accent"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <hr className="border-white/10" />
          <button className="text-left text-lg font-medium">Log In</button>
        </div>
      )}
    </header>
  );
}
