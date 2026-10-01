export type SimId =
  | 'codeRunner'
  | 'sorting'
  | 'binary'
  | 'cssStudio'
  | 'network'
  | 'cpu'
  | 'logic'
  | 'ohm'
  | 'circuits'
  | 'comm'
  | 'rc'

export type SimMeta = {
  id: SimId
  trade: 'sod' | 'csa' | 'ete'
  name: string
  level: string
  blurb: string
  badges: string[]
}

export const SIMS: SimMeta[] = [
  { id: 'codeRunner', trade: 'sod', name: 'Interactive Code Runner', level: 'Beginner', blurb: 'Write JavaScript, run it, and observe the actual output.', badges: ['LIVE', 'INTERACTIVE'] },
  { id: 'sorting', trade: 'sod', name: 'Sorting Algorithm Lab', level: 'Beginner', blurb: 'Bubble, selection and insertion sort executed step by step.', badges: ['LIVE', 'ALGORITHM'] },
  { id: 'binary', trade: 'sod', name: 'Binary Search Simulator', level: 'Intermediate', blurb: 'Halve a sorted array using low, mid and high pointers.', badges: ['LIVE', 'ALGORITHM'] },
  { id: 'cssStudio', trade: 'sod', name: 'CSS Box & Flex Studio', level: 'Beginner', blurb: 'Tune margin, padding, flex and color and see the layout update live.', badges: ['LIVE', 'CSS', 'WEB'] },
  { id: 'network', trade: 'csa', name: 'Network Packet Simulator', level: 'Beginner', blurb: 'Send a packet hop by hop and break nodes to see failures.', badges: ['LIVE', 'NETWORK'] },
  { id: 'cpu', trade: 'csa', name: 'CPU Architecture Simulator', level: 'Intermediate', blurb: 'Fetch, decode, execute and store with a real program counter.', badges: ['LIVE', 'HARDWARE'] },
  { id: 'logic', trade: 'csa', name: 'Digital Logic Lab', level: 'Beginner', blurb: 'Boolean gates with live outputs and generated truth tables.', badges: ['LIVE', 'REAL CALCULATION'] },
  { id: 'ohm', trade: 'ete', name: "Ohm's Law Laboratory", level: 'Beginner', blurb: 'Calculate current and power from voltage and resistance.', badges: ['LIVE', 'ELECTRONICS'] },
  { id: 'circuits', trade: 'ete', name: 'Series & Parallel Circuits', level: 'Intermediate', blurb: 'Equivalent resistance, currents and voltage drops.', badges: ['LIVE', 'ELECTRONICS'] },
  { id: 'comm', trade: 'ete', name: 'Digital Communication Lab', level: 'Intermediate', blurb: 'Send bits through a noisy channel and measure the bit error rate.', badges: ['LIVE', 'INTERACTIVE'] },
  { id: 'rc', trade: 'ete', name: 'RC Time Constant Lab', level: 'Intermediate', blurb: 'Charge a capacitor and watch τ = R × C on a live voltage curve.', badges: ['LIVE', 'ELECTRONICS', 'REAL CALCULATION'] },
]
