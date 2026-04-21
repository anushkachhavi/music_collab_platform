export default function TrackRow({ track }) {
  return (
    <div className="track-row">
      <div>{track.num}</div>
      <div>{track.name}</div>
      <div>{track.artist}</div>
    </div>
  );
}