export const tabContent = {
    online: {
        title: 'SAT Live Online',
        description: 
        'The design of this course avails a trainee of world-class instruction at her/ his doorstep. S/he can master best tricks of the trade from the instructor in the comfort of home. The live online brings the best of experiences of mastering the art of vocabulary through multidimensional approaches. Besides a candidate has the liberty of doubt-clearance right during the scheduled session, reducing the dogma of seeking appointment.  Additionally, s/ he may repeat all lessons within six months of enrolment if she/he encounters challenges in cracking questions.',
        oneOnoneTitle: 'SAT 1-on-1 ',
        oneOnone:
            'We offer the option of one-on-one live online learning facility for any aspirant who opts for individual guidance. This facility is open for all geographies. ',
        
        feeTitle: 'Fee Structure:',
        fee: [{ label: 'Complete Course Fee', amount: 50000, oneOnOneAmount: 100000 }],
        SectionTitle: 'Section-Wise Fee',
        SectionFee: [
            { label: 'Reading and Writing Fee', amount: 30000, oneOnOneAmount: 60000 },
            { label: 'Math Fee', amount: 20000, oneOnOneAmount: 40000 },
            { label: 'Study Material', amount: 20000},
        ],
        image: '/images/SAT.png',
        imageAlt: 'SAT Online program',
    },
    selfLearning: {
        title: 'SAT Self-learning',
        description: 
        'This course enables a candidate to learn lessons on the SAT in her/his comfortable time and choice of place. We provide pre-recorded videos of all lessons developed after a lot of research and perseverance to build confidence of a test taker. We also promise of “doubt clearance” sessions on demand with our master instructor[s]. Besides a candidate can opt for Vocabulary Session Live Online if s/he desires so.',
        feeTitle: 'Fee Structure:',
        fee: [{ label: 'Complete Course Fee', amount: 20000 }],
        SectionTitle: 'Section-Wise Fee',
        SectionFee: [
            { label: 'Reading and Writing Fee', amount: 12000 },
            { label: 'Math Fee', amount: 8000 },
            { label: 'Study Material', amount: 20000},
        ],
        image: '/images/SAT.png',
        imageAlt: 'SAT Self Learning program',
    },
    PracticeMaterial: {
        title: 'Practice Material',
        title1: 'Practice [Grand]',
        title2: 'Practice [Basic]',
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
                "purchasedPractice1Price": { label: 'Practice [Basic]', amount: 4500 }
            }
            
        ]    
        // 'A candidate may opt for only study material with promise of doubt clearance for self-practice. It is a pack of Mock-Tests and hundreds of timed topic wise tests. This pack is meant for those who know the test well but need practice material with required guidance. ',
    },
};
