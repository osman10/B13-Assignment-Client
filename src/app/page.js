import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import CountUpSection from '@/components/CountUpSection';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <CountUpSection />
    </div>
  );
};

export default HomePage;