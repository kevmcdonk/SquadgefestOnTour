import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-festival-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎪</span>
              <span className="text-festival-yellow font-black text-xl">Squadgefest 2026</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              A backyard festival in the heart of Suffolk, happening on the same glorious weekend as Latitude.
              Good music. Great food. Brilliant people.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-festival-yellow mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/artists" className="hover:text-festival-yellow transition-colors">🎵 Artists</Link></li>
              <li><Link href="/talks" className="hover:text-festival-yellow transition-colors">🎤 Talks</Link></li>
              <li><Link href="/food" className="hover:text-festival-yellow transition-colors">🍔 Food</Link></li>
              <li><Link href="/crafts" className="hover:text-festival-yellow transition-colors">🎨 Crafts</Link></li>
              <li><Link href="/submit" className="hover:text-festival-yellow transition-colors">✨ Submit Something</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-festival-yellow mb-3">The Festival</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>📅 July 17–19, 2026</li>
              <li>📍 Suffolk, England</li>
              <li>🌤️ Same weekend as Latitude</li>
              <li>🎪 Backyard brilliance</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">© 2026 Squadgefest. Made with ❤️ in Suffolk.</p>
          <Link
            href="/admin"
            className="text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
