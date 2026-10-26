-- Run this once if you already ran the first schema.sql.
alter table topic_texts drop column if exists audio_url, drop column if exists voice_by;

create table voice_clips (
  id bigserial primary key,
  slug text not null,
  lang text not null,
  text_hash text not null,          -- fingerprint of the exact answer this clip reads
  audio_url text not null,
  provider text,
  voice_label text not null,        -- shown to users, e.g. "AI-generated voice, approved by ..."
  consent_ref text not null,        -- reference to the signed permission for the voice
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz default now(),
  foreign key (slug, lang) references topic_texts (slug, lang) on delete cascade,
  unique (slug, lang, text_hash)
);

alter table voice_clips enable row level security;  -- no policies: only the server can read it
