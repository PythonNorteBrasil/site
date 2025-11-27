import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Page() {
    return <div className="min-h-screen">
          <Header />
          <main>
            <div className="mt-10 flex items-center justify-center min-h-[80vh]">
                <h1>Git Revert Page 2023</h1>
            </div>
          </main>
          <Footer />
        </div>
}