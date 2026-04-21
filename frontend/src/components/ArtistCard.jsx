export default function ArtistCard({ artist }) {
  return (
    <div className="musician-card">
      <div className="mc-avatar">{artist.initials}</div>
      <div className="mc-name">{artist.name}</div>
      <div className="mc-role">{artist.role}</div>
    </div>
  );
}