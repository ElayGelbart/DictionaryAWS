interface wordProps {
  word: string;
  definition: string;
  pos: string;
}
export default function Word({ word, pos, definition }: wordProps) {
  return (
    <div>
      <h1>
        {word} {pos}
      </h1>
      <p>{definition}</p>
    </div>
  );
}
