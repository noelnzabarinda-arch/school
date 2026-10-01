export const SITE_NAME = 'TVET Simulation Lab'
export const SITE_TAGLINE = 'Learn. Simulate. Master Technology.'
export const DEFAULT_DESC =
  'Interactive TVET simulations for Software Development (SOD), Computer Systems & Architecture (CSA), and Electronics & Telecommunication Engineering (ETE). Practice code, networks, circuits, and CSS in a live lab.'

export const PAGE_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: DEFAULT_DESC,
  },
  '/sod': {
    title: `Software Development (SOD) | ${SITE_NAME}`,
    description:
      'SOD simulations: JavaScript code runner, sorting algorithms, binary search, and a live CSS box-model and flexbox studio.',
  },
  '/csa': {
    title: `Computer Systems & Architecture (CSA) | ${SITE_NAME}`,
    description: 'CSA simulations for networks, CPU fetch-decode-execute, and digital logic gates with truth tables.',
  },
  '/ete': {
    title: `Electronics & Telecommunication (ETE) | ${SITE_NAME}`,
    description:
      "ETE labs for Ohm's Law, series and parallel circuits, digital communication, and RC time-constant charging.",
  },
  '/simulations': {
    title: `Interactive Simulation Lab | ${SITE_NAME}`,
    description: 'Launch live SOD, CSA, and ETE experiments: code, CSS, sorting, CPU, packets, Ohm’s Law, RC circuits, and more.',
  },
  '/quiz': {
    title: `Quiz Lab | ${SITE_NAME}`,
    description: 'Test SOD, CSA, and ETE knowledge, then explore which technology trade you currently enjoy most.',
  },
  '/contact': {
    title: `Contact | ${SITE_NAME}`,
    description: 'Ask a question, report a simulation issue, or share feedback about TVET Simulation Lab.',
  },
}

export function origin() {
  if (typeof window === 'undefined') return ''
  return window.location.origin
}
