import Faqs from "@/components/faqs";
import Footer from "@/components/footer";
import Contact from "@/components/form";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Story from "@/components/story";

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <Story />
            <Contact />
            <Faqs />
        </>
    );
}
