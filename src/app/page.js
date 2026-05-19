import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import CountUpSection from '@/components/CountUpSection';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <CountUpSection />
      <Footer />
    </div>
  );
};

export default HomePage;