interface VerseProps {
  number: number;
  text: string;
}

export default function Verse({ number, text }: VerseProps) {
  return (
    <div>
      <small className="pr-1 align-top opacity-70">{number}</small>
      {text}
    </div>
  );
}
