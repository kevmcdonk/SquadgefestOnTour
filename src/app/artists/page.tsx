export default function ArtistsPage() {
  // Spotify playlist embed ID for Squadgefest
  // Replace PLAYLIST_ID with your actual Spotify playlist ID
  const spotifyPlaylistId = "3GN6z3pp8tUyqxccbbPwKB"; // placeholder: Today's Top Hits

  return (
    <div>
      {/* Header */}
      <section className="festival-gradient text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-3">🎵</div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Artists</h1>
          <p className="text-lg opacity-80">
            The sounds of Squadgefest 2026. Curated with love from our official Spotify playlist.
          </p>
        </div>
      </section>

      {/* Spotify Embed */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-black text-festival-dark">🎧 Official Squadgefest Playlist</h2>
            <p className="text-festival-dark/60 mt-1">
              Listen to the artists playing at Squadgefest 2026. Follow the playlist on Spotify to stay updated.
            </p>
          </div>
          <div className="p-4">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${spotifyPlaylistId}?utm_source=generator&theme=0`}
              width="100%"
              height="500"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-festival-yellow rounded-2xl p-6">
            <h3 className="text-xl font-black text-festival-dark mb-2">🎪 Live Music</h3>
            <p className="text-festival-dark/70 text-sm leading-relaxed">
              We&apos;ll have live music throughout the weekend — from acoustic sets in the garden
              to evening sing-alongs around the fire. Check back closer to the date for the full schedule.
            </p>
          </div>
          <div className="bg-festival-orange text-white rounded-2xl p-6">
            <h3 className="text-xl font-black mb-2">🎸 Want to Play?</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Are you a musician who wants to perform at Squadgefest? We&apos;d love to hear from you.
              Submit your details and we&apos;ll be in touch.
            </p>
            <a
              href="/submit"
              className="inline-block mt-4 bg-white text-festival-dark font-bold px-4 py-2 rounded-full text-sm hover:bg-festival-yellow transition-colors"
            >
              Submit to Play ✨
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
