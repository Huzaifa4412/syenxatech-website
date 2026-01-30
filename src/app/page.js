import Faqs from "@/components/faqs";
import Footer from "@/components/footer";
import Contact from "@/components/form";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Story from "@/components/story";
import HeroDialog from "../components/HeroDialog";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroDialog />
      <Services />
      <Story />
      <Contact />
      <Faqs />
    </>
  );
}
