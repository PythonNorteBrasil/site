import { Card } from "@/components/ui/card"

export function Communities() {
  const communities = [
    { name: "Python Rio", logo: "/python-rio-logo.jpg" },
]

  return (
    <section id="comunidades" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/boat.png)",
            backgroundSize: "600px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Comunidades Apoiadoras</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comunidades são pontes e não muros. Conheça algumas das comunidades que apoiam a Python Norte e tornam este evento lindo maravilhoso e cada vez mais forte!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {communities.map((community, index) => (
              <Card
                key={index}
                className="group relative p-6 bg-background/40 backdrop-blur-sm border border-border/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-background/80 backdrop-blur-sm border-2 border-primary/20 flex items-center justify-center p-3 group-hover:border-primary/40 transition-colors">
                    <img
                      src={community.logo || "/placeholder.svg"}
                      alt={`${community.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-center text-foreground group-hover:text-primary transition-colors">
                    {community.name}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
