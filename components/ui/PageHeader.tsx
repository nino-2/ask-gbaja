import Container from './Container';

type Props = {
  title: string;
  sub?: string;
};

export default function PageHeader({ title, sub }: Props) {
  return (
    <div className="bg-bg2 py-10">
      <Container>
        <h1 className="text-[clamp(30px,4.5vw,44px)] leading-tight font-extrabold">
          {title}
        </h1>
        {sub && <p className="mt-2 max-w-[60ch] text-mute">{sub}</p>}
      </Container>
    </div>
  );
}
