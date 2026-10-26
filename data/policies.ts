import { Tr } from '@/lib/i18n';
type Item = { title: Tr; text: Tr };
// Source: State House statement on the eight priority areas, Nov 2023 (verify wording before launch).
export const PRIORITIES: Item[] = [
  { title: 'Reform the economy', text: 'Deliver sustained, inclusive growth.' },
  { title: 'National security', text: 'Strengthen security for peace and prosperity.' },
  {
    title: 'Agriculture and food security',
    text: 'Boost farming so Nigerians can afford food.',
  },
  {
    title: 'Energy and natural resources',
    text: 'Unlock energy and resources for growth.',
  },
  { title: 'Infrastructure and transport', text: 'Roads, bridges and transport links.' },
  { title: 'Education, health and social investment', text: 'Invest in people.' },
  {
    title: 'Diversification',
    text: 'Digital, creative, manufacturing and services industries.',
  },
  { title: 'Better governance', text: 'Improve public service delivery.' },
];
// Verify each line against an official biography before launch.
export const GBAJA_ROLE: Item[] = [
  {
    title: 'Chief of Staff to the President',
    text: 'Serves in the Presidency since 2023, supporting coordination of the President’s programmes.',
  },
  {
    title: 'Speaker of the House of Representatives, 2019 to 2023',
    text: 'Led the 9th National Assembly’s House of Representatives.',
  },
  {
    title: 'Representing Surulere I since 1999',
    text: 'A long-serving lawmaker for his Lagos constituency.',
  },
];
