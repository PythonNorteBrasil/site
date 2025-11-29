import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Objetivo } from "@/components/objetivo"
import {ProximoEventoPage} from "@/components/proximo"
import { Impact } from "@/components/impact"
import { Communities } from "@/components/communities"
import { Sponsorship } from "@/components/sponsorship"
import { Editions } from "@/components/editions"
import { Gallery } from "@/components/gallery"
import { FAQ } from "@/components/faq"
import { PraQuemE } from "@/components/PraQuemE"
import {CodigoDeConduta} from "@/components/CDC"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <PraQuemE />
        <ProximoEventoPage />
        <Objetivo />
        <CodigoDeConduta />
        <Impact />
        <Communities />
        <Sponsorship />
        <Editions />
        <Gallery />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
