import { cx } from '@/lib/cx';
import { Source } from '@/lib/types';

export type Msg = {
  role: 'me' | 'bot';
  text: string;
  sources?: Source[];
  audio?: string;
  voiceBy?: string;
  fallback?: boolean;
  ai?: boolean;
};

type Props = {
  msg: Msg;
  fallbackNote: string;
  aiNote: string;
  listenLabel: string;
  onListen: (msg: Msg) => void;
};

export default function ChatMessage({
  msg,
  fallbackNote,
  aiNote,
  listenLabel,
  onListen,
}: Props) {
  const isBot = msg.role === 'bot';

  return (
    <div
      className={cx(
        'max-w-[88%] rounded-[14px] px-[13px] py-2.5 text-[15px]',
        isBot ? 'self-start bg-bubble' : 'self-end bg-me text-me-ink',
      )}
    >
      {msg.text}

      {msg.ai && <span className="mt-2 block text-xs text-mute">{aiNote}</span>}
      {msg.fallback && (
        <span className="mt-2 block text-xs text-mute">{fallbackNote}</span>
      )}

      {msg.sources?.map((source) => (
        <span key={source.label} className="mt-1 block text-xs text-mute">
          {source.url ? (
            <a href={source.url} target="_blank" rel="noreferrer" className="underline">
              {source.label}
            </a>
          ) : (
            source.label
          )}
          {source.date ? ` · ${source.date}` : ''}
        </span>
      ))}

      {isBot && msg.sources?.length ? (
        <button
          onClick={() => onListen(msg)}
          className="mt-2 rounded-lg border border-line px-2.5 py-0.5 text-[13px]"
        >
          🔊 {listenLabel} · {msg.voiceBy ?? 'Device voice'}
        </button>
      ) : null}
    </div>
  );
}
