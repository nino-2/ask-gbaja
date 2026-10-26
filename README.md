# Ask Gbaja (Next.js App Router + Supabase)
Setup: `npm i`, create a Supabase project, run `supabase/schema.sql`, copy `.env.example` to `.env.local`, then `npm run dev`.

## Structure
- `app/` pages: `/` `/policies` `/faq` `/about` `/contact` `/get-started` `/works`; API: `/api/ask`, `/api/contact`
- `components/layout` Navbar, Footer · `components/ui` ThemeToggle, LanguageSelect, LanguageGate, PageHeader
- `components/home` Hero, WorksCarousel, WorkCard, CtaBand · `components/chat` ChatPanel
- `context/Providers.tsx` language and theme state · `lib/i18n.ts` UI text in 5 languages · `data/` works, policies, FAQ
## Before launch
1. Replace placeholder photos in `public/images` with licensed official photos (same file names), including `gbaja.jpg`.
2. Every record in `data/` is a DRAFT. Check each against its source and set `status: 'verified'`.
3. Non-English UI text is AI-drafted and needs native-speaker review. Page body text falls back to English until translated (use `{ en, pcm, yo, ha, ig }` objects with `tr()`).
4. Approve chat answers in the `topic_texts` table only after review.

## Voice pipeline (authorised voice only)
1. Get written permission, then a voice created from a sample the speaker records himself. Put the provider key, voice ID and a consent reference in `.env.local`.
2. Have native speakers approve answers (`topic_texts.status = 'approved'`).
3. `npm run audio` creates a clip for each approved answer. New clips are **pending**.
4. Listen to each clip. Approve it in the Supabase SQL editor:
   `update voice_clips set status='approved', approved_by='Name', approved_at=now() where id = 1;`
5. The site plays a clip only if it is approved and matches the current answer text. Edit an answer and its audio stops playing until a new clip is made and approved. Otherwise users hear the labelled device voice.
Already ran the first schema? Run `supabase/migrations/002_voice_clips.sql` once.

## AI answers
Topic buttons always return the human-reviewed text. Free-text questions go to the model (`lib/ai.ts`), which may only use approved English records, must cite them, and says "no answer" otherwise. AI answers are labelled and are never read in the cloned voice (only reviewed, approved clips are). Limits: 6 AI answers per minute per user and `AI_DAILY_CAP` per day.
Already have a database? Run `supabase/migrations/003_ai.sql` once.
