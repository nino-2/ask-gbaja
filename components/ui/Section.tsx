import { cx } from '@/lib/cx';
import Container from './Container';

type Props = {
  children: React.ReactNode;
  alt?: boolean;
  id?: string;
};

export default function Section({ children, alt = false, id }: Props) {
  return (
    <section id={id} className={cx('py-11', alt && 'bg-bg2')}>
      <Container>{children}</Container>
    </section>
  );
}
