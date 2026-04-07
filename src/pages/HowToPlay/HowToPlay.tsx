import Header from '../../components/Header';
import HowItWorks from '../../components/HowItWorks';
import Footer from '../../components/Footer';
import './HowToPlay.css';

export default function HowToPlay() {
  return (
    <main className="bg-primary min-h-screen how-to-play-bg">
      <Header />
      <div className="pt-20">
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}
