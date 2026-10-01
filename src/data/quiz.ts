export type Trade = 'SOD' | 'CSA' | 'ETE'
export type Level = 'beginner' | 'intermediate'

export type Question = {
  trade: Trade
  level: Level
  topic: string
  question: string
  options: string[]
  explanation: string
}

export const QUESTIONS: Question[] = [
  { trade: 'SOD', level: 'beginner', topic: 'Variables', question: 'What does a variable store?', options: ['A value that a program can use', 'Only a function', 'Only an image', 'Only a database'], explanation: 'A variable is a named place that holds a value, which the program can read or change.' },
  { trade: 'SOD', level: 'beginner', topic: 'Algorithms', question: 'What is an algorithm?', options: ['A step-by-step procedure for solving a problem', 'A computer monitor', 'A network cable', 'An electronic component'], explanation: 'An algorithm is a clear sequence of steps used to solve a problem or complete a task.' },
  { trade: 'SOD', level: 'beginner', topic: 'Functions', question: 'Why do programmers write functions?', options: ['To group instructions so they can be reused', 'To make the screen brighter', 'To connect to Wi-Fi', 'To store data permanently'], explanation: 'A function packages a set of instructions under a name, so you can run them again without rewriting them.' },
  { trade: 'SOD', level: 'beginner', topic: 'Programming', question: 'Which of these is a programming language?', options: ['Python', 'HDMI', 'Ethernet', 'Bluetooth'], explanation: 'Python is a programming language. HDMI, Ethernet and Bluetooth are hardware or communication standards.' },
  { trade: 'SOD', level: 'beginner', topic: 'Basic Web Development', question: 'Which language gives a web page its structure and content?', options: ['HTML', 'CSS', 'SQL', 'JPEG'], explanation: 'HTML marks up headings, paragraphs, links and images. CSS controls how they look.' },
  { trade: 'SOD', level: 'beginner', topic: 'Basic Web Development', question: 'Which language controls the colors, fonts and layout of a web page?', options: ['CSS', 'HTML', 'Python', 'HTTP'], explanation: 'CSS (Cascading Style Sheets) describes the appearance and layout of HTML content.' },
  { trade: 'SOD', level: 'beginner', topic: 'Problem Solving', question: 'What is a good first step when solving a programming problem?', options: ['Understand exactly what the problem asks', 'Start typing random code', 'Delete the old program', 'Restart the computer'], explanation: 'Understanding the problem first helps you plan steps and avoid writing code that solves the wrong thing.' },
  { trade: 'SOD', level: 'beginner', topic: 'Sorting', question: 'What does sorting do to a list of data?', options: ['Arranges the items in a chosen order', 'Deletes the smallest item', 'Copies the list to a network', 'Converts it into an image'], explanation: 'Sorting rearranges items, for example from smallest to largest or A to Z.' },
  { trade: 'SOD', level: 'intermediate', topic: 'Searching', question: 'What must be true before you use binary search on a list?', options: ['The list must be sorted', 'The list must contain only text', 'The list must have fewer than 10 items', 'The list must be stored in a file'], explanation: 'Binary search compares with the middle item and discards half the list, which only works if the list is in order.' },
  { trade: 'SOD', level: 'intermediate', topic: 'Searching', question: 'How does linear search find an item?', options: ['It checks items one by one from the start', 'It always starts in the middle', 'It jumps to the last item first', 'It guesses a random position'], explanation: 'Linear search looks at each item in turn until it finds the target or reaches the end.' },
  { trade: 'SOD', level: 'intermediate', topic: 'Programming', question: 'What is a loop used for?', options: ['Repeating instructions while a condition is true', 'Naming a variable', 'Adding a border to a web page', 'Turning off a program'], explanation: 'Loops repeat a block of instructions, so you do not have to write the same code many times.' },
  { trade: 'SOD', level: 'intermediate', topic: 'Functions', question: 'What does a return statement do in a function?', options: ['Sends a result back to the code that called the function', 'Deletes the function', 'Restarts the program', 'Prints the source code'], explanation: 'return hands a value back to the place where the function was called so it can be used there.' },
  { trade: 'SOD', level: 'intermediate', topic: 'Sorting', question: 'How does bubble sort work?', options: ['It repeatedly compares neighbouring items and swaps them if they are out of order', 'It splits the list in half and discards one half', 'It picks a random order until the list is sorted', 'It adds all the numbers together'], explanation: 'Bubble sort passes over the list many times, swapping neighbours that are in the wrong order, until no swaps are needed.' },
  { trade: 'SOD', level: 'intermediate', topic: 'Searching', question: 'At most, about how many comparisons does binary search need for 1,000 sorted items?', options: ['About 10', 'About 500', 'About 1,000', 'About 100'], explanation: 'Each step halves the range: 1,000 to 500 to 250 and so on. That takes about 10 steps because 2^10 = 1,024.' },
  { trade: 'SOD', level: 'intermediate', topic: 'Variables', question: 'In a program, x is 5. After running x = x + 2, what is the value of x?', options: ['7', '5', '2', '52'], explanation: 'The right side is calculated first (5 + 2 = 7), and the result is stored back in x.' },
  { trade: 'CSA', level: 'beginner', topic: 'Computer Hardware', question: 'Which of these is an input device?', options: ['Keyboard', 'Monitor', 'Speaker', 'Printer'], explanation: 'A keyboard sends data into the computer. Monitors, speakers and printers are output devices.' },
  { trade: 'CSA', level: 'beginner', topic: 'CPU', question: 'What is the main job of the CPU?', options: ['To execute instructions and process data', 'To store files permanently', 'To supply power to the computer', 'To display images'], explanation: 'The CPU is the processor. It fetches, decodes and executes instructions.' },
  { trade: 'CSA', level: 'beginner', topic: 'Memory', question: 'What is true about RAM?', options: ['It is temporary working memory that loses its contents when power is off', 'It keeps files forever without power', 'It is the same as the monitor', 'It only stores network addresses'], explanation: 'RAM is volatile memory used for programs and data that are in use right now.' },
  { trade: 'CSA', level: 'beginner', topic: 'Operating Systems', question: 'What does an operating system do?', options: ['Manages hardware and runs programs', 'Only draws desktop wallpapers', 'Replaces the CPU', 'Only connects to the internet'], explanation: 'The operating system manages memory, storage, devices and running programs, and gives you a way to use the computer.' },
  { trade: 'CSA', level: 'beginner', topic: 'Networking', question: 'What does an IP address identify?', options: ['A device on a network', 'The size of a file', 'The language of a program', 'The colour of a cable'], explanation: 'An IP address gives a device a network address so other devices can send data to it.' },
  { trade: 'CSA', level: 'beginner', topic: 'Digital Logic', question: 'Which digits does the binary number system use?', options: ['0 and 1', '0 to 9', '1 to 8', 'A and B'], explanation: 'Binary uses only 0 and 1, matching the two states (off and on) of digital circuits.' },
  { trade: 'CSA', level: 'beginner', topic: 'Digital Logic', question: 'When is the output of an AND gate 1?', options: ['When both inputs are 1', 'When either input is 1', 'When both inputs are 0', 'Always'], explanation: 'An AND gate outputs 1 only if all of its inputs are 1.' },
  { trade: 'CSA', level: 'beginner', topic: 'Computer Hardware', question: 'Which component usually stores your files permanently?', options: ['SSD or hard drive', 'RAM', 'Cache', 'Power button'], explanation: 'SSDs and hard drives keep data even when the computer is switched off.' },
  { trade: 'CSA', level: 'intermediate', topic: 'Switching', question: 'What does a network switch use to forward frames to the right device?', options: ['MAC addresses', 'Web page titles', 'Screen resolution', 'File names'], explanation: 'A switch learns which MAC address is on which port and forwards frames only where they need to go.' },
  { trade: 'CSA', level: 'intermediate', topic: 'Routing', question: 'What is the main job of a router?', options: ['Forward packets between different networks', 'Convert paper documents', 'Increase RAM', 'Sort files alphabetically'], explanation: 'Routers use IP addresses and routing tables to send packets from one network to another.' },
  { trade: 'CSA', level: 'intermediate', topic: 'CPU', question: 'Which part of the CPU performs arithmetic and logic operations?', options: ['The ALU', 'The keyboard', 'The monitor', 'The fan'], explanation: 'The Arithmetic Logic Unit (ALU) does calculations and comparisons.' },
  { trade: 'CSA', level: 'intermediate', topic: 'Networking', question: 'What does DHCP do?', options: ['Automatically gives devices IP addresses', 'Cools the CPU', 'Encrypts hard drives only', 'Turns text into speech'], explanation: 'DHCP hands out IP addresses and other settings automatically when devices join a network.' },
  { trade: 'CSA', level: 'intermediate', topic: 'Memory', question: 'Why do CPUs include cache memory?', options: ['To give very fast access to frequently used data', 'To store movies', 'To replace the hard drive', 'To connect USB devices'], explanation: 'Cache is small, very fast memory close to the CPU that reduces waiting for slower RAM.' },
  { trade: 'CSA', level: 'intermediate', topic: 'Digital Logic', question: 'What is binary 1010 in decimal?', options: ['10', '12', '5', '101'], explanation: 'From the left: 8 + 0 + 2 + 0 = 10.' },
  { trade: 'CSA', level: 'intermediate', topic: 'Networking', question: 'With subnet mask 255.255.255.0, which part of an IPv4 address identifies the network?', options: ['The first three numbers', 'The last number only', 'All four numbers', 'None of it'], explanation: '255.255.255.0 means the first 24 bits (three numbers) are the network part and the last number identifies the host.' },
  { trade: 'ETE', level: 'beginner', topic: 'Voltage', question: 'What is the unit of voltage?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], explanation: 'Voltage is measured in volts (V).' },
  { trade: 'ETE', level: 'beginner', topic: 'Current', question: 'What is the unit of electric current?', options: ['Ampere', 'Volt', 'Ohm', 'Hertz'], explanation: 'Current is measured in amperes, or amps (A).' },
  { trade: 'ETE', level: 'beginner', topic: 'Resistance', question: 'What is the unit of resistance?', options: ['Ohm', 'Volt', 'Ampere', 'Farad'], explanation: 'Resistance is measured in ohms (Ω).' },
  { trade: 'ETE', level: 'beginner', topic: "Ohm's Law", question: "Which formula expresses Ohm's Law?", options: ['V = I × R', 'V = I + R', 'I = V × R', 'R = V × I'], explanation: "Ohm's Law says voltage equals current multiplied by resistance." },
  { trade: 'ETE', level: 'beginner', topic: 'Circuits', question: 'What does current need in order to flow in a circuit?', options: ['A complete closed path', 'An open gap', 'No voltage source', 'A broken wire'], explanation: 'Current flows only around a closed loop that includes a source. An open switch or broken wire stops it.' },
  { trade: 'ETE', level: 'beginner', topic: 'Voltage', question: 'Which component supplies voltage to a simple circuit?', options: ['A battery', 'A resistor', 'A switch', 'A wire'], explanation: 'A battery is a voltage source. Resistors, switches and wires do not create voltage.' },
  { trade: 'ETE', level: 'beginner', topic: 'Signals', question: 'What describes an analog signal?', options: ['It varies continuously over a range of values', 'It has only two possible values', 'It is always zero', 'It cannot carry sound'], explanation: 'Analog signals change smoothly, like the voltage from a microphone.' },
  { trade: 'ETE', level: 'beginner', topic: 'Digital Electronics', question: 'Which best describes a digital signal?', options: ['It uses distinct levels, usually high and low', 'It changes smoothly forever', 'It has no voltage', 'It only works with light bulbs'], explanation: 'Digital signals use separate levels that represent values such as 0 and 1.' },
  { trade: 'ETE', level: 'intermediate', topic: "Ohm's Law", question: 'A 12 V source is connected across a 4 Ω resistor. What is the current?', options: ['3 A', '48 A', '8 A', '0.33 A'], explanation: 'I = V / R = 12 / 4 = 3 A.' },
  { trade: 'ETE', level: 'intermediate', topic: 'Circuits', question: 'What is the total resistance of 10 Ω and 20 Ω resistors in series?', options: ['30 Ω', '6.7 Ω', '200 Ω', '10 Ω'], explanation: 'In series, resistances add: 10 + 20 = 30 Ω.' },
  { trade: 'ETE', level: 'intermediate', topic: 'Circuits', question: 'In a parallel circuit, how does the total resistance compare with the smallest resistor?', options: ['It is smaller', 'It is larger', 'It equals the sum of all resistors', 'It is always zero'], explanation: 'Parallel paths give current more routes, so total resistance is lower than any single branch.' },
  { trade: 'ETE', level: 'intermediate', topic: 'Circuits', question: 'Which component stores energy in an electric field?', options: ['A capacitor', 'A resistor', 'A fuse', 'A plain wire'], explanation: 'A capacitor stores energy between two plates in an electric field.' },
  { trade: 'ETE', level: 'intermediate', topic: 'Communication', question: 'Why is modulation used in communication systems?', options: ['To place information onto a carrier signal for transmission', 'To increase resistance', 'To store data on a disk', 'To reduce battery size'], explanation: 'Modulation changes a carrier wave (its amplitude, frequency or phase) so that it carries information over a channel.' },
  { trade: 'ETE', level: 'intermediate', topic: 'Signals', question: 'What is frequency measured in?', options: ['Hertz (Hz)', 'Ohms', 'Volts', 'Amperes'], explanation: 'Frequency counts cycles per second, and one cycle per second is one hertz.' },
  { trade: 'ETE', level: 'intermediate', topic: 'Digital Electronics', question: 'What does a NOT gate do?', options: ['Outputs the opposite of its input', 'Outputs 1 only when both inputs are 1', 'Always outputs 0', 'Adds two bits'], explanation: 'A NOT gate (inverter) turns 0 into 1 and 1 into 0.' },
]

export type ProfileOption = { text: string; scores: Record<Trade, number> }
export type ProfileQuestion = { q: string; o: ProfileOption[] }

export const PROFILE_QUESTIONS: ProfileQuestion[] = [
  { q: 'What would you enjoy most?', o: [{ text: 'Building a website or application', scores: { SOD: 2, CSA: 0, ETE: 0 } }, { text: 'Understanding how a computer works', scores: { SOD: 0, CSA: 2, ETE: 0 } }, { text: 'Building an electronic circuit', scores: { SOD: 0, CSA: 0, ETE: 2 } }] },
  { q: 'Which activity sounds interesting?', o: [{ text: 'Solving programming problems', scores: { SOD: 2, CSA: 0, ETE: 0 } }, { text: 'Connecting computers on a network', scores: { SOD: 0, CSA: 2, ETE: 0 } }, { text: 'Measuring voltage and current', scores: { SOD: 0, CSA: 0, ETE: 2 } }] },
  { q: 'What would you rather troubleshoot?', o: [{ text: 'A program that has an error', scores: { SOD: 2, CSA: 0, ETE: 0 } }, { text: 'A computer that cannot connect to a network', scores: { SOD: 0, CSA: 2, ETE: 0 } }, { text: 'A circuit that is not working', scores: { SOD: 0, CSA: 0, ETE: 2 } }] },
  { q: 'Which visual interests you most?', o: [{ text: 'Code', scores: { SOD: 2, CSA: 0, ETE: 0 } }, { text: 'A network diagram', scores: { SOD: 0, CSA: 2, ETE: 0 } }, { text: 'A circuit diagram', scores: { SOD: 0, CSA: 0, ETE: 2 } }] },
  { q: 'Which school project would you choose?', o: [{ text: 'Build a small app that solves a local problem', scores: { SOD: 2, CSA: 0, ETE: 0 } }, { text: 'Set up a small computer lab network', scores: { SOD: 0, CSA: 2, ETE: 0 } }, { text: 'Build a sensor-based alarm', scores: { SOD: 0, CSA: 1, ETE: 2 } }] },
  { q: 'What sounds fun in your free time?', o: [{ text: 'Creating a simple game or website', scores: { SOD: 2, CSA: 0, ETE: 0 } }, { text: 'Opening an old computer to see its parts', scores: { SOD: 0, CSA: 2, ETE: 1 } }, { text: 'Tinkering with radios or phone chargers', scores: { SOD: 0, CSA: 1, ETE: 2 } }] },
  { q: 'Which question would you like answered?', o: [{ text: 'How does a search engine put results in order?', scores: { SOD: 2, CSA: 1, ETE: 0 } }, { text: 'How does a message travel from my phone to a friend?', scores: { SOD: 0, CSA: 2, ETE: 1 } }, { text: 'How can a radio wave carry sound?', scores: { SOD: 0, CSA: 0, ETE: 2 } }] },
  { q: 'Which tool would you pick up first?', o: [{ text: 'A code editor', scores: { SOD: 2, CSA: 0, ETE: 0 } }, { text: 'A network cable tester', scores: { SOD: 0, CSA: 2, ETE: 0 } }, { text: 'A multimeter', scores: { SOD: 0, CSA: 0, ETE: 2 } }] },
  { q: 'What do you prefer working with?', o: [{ text: 'Logic and step-by-step instructions', scores: { SOD: 2, CSA: 1, ETE: 0 } }, { text: 'Hardware parts and system settings', scores: { SOD: 0, CSA: 2, ETE: 1 } }, { text: 'Components, wires and measurements', scores: { SOD: 0, CSA: 1, ETE: 2 } }] },
  { q: 'What would you take on in a team project?', o: [{ text: 'Writing the program', scores: { SOD: 2, CSA: 0, ETE: 0 } }, { text: 'Installing and configuring the computers', scores: { SOD: 0, CSA: 2, ETE: 0 } }, { text: 'Wiring and testing the electronic parts', scores: { SOD: 0, CSA: 0, ETE: 2 } }] },
  { q: 'Which topic would you read about first?', o: [{ text: 'Algorithms and data', scores: { SOD: 2, CSA: 0, ETE: 0 } }, { text: 'CPU, memory and operating systems', scores: { SOD: 0, CSA: 2, ETE: 0 } }, { text: 'Signals and communication', scores: { SOD: 0, CSA: 0, ETE: 2 } }] },
]

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickQuiz(trade: Trade | 'ALL', level: Level | 'mixed', count: number) {
  let pool = QUESTIONS
  if (trade !== 'ALL') pool = pool.filter((q) => q.trade === trade)
  if (level !== 'mixed') pool = pool.filter((q) => q.level === level)
  const picked = shuffle(pool).slice(0, Math.min(count, pool.length))
  return picked.map((q) => {
    const options = shuffle(q.options.map((text, i) => ({ text, correct: i === 0 })))
    return { ...q, options }
  })
}
