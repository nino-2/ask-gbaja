-- One row per topic; one row per topic per language. Only 'approved' text is ever served.
create table topics(slug text primary key, keywords text[] not null default '{}', sort int default 0);
create table topic_texts(
  slug text references topics on delete cascade, lang text check (lang in ('en','pcm','yo','ha','ig')),
  title text not null, answer text not null, source_label text, source_url text, verified_on date,
  reviewed_by text,          -- native-speaker reviewer
  status text not null default 'draft' check (status in ('draft','approved')),
  primary key(slug,lang));
create table query_log(id bigserial primary key, lang text, question text, slug text, answered boolean, created_at timestamptz default now());
-- Browser never talks to the database: RLS on with no policies = anon access denied. Only the Next.js server (service role) reads/writes.
alter table topics enable row level security; alter table topic_texts enable row level security; alter table query_log enable row level security;
create function match_topic(q text) returns text language sql stable as
$$ select slug from topics t where exists(select 1 from unnest(t.keywords) k where lower(q) like '%'||k||'%') order by sort limit 1 $$;
insert into topics values('student-loan','{student,loan,nelf,school fee}',1),('cng','{cng,gas}',2),('minimum-wage','{wage,70k,salary}',3);
insert into topic_texts(slug,lang,title,answer,source_label,source_url,status) values
('student-loan','en','Student loan','NELFUND, set up under the Student Loans (Access to Higher Education) Act 2023, pays tuition for eligible students in public institutions. Repayment starts after youth service, from your income once you are earning.','NELFUND','https://nelf.gov.ng','draft'),
('student-loan','pcm','Student loan','NELFUND dey pay school fees for students for public schools. You go pay back small small after NYSC, when you don get work.','NELFUND','https://nelf.gov.ng','draft'),
('cng','en','CNG','The Presidential CNG Initiative supports converting vehicles to compressed natural gas as a cheaper fuel. Centres open in phases, so check the official page for current locations and prices.','Presidential CNG Initiative','https://pcngi.gov.ng','draft'),
('minimum-wage','en','Minimum wage','The national minimum wage is ₦70,000 a month under the National Minimum Wage (Amendment) Act 2024. Most sources say it covers employers with 25 or more workers.','National Minimum Wage (Amendment) Act 2024',null,'draft');
-- Review flow: after a native speaker checks a row, set status='approved', reviewed_by, verified_on.

-- Contact form messages (written by the server only)
create table contact_messages(id bigserial primary key, name text, email text, message text not null, created_at timestamptz default now());
alter table contact_messages enable row level security;


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
alter table query_log add column if not exists ai boolean not null default false;

-- Ranks approved English facts against a free-text question (used when there are many topics).
create or replace function search_facts(q text, max_rows int default 8)
returns table (slug text, rank real)
language sql stable as $$
  with terms as (
    select nullif(
      array_to_string(
        array(
          select w
          from regexp_split_to_table(lower(regexp_replace(q, '[^[:alnum:]]+', ' ', 'g')), '\s+') as w
          where length(w) > 2
        ),
        ' | '
      ),
      ''
    ) as expr
  )
  select t.slug,
         max(ts_rank(to_tsvector('english', t.title || ' ' || t.answer), to_tsquery('english', terms.expr)))::real as rank
  from topic_texts t, terms
  where t.status = 'approved'
    and t.lang = 'en'
    and terms.expr is not null
    and to_tsvector('english', t.title || ' ' || t.answer) @@ to_tsquery('english', terms.expr)
  group by t.slug
  order by rank desc
  limit max_rows
$$;
