// Track record. Every entry needs a primary source before status can be 'verified'. Only verified entries should go live.
export type Work = {
  slug: string;
  title: string;
  image: string;
  date: string;
  summary: string;
  critics?: string;
  sources: { label: string; url: string }[];
  status: 'draft' | 'verified';
};
export const WORKS: Work[] = [
  {
    slug: 'coastal-highway',
    title: 'Lagos-Calabar Coastal Highway',
    image: '/coastal_works.jpg',
    date: 'Construction began March 2024',
    summary:
      'A planned 700 to 750 km road along the coast. Section 1 in Lagos is 47.47 km. The first 30 km was commissioned in May 2025 and Section 1 was opened to traffic in December 2025, with work continuing on later sections.',
    critics:
      'Daily Trust reported that a stretch it toured was less complete than the Works Minister stated, and the project has faced court cases and cost questions.',
    sources: [
      {
        label: 'Federal Ministry of Information',
        url: 'https://fmino.gov.ng/fg-temporarily-opens-completed-stretch-of-lagos-calabar-coastal-highway-to-traffic/',
      },
      { label: 'Channels TV', url: 'https://www.channelstv.com/?p=986910' },
      {
        label: 'Daily Trust',
        url: 'https://dailytrust.com/a-journey-through-lagos-calabar-coastal-highway',
      },
    ],
    status: 'draft',
  },
  {
    slug: 'third-mainland-bridge',
    title: 'Third Mainland Bridge repairs',
    image: '/thirdmainlandbridge_works.jpg',
    date: 'Nov 2023 to Apr 2024',
    summary:
      'The Federal Government and Lagos flagged off a ₦21 billion emergency repair in November 2023. The first phase was done by February 2024 and the bridge fully reopened in April 2024.',
    sources: [
      {
        label: 'Channels TV, Feb 2024',
        url: 'https://channelstv.com/2024/02/20/fg-gives-update-on-third-mainland-bridge-repairs-announces-traffic-diversion',
      },
      {
        label: 'Dubawa fact-check',
        url: 'https://dubawa.org/false-lagos-state-governor-did-not-renovate-third-mainland-bridge/',
      },
    ],
    status: 'draft',
  },
  {
    slug: 'nelfund',
    title: 'Student loans (NELFUND)',
    image: '/nelfund_works.jpg',
    date: 'Law signed June 2023',
    summary:
      'Loans for eligible students in public institutions under the Student Loans (Access to Higher Education) Act 2023.',
    sources: [{ label: 'NELFUND', url: 'https://nelf.gov.ng' }],
    status: 'draft',
  },
  {
    slug: 'minimum-wage',
    title: '₦70,000 national minimum wage',
    image: '/wage_works.jpg',
    date: 'Agreed July 2024',
    summary:
      'The minimum wage rose from ₦30,000 to ₦70,000 under the 2024 Amendment Act.',
    critics:
      'Most sources say it covers employers with 25 or more workers, and unions have since asked for a review because of inflation.',
    sources: [
      { label: 'Mondaq legal summary', url: 'https://www.mondaq.com/article/1510034' },
    ],
    status: 'draft',
  },
  {
    slug: 'cng',
    title: 'Presidential CNG Initiative',
    image: '/cng_works.jpg',
    date: 'Rolling out in phases',
    summary:
      'A programme to move vehicles to compressed natural gas as a cheaper fuel, with conversion centres opening in phases.',
    sources: [{ label: 'PCNGI', url: 'https://pcngi.gov.ng' }],
    status: 'draft',
  },
];
