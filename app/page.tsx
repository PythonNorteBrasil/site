import { CountdownBanner } from "@/components/countdown-banner";
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
      <CountdownBanner />
      <Header />
      <main className="flex-grow">
        <Hero />

        <div
          className="w-full h-8 md:h-12 lg:h-16 bg-repeat-x bg-center"
          style={{
            backgroundImage: "url('/pattern-divider.png')",
            backgroundSize: "auto 100%",
          }}
        />
        <About />
        <Editions />
        <Activities />
        <Tickets />
        <Schedule />
        <Sponsors />
        <Media />
        <Location />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
