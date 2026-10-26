import { cx } from '@/lib/cx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return (
    <div className={cx('mx-auto w-full max-w-[1120px] px-5', className)}>{children}</div>
  );
}
