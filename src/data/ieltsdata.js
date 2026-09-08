export const tabContent = {
    online: {
        title: 'IELTS Live Online',
        description: "Our Live Online lessons on IELTS give feel of being in a physical set up and mastering the skills at ease. The lessons embedded with technology bridge the geographical chasm in such a manner that a learner may feel the care of in-person class.",
        
        oneOnoneTitle: 'IELTS 1-on-1 ',
        oneOnone:
            'We offer the option of one-on-one live online learning facility for any aspirant who opts for individual guidance. This facility is open for all geographies.',
        
        feeTitle: 'Fee Structure:',
        fee: [{ label: 'Complete Course Fee', amount: 15000, oneOnOneAmount: 30000 }],
        SectionTitle: 'Section-Wise Fee',
        SectionFee: [
            { label: 'Reading Comprehension Fee', amount: 5000, oneOnOneAmount: 8000 },
            { label: 'Writing with Evaluation', amount: 6000, oneOnOneAmount: 15000 },
            { label: 'Speaking with Evaluation', amount: 2000, oneOnOneAmount: 7000 },
            { label: 'Listening Fee', amount: 5000, oneOnOneAmount: 5000 },
             { label: 'Study Material:', amount: 2000},
        ],
        image: '/images/IELTS.png',
        imageAlt: 'IELTS Online program',
    },
    selfLearning: {
        title: 'IELTS Self-learning',
        description: [
            '15-hour Pre-recorded Video Lessons',
            'Hundreds of Skill-wise Timed Practice Tests and Evaluation',
            'Tens of Full-length Mock Tests ',
            'Doubt Clearance Sessions',
            'e-books',
        ],
        feeTitle: 'Fee Structure:',
        fee: [
            { label: 'Complete Course Fee', amount: 7500 },
            // { label: 'Study Material:', amount: 2000},

        ],
        image: '/images/IELTS.png',
        imageAlt: 'IELTS Self Learning program',
    },
    PracticeMaterial: {
        title: 'Practice Material - IELTS',
        title1: 'Practice [Grand]',
        title2: 'Practice [Large]',
        description:
        [
            {
                "freePractice": [
                    "Two Free Mock-Tests",
                    "Ten topic-wise practice tests"
                ],
                "purchasedPractice": [
                    "Full-length Mock Tests",
                    "Module-wise Mock Tests",
                    "Item-wise Mock Tests",
                    "Weekly Mock Tests",
                    "Topic-wise lecture slides",
                    "AI evaluation of Speaking and Writing sections",
                    "e-Books",
                    "Live online score booster workshop sessions",
                    "Expert evaluation"
                ],
                "purchasedPracticePrice": { label: 'Practice [Grand]', amount: 5500 },
                
                "purchasedPractice1": [
                    "Full-length Mock Tests",
                    "Module-wise Mock Tests",
                    "Item-wise Mock Tests",
                    "Weekly Mock Tests",
                    "Topic-wise lecture slides",
                    "AI evaluation of Speaking and Writing sections"
                ],
                
                "purchasedPractice1Price": { label: 'Practice [Large]', amount: 4000 }
            }
            
        ]
            // 'A candidate may opt for only study material with promise of doubt clearance for self-practice. It is a pack of Mock-Tests and hundreds of timed topic wise tests. This pack is meant for those who know the test well but need practice material with required guidance.',
       
    },
};
