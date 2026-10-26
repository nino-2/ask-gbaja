import Link from 'next/link';
import { cx } from '@/lib/cx';

type Props = {
  href: string;
  variant?: 'solid' | 'ghost' | 'light';
  className?: string;
  children: React.ReactNode;
};

const variants = {
  solid: 'bg-brand text-on-brand',
  ghost: 'border border-line text-ink',
  light: 'bg-white text-[#101010]',
};

export default function Button({ href, variant = 'solid', className, children }: Props) {
  return (
    <Link
      href={href}
      className={cx(
        'inline-block rounded-[10px] px-5 py-[11px] font-bold no-underline',
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
