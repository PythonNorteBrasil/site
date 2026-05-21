import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Activities } from "@/components/activities";
import { Tickets } from "@/components/tickets";
import { Schedule } from "@/components/schedule";
import { Editions } from "@/components/editions";
import { Sponsors } from "@/components/sponsors";
import { Media } from "@/components/media";
import { Location } from "@/components/location";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Activities />
        <Tickets />
        <Schedule />
        <Editions />
        <Sponsors />
        <Media />
        <Location />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
