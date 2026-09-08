export const courseCatalog = [
  {
    id: 'gmat',
    name: 'GMAT Preparation',
    category: 'graduate',
    categoryLabel: 'Graduate Programs',
    level: 'intermediate',
    description: 'Comprehensive GMAT preparation for business school admission',
    rating: '4.9 (2,345)',
    duration: '60-hour live lessons',
    price: 25000,
    price_doller: 265,
    price_SL: 20000,
    price_doller_SL: 200,
    icon: '/images/GMAT.png',
    highlight1: 'Mock Tests and hundreds of topic-wise authentic tests to track your progress.',
    highlight2: 'Pre-recorded video lessons for self-paced learning and revision.',
    highlight3: 'Live online doubt clearance sessions plus WhatsApp chat support.',
    highlight4: 'e-books'
  },
  {
    id: 'gre',
    name: 'GRE Preparation',
    category: 'graduate',
    categoryLabel: 'Graduate Programs',
    level: 'intermediate',
    description: 'Complete GRE preparation for graduate school admission',
    rating: '4.8 (1,876)',
    duration: '60 hours long live training',
    price: 22000,
    price_doller: 235,
    price_SL: 12000,
    price_doller_SL: 128,
    icon: '/images/GRE.png',
    highlight1: 'Mock Tests and hundreds of topic-wise authentic tests to track your progress.',
    highlight2: 'Pre-recorded video lessons for self-paced learning and revision.',
    highlight3: 'Live online doubt clearance sessions plus WhatsApp chat support.',
    highlight4: 'e-books'
  },
  {
    id: 'sat',
    name: 'SAT Preparation',
    category: 'undergraduate',
    categoryLabel: 'Undergraduate Programs',
    level: 'intermediate',
    description: 'Comprehensive SAT preparation for college admission',
    rating: '4.7 (1,543)',
    duration: '60-hour live lessons',
    price: 18000,
    price_doller: 192,
    icon: '/images/SAT.png',
    highlight1: 'Mock Tests and hundreds of topic-wise authentic tests to track your progress.',
    highlight2: 'Pre-recorded video lessons for self-paced learning and revision.',
    highlight3: 'Live online doubt clearance sessions plus WhatsApp chat support.',
    highlight4: 'e-books'
  },
  
  {
    id: 'ielts',
    name: 'IELTS Preparation',
    category: 'english',
    categoryLabel: 'English Proficiency',
    level: 'intermediate',
    description: 'IELTS preparation for international study and migration',
    rating: '4.8 (2,156)',
    duration: '30-hour Live Lessons',
    price: 15000,
    price_doller: 160,
    icon: '/images/IELTS.png',
    highlight1: 'Hundreds of Skill-wise Timed Practice Tests and Evaluation.',
    highlight2: 'Tens of Full-length Mock Tests.',
    highlight3: 'Doubt Clearance Sessions.',
    highlight4: 'e-books'
  },
  {
    id: 'cat',
    name: 'CAT Preparation',
    category: 'graduate',
    categoryLabel: 'Graduate Programs',
    level: 'advanced',
    description: 'Complete CAT preparation for IIM and top B-schools',
    rating: '4.9 (3,210)',
    duration: '150 hours',
    price: 30000,
    price_doller: 320,
    icon: '/images/CAT.png'
  },
  {
    id: 'toefl',
    name: 'TOEFL Preparation',
    category: 'english',
    categoryLabel: 'English Proficiency',
    level: 'intermediate',
    description: 'Complete TOEFL preparation for academic success',
    rating: '4.7 (1,987)',
    duration: '70 hours',
    price: 16000,
    price_doller: 170,
    icon: 'fa-language'
  }
];

export const enrollableCourses = {
  gmat: { name: 'GMAT Preparation', price: 25000, price_doller: 265, duration: '120 hours' },
  gre: { name: 'GRE Preparation', price: 22000, price_doller: 235, duration: '100 hours' },
  sat: { name: 'SAT Preparation', price: 18000, price_doller: 192, duration: '80 hours' },
  cat: { name: 'CAT Preparation', price: 30000, price_doller: 320, duration: '150 hours' },
  ielts: { name: 'IELTS Preparation', price: 15000, price_doller: 160, duration: '60 hours' },
  toefl: { name: 'TOEFL Preparation', price: 16000, price_doller: 170, duration: '70 hours' }
};

export const courseLinks = {
  //"GMAT Preparation": "/gmt-online?id=gmat",
  "GMAT Preparation": "/gmt?id=gmat",
  "GRE Preparation": "/gre?id=gre",
  "SAT Preparation": "/sat?id=sat",
  "CAT Preparation": "/cat-online",
  "IELTS Preparation": "/ielts?id=ielts",
  "TOEFL Preparation": "/tofl-online"
};
