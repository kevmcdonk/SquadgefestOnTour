import Link from "next/link";

const features = [
  {
    emoji: "🎵",
    title: "Artists",
    description: "Discover the artists playing at Squadgefest, curated from our official Spotify playlist.",
    href: "/artists",
    color: "bg-festival-yellow",
  },
  {
    emoji: "🎤",
    title: "Ted-Style Talks",
    description: "Short, inspiring talks on everything from fermentation to climate change.",
    href: "/talks",
    color: "bg-festival-orange",
  },
  {
    emoji: "🍔",
    title: "Food & Drink",
    description: "Locally sourced, lovingly prepared. Suffolk has never tasted so good.",
    href: "/food",
    color: "bg-festival-pink",
  },
  {
    emoji: "🎨",
    title: "Crafts",
    description: "Get your hands dirty with festival crown making, tie-dye, painting, and more.",
    href: "/crafts",
    color: "bg-festival-purple",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="festival-gradient text-white py-24 px-4 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-4xl mx-auto relative">
          <div className="text-7xl mb-4">🎪</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 drop-shadow-lg">
            Squadgefest
          </h1>
          <p className="text-2xl md:text-3xl font-bold mb-2 opacity-90">2026</p>
          <p className="text-lg md:text-xl opacity-80 mb-8 max-w-2xl mx-auto">
            Suffolk&apos;s finest backyard festival. Same glorious weekend as Latitude.
            Better company, bigger garden.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              📅 July 17–19, 2026
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              📍 Suffolk, England
            </span>
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              🌤️ Latitude Weekend
            </span>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/artists"
              className="bg-white text-festival-dark font-black px-8 py-3 rounded-full text-lg hover:bg-festival-yellow transition-colors shadow-lg"
            >
              See the Lineup 🎵
            </Link>
            <Link
              href="/submit"
              className="bg-festival-dark/30 backdrop-blur border-2 border-white/50 text-white font-black px-8 py-3 rounded-full text-lg hover:bg-white/20 transition-colors"
            >
              Submit Something ✨
            </Link>
          </div>
        </div>
      </section>

      {/* What's On */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-black text-center text-festival-dark mb-2">
          What&apos;s On
        </h2>
        <p className="text-center text-festival-dark/60 mb-10">
          Three days of music, talks, food, and creativity
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href} className="festival-card">
              <div className={`${feature.color} rounded-2xl p-6 h-full text-festival-dark`}>
                <div className="text-4xl mb-3">{feature.emoji}</div>
                <h3 className="text-xl font-black mb-2">{feature.title}</h3>
                <p className="text-festival-dark/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 font-bold text-sm flex items-center gap-1 group">
                  Explore{" "}
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-festival-dark text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-festival-yellow">
            About Squadgefest
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            Every summer, while the rest of the world heads to Glastonbury or Reading,
            a special group of people gathers in a Suffolk back garden for something
            better — <strong className="text-festival-yellow">Squadgefest</strong>.
          </p>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            It&apos;s not just a festival. It&apos;s a celebration of ideas, good food,
            creative hands, and brilliant music. Timed perfectly with the Latitude Festival
            weekend in Suffolk, we bring our own magic to the garden.
          </p>
          <p className="text-white/60">
            Want to contribute?{" "}
            <Link
              href="/submit"
              className="text-festival-yellow hover:underline font-semibold"
            >
              Submit a talk, a food idea, or a craft activity
            </Link>{" "}
            — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Submit CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-3xl font-black text-festival-dark mb-4">
            Got something to share?
          </h2>
          <p className="text-festival-dark/60 mb-8">
            Want to give a talk? Cook something amazing? Run a craft session? We want to
            hear from you. Submit your idea and our team will review it.
          </p>
          <Link
            href="/submit"
            className="inline-block bg-festival-purple text-white font-black px-10 py-4 rounded-full text-lg hover:bg-festival-pink transition-colors shadow-lg"
          >
            Submit Your Idea ✨
          </Link>
        </div>
      </section>
    </div>
  );
}
