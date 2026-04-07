import Header from '../../components/Header';
import Promotions from '../../components/Promotions';
import Footer from '../../components/Footer';
import './Promos.css';

export default function Promos() {
  return (
    <main className="bg-primary min-h-screen">
      <Header />
      <div className="pt-20">
        <Promotions />
      </div>
      <Footer />
    </main>
  );
}
