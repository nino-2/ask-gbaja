-- Run once if you already ran schema.sql and 002.
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
