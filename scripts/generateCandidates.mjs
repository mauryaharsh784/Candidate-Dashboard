import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const firstNames = [
  'Aditi', 'Rohan', 'Sara', 'Liam', 'Emma', 'Noah', 'Ananya', 'Kabir', 'Maya', 'Ethan',
  'Priya', 'Arjun', 'Olivia', 'Lucas', 'Zara', 'Ishaan', 'Chloe', 'Aarav', 'Isabella', 'Mason',
  'Diya', 'Vihaan', 'Grace', 'Nikhil', 'Amelia', 'Rahul', 'Sophia', 'Karan', 'Mia', 'Dev',
  'Ella', 'Aryan', 'Hana', 'Yusuf', 'Nora', 'Sameer', 'Lily', 'Farhan', 'Anaya', 'Omar',
]
const lastNames = [
  'Sharma', 'Patel', 'Nair', 'Gupta', 'Khan', 'Iyer', 'Mehta', 'Reddy', 'Verma', 'Singh',
  'Chen', 'Kim', 'Garcia', 'Müller', 'Rossi', 'Silva', 'Johansson', 'Novak', 'Dubois', 'Fischer',
  'Okafor', 'Adeyemi', 'Osei', 'Haddad', 'Ahmed', 'Kaur', 'Bose', 'Rao', 'Menon', 'Joshi',
]
const colleges = [
  'IIT Bombay', 'IIT Delhi', 'BITS Pilani', 'Stanford University', 'MIT', 'Carnegie Mellon University',
  'UC Berkeley', 'NIT Trichy', 'IIIT Hyderabad', 'Georgia Tech', 'University of Waterloo',
  'National University of Singapore', 'ETH Zurich', 'VIT Vellore', 'Delhi University',
  'University of Toronto', 'Purdue University', 'NYU', 'Anna University', 'IIT Madras',
]
const degrees = [
  'B.Tech Computer Science', 'B.Tech Information Technology', 'B.E. Electronics',
  'M.Tech Computer Science', 'B.Sc Computer Science', 'MCA', 'B.Tech AI & Data Science',
]
const skillPool = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'Go', 'GraphQL', 'Redux',
  'Next.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'System Design',
  'Vue.js', 'Django', 'Spring Boot', 'REST APIs', 'Jest', 'CI/CD', 'Figma', 'WebSockets',
]
const reviewStatuses = ['Pending', 'In Review', 'Shortlisted', 'Rejected']

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
function pickMany(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function randomDateWithinDays(days) {
  const now = new Date()
  const past = new Date(now.getTime() - randInt(0, days) * 24 * 60 * 60 * 1000)
  return past.toISOString().slice(0, 10)
}

const candidates = []

for (let i = 1; i <= 100; i++) {
  const first = pick(firstNames)
  const last = pick(lastNames)
  const name = `${first} ${last}`
  const emailHandle = `${first}.${last}`.toLowerCase().replace(/[^a-z.]/g, '')

  const assignmentScore = randInt(35, 100)
  const videoScore = randInt(35, 100)
  const atsScore = randInt(35, 100)
  const githubScore = randInt(20, 100)
  const communicationScore = randInt(35, 100)

  candidates.push({
    id: `cand_${String(i).padStart(4, '0')}`,
    name,
    email: `${emailHandle}${i}@examplemail.com`,
    phone: `+1-${randInt(200, 999)}-${randInt(200, 999)}-${String(randInt(0, 9999)).padStart(4, '0')}`,
    college: pick(colleges),
    degree: pick(degrees),
    github: `https://github.com/${emailHandle}${randInt(1, 99)}`,
    linkedin: `https://linkedin.com/in/${emailHandle}-${randInt(1, 99)}`,
    resume: `/resumes/${emailHandle}-resume.pdf`,
    reviewStatus: pick(reviewStatuses),
    assignmentScore,
    videoScore,
    atsScore,
    githubScore,
    communicationScore,
    skills: pickMany(skillPool, randInt(4, 8)),
    experience: randInt(0, 8),
    submissionDate: randomDateWithinDays(90),
    avatar: `https://i.pravatar.cc/150?u=${emailHandle}${i}`,
    assignmentReview: {
      uiQuality: null,
      componentStructure: null,
      stateHandling: null,
      edgeCaseHandling: null,
      responsiveness: null,
      accessibilityAwareness: null,
    },
    videoReview: {
      clarity: null,
      confidence: null,
      architectureExplanation: null,
      tradeoffReasoning: null,
      communicationStrength: null,
      notes: [],
    },
  })
}

const outPath = path.join(__dirname, '..', 'src', 'data', 'candidates.json')
fs.writeFileSync(outPath, JSON.stringify(candidates, null, 2))
console.log(`Wrote ${candidates.length} candidates to ${outPath}`)
