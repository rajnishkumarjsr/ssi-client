export const tabContent = {
    online: {
        title: 'GRE Live Online',
        description: 
        'This course has been tailored to suit all sorts of aspirants—Student, Professionals, or Businessmen. A GRE Test Taker may feel comfort of home or office and learn in the presence of instructor online. The most important benefit a trainee enjoys is unlimited access to instructor until s/he has written the test. Also, there is a provision of additional Vocabulary Building session live online in most interesting manner. S/he may repeat all lessons within six months of enrolment if s/he encounters roadblocks while cracking questions.',
        oneOnoneTitle: 'GRE 1-on-1 ',
        oneOnone:
            'We offer the option of one-on-one live online learning facility for any aspirant who opts for individual guidance. This facility is open for all geographies.',
        
        feeTitle: 'Fee Structure:',
        fee: [
            { label: 'Complete Course ', amount: 35000, oneOnOneAmount: 70000 },
            { label: 'AWA: Issue Essay', amount: 5000, oneOnOneAmount: 10000 },
            { label: 'Verbal Reasoning [Full Course]', amount: 20000, oneOnOneAmount: 40000 },
            { label: 'Quantitative Reasoning [Full Course]', amount: 10000, oneOnOneAmount: 20000 },
            { label: 'Reading Comprehension', amount: 12000, oneOnOneAmount: 24000 },
            { label: 'Text Completion and Sentence Equivalence', amount: 8000, oneOnOneAmount: 16000 },
            { label: 'Study Material::', amount: 2000 },
        ],
        image: '/images/GRE.png',
        imageAlt: 'GRE Online program',
    },
    selfLearning: {
        title: 'GRE Self-learning',
        description: 
        'This course enables a candidate to learn lessons on the GRE in her/his comfortable time and choice of place. We provide pre-recorded videos of all lessons developed after a lot of research and perseverance to build confidence of a test taker. We also promise of “doubt clearance” sessions on demand with our master instructor[s]. Besides a candidate can opt for Vocabulary Session Live Online if s/he desires so.',
        
        feeTitle: 'Fee Structure:',
        fee: [
            { label: 'Complete Course Fee', amount: 12000 },
            { label: 'Verbal Reasoning', amount: 7000 },
            { label: 'Quantitative Reasoning', amount: 5000 },
            { label: 'Study Material', amount: 2000 },
        ],
        image: '/images/GRE.png',
        imageAlt: 'GRE Self Learning program',
    },
    PracticeMaterial: {
        title: 'Practice Material - GRE',
        title1: 'Practice [Grand]',
        title2: 'Practice [Large]',
        description:
        [
            {
                "freePractice": [
                    "Two Mock-Tests",
                    "Ten Free Topic-wise Practice Tests"
                ],
                "purchasedPractice": [
                    "Full-length Mock Tests [Adaptive]",
                    "Topic-wise Sectional Tests",
                    "Speedy Tests",
                    "Detailed analysis of each test",
                    "e-Books",
                    "Printed Books",
                    "Vocabulary Builder",
                    "Live online Workshops",
                    "Live online doubt clearance sessions",
                    
                ],
                "purchasedPracticePrice": { label: 'Practice [Grand]', amount: 6000 },
                
                "purchasedPractice1": [
                    "Full-length Mock Tests [Adaptive]",
                    "Topic-wise Sectional Tests",
                    "Speedy Tests",
                    "Detailed analysis of each test",
                    "e-Books",
                    "Vocabulary Builder",
                    "Pre-recorded doubt clearance videos",
                ],
                "purchasedPractice1Price": { label: 'Practice [Large]', amount: 4500 }
            }
            
        ]
            // 'A candidate may opt for only study material with promise of doubt clearance for self-practice. It is a pack of Mock-Tests and hundreds of timed topic wise tests. This pack is meant for those who know the test well but need practice material with required guidance. ',
    },
};
