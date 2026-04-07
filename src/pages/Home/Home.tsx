import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import SportsSelection from '../../components/SportsSelection';
import TrustSocial from '../../components/TrustSocial';
import Footer from '../../components/Footer';
import './Home.css';

export default function Home() {
  return (
    <main className="bg-primary min-h-screen home-hero-gradient">
      <Header />
      <Hero />
      <Features />
      <SportsSelection />
      <TrustSocial />
      <Footer />
    </main>
  );
}
