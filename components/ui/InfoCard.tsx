type Props = {
  title: string;
  text: string;
  number?: number;
};

export default function InfoCard({ title, text, number }: Props) {
  return (
    <div className="rounded-[14px] border border-line bg-card p-4">
      {number !== undefined && (
        <span className="mb-2 grid size-[30px] place-items-center rounded-full bg-brand font-extrabold text-on-brand">
          {number}
        </span>
      )}
      <h3 className="mb-1 text-lg font-bold">{title}</h3>
      <p className="text-sm text-mute">{text}</p>
    </div>
  );
}
