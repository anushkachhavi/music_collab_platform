import Navbar from "../components/Navbar";
import { artists, tracks } from "../data/dummyData";

export default function Explore() {
  return (
    <>
      <Navbar />

      <div className="explore-container">

        {/* HERO */}
        <div className="explore-hero">
          <h1 className="hero-title">Discover Talent</h1>
          <p className="hero-sub">
            Connect with musicians, producers, and artists around the world
          </p>

          <div className="hero-search">
            <input
              className="search-input"
              placeholder="Search by name, genre, instrument..."
            />
            <button className="search-btn">Search</button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="explore-filters">
          <select className="filter-select">
            <option>All Instruments</option>
          </select>

          <select className="filter-select">
            <option>All Genres</option>
          </select>

          <select className="filter-select">
            <option>All Locations</option>
          </select>

          <div className="filter-pill">Online now ×</div>
        </div>

        {/* FEATURED */}
        <div className="explore-section">
          <h2 className="section-title">🔥 Featured Artists</h2>

          <div className="artist-grid">
            {artists.map((a, i) => (
              <div className="artist-card" key={i}>
                <div className="artist-avatar">{a.initials}</div>

                <div className="artist-name">{a.name}</div>
                <div className="artist-role">{a.role}</div>

                <div className="artist-tags">
                  {a.tags.map((t, j) => (
                    <span key={j}>{t}</span>
                  ))}
                </div>

                <div className="artist-stats">
                  {a.posts} posts • {a.collabs} collabs
                </div>

                <button className="connect-btn">Connect</button>
              </div>
            ))}
          </div>
        </div>

        {/* TRACKS */}
        <div className="explore-section">
          <h2 className="section-title">🎧 Trending Tracks</h2>

          <div className="tracks-list">
            {tracks.map((t) => (
              <div className="track-row" key={t.num}>

                <div className="track-left">
                  <div className="track-index">{t.num}</div>

                  <div className="play-btn">▶</div>

                  <div className="track-info">
                    <div className="track-name">{t.name}</div>
                    <div className="track-artist">{t.artist}</div>
                  </div>
                </div>

                <div className="track-right">
                  <span className="genre-tag">{t.genre}</span>
                  <span className="track-plays">{t.plays}</span>
                  <span className="like-btn">♡</span>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}