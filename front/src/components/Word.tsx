interface wordProps {
  word: string;
  definition: string;
  pos: string;
  searchWordFn?: (word: any, pos?: any) => Promise<void>;
}
export default function Word({
  word,
  pos,
  definition,
  searchWordFn,
}: wordProps) {
  return (
    <div className="wordDiv">
      <h1>
        <span className="wordTitle">{word.toUpperCase()}</span> ({pos})
      </h1>
      <p>
        {definition.split(" ").map((word) => {
          return (
            <span
              className="eachWord"
              onClick={() => {
                if (searchWordFn) {
                  searchWordFn(word.replace(/[^a-zA-Z]+/g, ""));
                }
              }}
            >
              {word}{" "}
            </span>
          );
        })}
      </p>
    </div>
  );
}
