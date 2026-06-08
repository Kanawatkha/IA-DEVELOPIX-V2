/**
 * @file src/lib/data/achievements.ts
 * @description Competition achievements data for the About page Track Record section.
 *              Extracted from about/page.tsx to keep the page file clean.
 */

// ============================================================
// TYPES
// ============================================================

export interface Achievement {
  eventName: string;
  category: string;
  model: string;
  date: string;
  status: string;
  year: string;
  tier: 'INTERNATIONAL' | 'NATIONAL' | 'REGIONAL' | 'PROVINCIAL';
  rank: 'GOLD MEDALIST' | 'SILVER MEDALIST' | 'BRONZE MEDALIST' | '4TH PLACE WINNER' | 'COMPETITOR PARTICIPANT';
}

// ============================================================
// DATA
// ============================================================

export const ACHIEVEMENTS: Achievement[] = [
  // === 2024 ===
  { eventName: 'TAIPEI ROBOT EXPO',          category: 'AUTONOMOUS DRONE OBSTACLE',    model: 'AERONAVIS 2.0',      date: 'JULY 2024',      status: 'DESIGN INNOVATION',       year: '2024', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'BERLIN TECH ARENA',           category: 'LINEFOLLOWER CLASSIC',         model: 'ATLAS 10CM',         date: 'SEPTEMBER 2024', status: 'GOLD MEDALIST',           year: '2024', tier: 'INTERNATIONAL', rank: 'GOLD MEDALIST' },
  { eventName: 'MIT ROBOTICS INVITATIONAL',   category: 'MICROMOUSE EXPERT',            model: 'MISSION GO V1',      date: 'AUGUST 2024',    status: 'FINALIST',                year: '2024', tier: 'INTERNATIONAL', rank: '4TH PLACE WINNER' },
  { eventName: 'UK ROBOTICS WEEK',            category: 'MAZE RACER AUTONOMOUS',        model: 'SPEEDSTER',          date: 'JUNE 2024',      status: 'BEST ALGORITHM',          year: '2024', tier: 'NATIONAL',      rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'SYDNEY BOT BATTLES',          category: 'SUMO 3KG AUTO',               model: 'SUMO BEETLE',        date: 'NOVEMBER 2024',  status: '1ST PLACE WINNER',        year: '2024', tier: 'INTERNATIONAL', rank: 'GOLD MEDALIST' },
  { eventName: 'CHIANG MAI ROBOFEST',         category: 'AGRICULTURAL AUTOMATION',      model: 'AGROBOT V1',         date: 'DECEMBER 2024',  status: 'BEST PROTOTYPE',          year: '2024', tier: 'PROVINCIAL',    rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'MUNICH MAKER FAIRE',          category: 'ROBOT FOOTBALL AUTONOMOUS',    model: 'GOALSTRIKER',        date: 'OCTOBER 2024',   status: 'MOST POPULAR SPEC',       year: '2024', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'KHON KAEN ROBOCUP',           category: 'MAZE SOLVER HIGH-SPEED',       model: 'MAZEMASTER',         date: 'OCTOBER 2024',   status: '1ST PLACE WINNER',        year: '2024', tier: 'REGIONAL',      rank: 'GOLD MEDALIST' },
  { eventName: 'SWITZERLAND INNOVATION LAB',  category: 'PRECISION ASSEMBLY',           model: 'MICROASSEMBLER',     date: 'MAY 2024',       status: 'ENGINEERING AWARD',       year: '2024', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'DELFT INTELLIGENT AUTOS',     category: 'SELF-DRIVING TRANSPORT',       model: 'CARGOAUTO V1',       date: 'NOVEMBER 2024',  status: 'INNOVATION TROPHY',       year: '2024', tier: 'INTERNATIONAL', rank: 'BRONZE MEDALIST' },
  { eventName: 'BANGALORE ROBOTICS EXPO',     category: 'HIGH SPEED ROVER',             model: 'MARS ROVER PRO',     date: 'DECEMBER 2024',  status: 'JURY SPECIAL MENTION',    year: '2024', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'VIENNA ROBOTICS SUMMIT',      category: 'ROBOCUP INDUSTRIAL',           model: 'ARMDEX V4',          date: 'JUNE 2024',      status: 'ACHIEVEMENT AWARD',       year: '2024', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'NONTHABURI ROBO CUP',         category: 'JUNIOR LINEFOLLOWER',          model: 'NOFAN JUNIOR',       date: 'DECEMBER 2024',  status: 'HONORABLE MENTION',       year: '2024', tier: 'PROVINCIAL',    rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'SONGKHLA AUTOMATION FAIR',    category: 'INDUSTRIAL SORT SYSTEMS',      model: 'SORTER PRO',         date: 'JULY 2024',      status: 'BEST HARDWARE',           year: '2024', tier: 'PROVINCIAL',    rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'SINGAPORE MAKER EXHIBITION',  category: 'DIY AUTONOMOUS VEHICLE',       model: 'CUSTOMVOLT',         date: 'MARCH 2024',     status: 'MAKER OF THE YEAR',       year: '2024', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'VIETNAM AUTOMATION EXPO',     category: 'SUMO PROFESSIONAL',            model: 'SUMO BEETLE X',      date: 'APRIL 2024',     status: '1ST PLACE WINNER',        year: '2024', tier: 'INTERNATIONAL', rank: 'GOLD MEDALIST' },
  { eventName: 'JAKARTA INTELLIGENT MACHINES',category: 'MAZE SOLVER MINI',             model: 'MINIMAZE V3',        date: 'SEPTEMBER 2024', status: 'BEST MAZE SOLVER',        year: '2024', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },

  // === 2025 ===
  { eventName: 'JAPAN MICROMOUSE COMPETITION',category: 'HALF-SIZE MICROMOUSE',         model: 'MISSION GO V2',      date: 'NOVEMBER 2025',  status: 'EXCELLENCE AWARD',        year: '2025', tier: 'INTERNATIONAL', rank: 'BRONZE MEDALIST' },
  { eventName: 'WORLD ROBOT OLYMPIAD',        category: 'ROBOMISSION SENIOR',           model: 'MISSION PRO',        date: 'SEPTEMBER 2025', status: 'INTERNATIONAL-RUNNER-UP', year: '2025', tier: 'INTERNATIONAL', rank: 'SILVER MEDALIST' },
  { eventName: 'NATIONAL ROBOTICS LEAGUE',    category: 'INNOVATIVE GATHERING',         model: 'GATHERING V1',       date: 'DECEMBER 2025',  status: 'BEST ENGINEERING',        year: '2025', tier: 'NATIONAL',      rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'SEOUL ROBOTICS OPEN',         category: 'WALL FOLLOWING AUTON',         model: 'WALLMASTER X',       date: 'OCTOBER 2025',   status: '1ST RUNNER-UP',           year: '2025', tier: 'INTERNATIONAL', rank: 'SILVER MEDALIST' },
  { eventName: 'EUROBOT CONFERENCE',          category: 'ADVANCED PICK-AND-PLACE',      model: 'SORTINGBOT V3',      date: 'APRIL 2025',     status: 'RESEARCH EXCELLENCE',     year: '2025', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'BEIJING ROBOTECH',            category: 'INTELLIGENT AGILITY',          model: 'AGILITY X',          date: 'AUGUST 2025',    status: 'TECHNICAL BREAKTHROUGH',  year: '2025', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'HONG KONG AI & ROBOTICS',     category: 'AUTONOMOUS MINI-RACER',        model: 'RACER MINI',         date: 'OCTOBER 2025',   status: 'INNOVATOR AWARD',         year: '2025', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'BANGKOK YOUTH CYBERNETICS',   category: 'JUNIOR AUTONOMOUS DRIVING',    model: 'CYBERDRIVE',         date: 'JUNE 2025',      status: 'CHAMPION',                year: '2025', tier: 'NATIONAL',      rank: 'GOLD MEDALIST' },
  { eventName: 'TORONTO AI RACING',           category: 'DEEP LEARNING NAVIGATION',     model: 'LEARNER RACER',      date: 'JANUARY 2025',   status: '2ND PLACE',               year: '2025', tier: 'INTERNATIONAL', rank: 'SILVER MEDALIST' },
  { eventName: 'PARIS AUTOMATION SUMMIT',     category: 'HEAVY DUTY SUMO',              model: 'SUMO COLOSSUS',      date: 'MAY 2025',       status: 'HEAVYWEIGHT CHAMPION',    year: '2025', tier: 'INTERNATIONAL', rank: 'GOLD MEDALIST' },
  { eventName: 'INTEL ROBOTICS CONTEST',      category: 'MICROMOUSE CLASSIC',           model: 'MISSION SPEED',      date: 'MARCH 2025',     status: 'SPEED RECORD',            year: '2025', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'THAILAND EMBEDDED SYSTEMS',   category: 'INTELLIGENT CART',             model: 'CARTBOT V2',         date: 'AUGUST 2025',    status: 'BEST SOFTWARE DESIGN',    year: '2025', tier: 'NATIONAL',      rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'PHUKET MARINE ROBOTICS',      category: 'AUTONOMOUS UNDERWATER',        model: 'AQUANAUT X',         date: 'JULY 2025',      status: 'DESIGN EXCELLENCE',       year: '2025', tier: 'REGIONAL',      rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'SHANGHAI TECHFEST',           category: 'INTELLIGENT PICKING',          model: 'PICKER DELTA',       date: 'MARCH 2025',     status: 'OUTSTANDING SYSTEM',      year: '2025', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'STOCKHOLM ROBOTECH',          category: 'MINI MICROMOUSE',              model: 'MOUSE MICRO 1',      date: 'FEBRUARY 2025',  status: 'SHORTEST PATH AWARD',     year: '2025', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'SYDNEY AUTONOMOUS SAILING',   category: 'SOLAR POWERED VESSEL',         model: 'SOLARSAIL 3.0',      date: 'NOVEMBER 2025',  status: 'GREEN AWARD',             year: '2025', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'MELBOURNE BOT CON',           category: 'AUTONOMOUS SUMO',              model: 'SUMO TITAN',         date: 'OCTOBER 2025',   status: '1ST RUNNER-UP',           year: '2025', tier: 'INTERNATIONAL', rank: 'SILVER MEDALIST' },
  { eventName: 'BARCELONA QUADCOPTER MEET',   category: 'AUTONOMOUS OBSTACLE AVOIDANCE',model: 'QUADCOPTER BETA',    date: 'MAY 2025',       status: 'MASTER CLASS WINNER',     year: '2025', tier: 'INTERNATIONAL', rank: 'GOLD MEDALIST' },
  { eventName: 'BANGKOK TECH HACKATHON',      category: 'AUTONOMOUS DELIVERY',          model: 'DELIVERBOT X',       date: 'SEPTEMBER 2025', status: '1ST PLACE WINNER',        year: '2025', tier: 'NATIONAL',      rank: 'GOLD MEDALIST' },
  { eventName: 'MANILA INNOVATION WEEK',      category: 'SELF-BALANCING BOT',           model: 'BALANCER V1',        date: 'JUNE 2025',      status: 'PIVOT AWARD',             year: '2025', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'NEW DELHI ROBOTICS ARENA',    category: 'LEGGED AUTONOMOUS ROBOT',      model: 'QUADRUPED ALPHA',    date: 'NOVEMBER 2025',  status: 'BEST BIOMIMICRY',         year: '2025', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },

  // === 2026 ===
  { eventName: 'THAILAND ROBOT CHAMPIONSHIP', category: 'LINEFOLLOWER HIGH-SPEED',      model: 'ATLAS NOFAN 15CM',   date: 'MAY 2026',       status: '1ST PLACE WINNER',        year: '2026', tier: 'NATIONAL',      rank: 'GOLD MEDALIST' },
  { eventName: 'BANGKOK AUTONOMOUS RACING',   category: 'FANPULL SPEED CHALLENGE',      model: 'FANPULL 18CM',       date: 'MARCH 2026',     status: 'NEW LAP RECORD',          year: '2026', tier: 'NATIONAL',      rank: '4TH PLACE WINNER' },
  { eventName: 'ASEAN ROBOT GAMES',           category: 'SUMO 3KG AUTONOMOUS',          model: 'SUMO PRO MAX',       date: 'JANUARY 2026',   status: 'GOLD MEDALIST',           year: '2026', tier: 'INTERNATIONAL', rank: 'GOLD MEDALIST' },
  { eventName: 'SINGAPORE AUTONOMOUS CHALLENGE',category:'MAZE SOLVING SPEED',          model: 'MAZERUNNER V4',      date: 'FEBRUARY 2026',  status: 'CHAMPION AWARD',          year: '2026', tier: 'INTERNATIONAL', rank: 'GOLD MEDALIST' },
  { eventName: 'TOKYO AUTONOMOUS GRAND PRIX', category: 'HIGH SPEED DRIFTING',          model: 'DRIFTBOT ALPHA',     date: 'APRIL 2026',     status: 'SPECIAL JURY PRIZE',      year: '2026', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'KUALA LUMPUR ROBOTICS SHOW',  category: 'LINEFOLLOWER FAN ASSISTED',    model: 'FANPULL 15CM',       date: 'FEBRUARY 2026',  status: '1ST PLACE WINNER',        year: '2026', tier: 'INTERNATIONAL', rank: 'GOLD MEDALIST' },
  { eventName: 'PATTAYA AI SUMMIT',           category: 'MULTI-AGENT COORDINATION',     model: 'SWARMBOT STACK',     date: 'MARCH 2026',     status: 'AI INNOVATION CUP',       year: '2026', tier: 'REGIONAL',      rank: 'BRONZE MEDALIST' },
  { eventName: 'KORAT ROBOT MASTERS',         category: 'MAZE SOLVING AUTON',           model: 'MAZERUNNER PRO',     date: 'FEBRUARY 2026',  status: 'NEW SPEED RECORD',        year: '2026', tier: 'REGIONAL',      rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'CHIANG RAI CYBERNETICS',      category: 'AI VISUAL NAVIGATION',         model: 'VISIONRACER 1',      date: 'JANUARY 2026',   status: 'BEST AI INTEGRATION',     year: '2026', tier: 'PROVINCIAL',    rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'CHONBURI SPEED CHALLENGE',    category: 'DUAL-FAN ASSISTED LINE',       model: 'DUOFAN 15',          date: 'APRIL 2026',     status: 'TRACK RECORD BREAKER',    year: '2026', tier: 'REGIONAL',      rank: 'SILVER MEDALIST' },
  { eventName: 'SEOUL SMART MOBILITY',        category: 'AUTONOMOUS DELIVERY UNIT',     model: 'CARRIER 3.0',        date: 'MAY 2026',       status: 'SMART CITY CUP',          year: '2026', tier: 'INTERNATIONAL', rank: 'COMPETITOR PARTICIPANT' },
  { eventName: 'TOKYO ROBOTICS GRAND PRIX',   category: 'FULL-SIZE MICROMOUSE',         model: 'MISSION GO ULTRA',   date: 'JUNE 2026',      status: 'GRAND PRIX CHAMPION',     year: '2026', tier: 'INTERNATIONAL', rank: 'GOLD MEDALIST' },
];
