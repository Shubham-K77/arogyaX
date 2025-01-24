import { Button } from "@/components/ui/button";
import Header from "@/components/custom/Header";
import Hero from "@/components/custom/Hero";
const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      <Header />
      <Hero />
      <Button> Click Me! </Button>
    </div>
  );
};

export default Home;
