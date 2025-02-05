// @ts-check

const educationalPlatforms = {
    scootle: {
        name: 'Scootle',
        url: 'https://www.scootle.edu.au',
        description: 'Australian Government education portal providing digital resources aligned with the Australian Curriculum',
        features: [
            'Interactive learning resources',
            'Curriculum-aligned content',
            'Teacher professional development materials',
            'Assessment resources'
        ],
        subjects: ['English', 'Mathematics', 'Science', 'History', 'The Arts']
    },
    nfsa: {
        name: 'National Film and Sound Archive',
        url: 'https://www.nfsa.gov.au/learning',
        description: 'Australia\'s living archive of film, television, and sound recordings with educational resources',
        features: [
            'Digital learning resources',
            'Australian film history',
            'Indigenous perspectives',
            'Cultural heritage materials'
        ],
        subjects: ['Media Arts', 'History', 'Indigenous Studies', 'Cultural Studies']
    },
    acara: {
        name: 'Australian Curriculum',
        url: 'https://www.australiancurriculum.edu.au',
        description: 'Official Australian Curriculum resources and guidelines',
        features: [
            'Curriculum documents',
            'Assessment frameworks',
            'Cross-curriculum priorities',
            'Learning area resources'
        ],
        subjects: ['All curriculum areas']
    },
    screenAustralia: {
        name: 'Screen Australia',
        description: 'Access comprehensive statistics and data about Australian screen content, industry trends, and production insights.',
        features: [
            'Production statistics and trends',
            'Industry data and research',
            'Cinema and audience insights',
            'Gender representation data'
        ],
        subjects: ['Media Arts', 'Film Studies', 'Data Analysis', 'Industry Research'],
        url: 'https://www.screenaustralia.gov.au/fact-finders',
        alternativeResources: [
            {
                title: 'Production Trends',
                url: 'https://www.screenaustralia.gov.au/fact-finders/production-trends'
            },
            {
                title: 'Cinema Statistics',
                url: 'https://www.screenaustralia.gov.au/fact-finders/cinema'
            },
            {
                title: 'People and Businesses',
                url: 'https://www.screenaustralia.gov.au/fact-finders/people-and-businesses'
            }
        ]
    }
};

const australianPlays = [
    {
        id: 'play1',
        title: 'The Club',
        playwright: 'David Williamson',
        year: 1977,
        type: 'play',
        category: 'contemporary',
        region: 'Australia',
        rating: 'PG',
        duration: '120 minutes',
        themes: ['Power', 'Loyalty', 'Australian Rules Football', 'Corporate Culture'],
        synopsis: 'A satirical look at the politics and power plays within an Australian Rules football club.',
        source: 'Australian Plays Transform',
        location: {
            city: 'Melbourne',
            state: 'Victoria',
            country: 'Australia'
        },
        educationalResources: {
            themes: [
                'Power dynamics in Australian sport',
                'Traditional values vs. modern corporate culture',
                'Masculinity in Australian society'
            ],
            discussionQuestions: [
                'How does the play reflect the commercialization of sport?',
                'What role does tradition play in the story?',
                'How are different forms of power represented?'
            ],
            activities: [
                'Character analysis through monologue writing',
                'Modern adaptation workshop',
                'Compare with contemporary sports politics'
            ],
            additionalResources: [
                {
                    type: 'study guide',
                    url: 'https://australianplays.org/the-club-study-guide',
                    description: 'Comprehensive study guide for teachers'
                }
            ],
            curriculumLinks: [
                {
                    platform: 'Scootle',
                    url: 'https://www.scootle.edu.au/ec/search?q=australian+drama',
                    description: 'Drama resources aligned with Australian Curriculum'
                },
                {
                    platform: 'ACARA',
                    url: 'https://www.australiancurriculum.edu.au/resources/drama',
                    description: 'Official curriculum resources for drama studies'
                }
            ],
            culturalContext: {
                historicalBackground: 'Set in the 1970s during the commercialization of Australian Rules football',
                culturalSignificance: 'Explores the transition of Australian sport from amateur to professional status',
                teachingResources: [
                    {
                        title: 'Australian Sports History',
                        url: 'https://www.nfsa.gov.au/australian-sports-history',
                        type: 'historical context'
                    },
                    {
                        title: 'Australian Theatre History',
                        url: 'https://www.ausstage.edu.au',
                        type: 'theatrical context'
                    }
                ]
            },
            lessonPlans: [
                {
                    title: 'Power and Authority in Australian Sport',
                    duration: '2 hours',
                    objectives: [
                        'Analyze power relationships in Australian sport',
                        'Examine the role of tradition vs progress',
                        'Explore dramatic techniques in Australian theatre'
                    ],
                    activities: [
                        'Group discussion on sports commercialization',
                        'Role-play key scenes',
                        'Written analysis of character motivations'
                    ],
                    assessmentIdeas: [
                        'Essay on power dynamics',
                        'Creative writing from character perspectives',
                        'Group presentation on themes'
                    ]
                },
                {
                    title: 'Australian Drama Analysis',
                    duration: '2 hours',
                    objectives: [
                        'Analyze dramatic techniques in Australian theatre',
                        'Explore cultural themes and significance',
                        'Develop critical analysis skills'
                    ],
                    activities: [
                        'Scene analysis workshop',
                        'Character study discussion',
                        'Cultural context research'
                    ],
                    assessmentIdeas: [
                        'Performance analysis essay',
                        'Creative interpretation project',
                        'Cultural context presentation'
                    ]
                }
            ]
        },
        curriculum: {
            year: '11-12',
            subjects: ['English', 'Drama'],
            outcomes: [
                'Analysis of dramatic techniques',
                'Understanding of Australian cultural identity',
                'Critical analysis of power relationships'
            ],
            alignments: [
                'ACARA 9.1: Australian Literature',
                'ACARA 10.2: Drama Studies'
            ]
        }
    },
    {
        id: 'play2',
        title: 'Summer of the Seventeenth Doll',
        playwright: 'Ray Lawler',
        year: 1955,
        type: 'play',
        category: 'classic',
        region: 'Australia',
        rating: 'PG',
        duration: '150 minutes',
        themes: ['Australian Identity', 'Change', 'Relationships', 'Tradition'],
        synopsis: 'A poignant exploration of change and tradition in post-war Australian society.',
        source: 'Australian Theatre Archive',
        location: {
            city: 'Carlton',
            state: 'Victoria',
            country: 'Australia'
        },
        educationalResources: {
            themes: [
                'Australian identity in the 1950s',
                'Gender roles and expectations',
                'The end of tradition'
            ],
            discussionQuestions: [
                'How does the play represent Australian identity?',
                'What role does nostalgia play in the narrative?',
                'How are changing social values depicted?'
            ],
            activities: [
                'Period research and presentation',
                'Scene analysis and performance',
                'Character relationship mapping'
            ],
            additionalResources: [
                {
                    type: 'historical context',
                    url: 'https://australianplays.org/doll-trilogy',
                    description: 'Historical background and context'
                }
            ]
        },
        curriculum: {
            year: '11-12',
            subjects: ['English', 'Drama', 'History'],
            outcomes: [
                'Understanding of post-war Australian society',
                'Analysis of dramatic symbolism',
                'Exploration of character development'
            ],
            alignments: [
                'ACARA 9.3: Historical Context',
                'ACARA 11.1: Australian Drama'
            ]
        }
    }
];

const australianMovies = [
    {
        id: 'movie1',
        title: 'Rabbit-Proof Fence',
        director: 'Phillip Noyce',
        year: 2002,
        type: 'movie',
        category: 'historical',
        region: 'Australia',
        rating: 'PG',
        duration: '94 minutes',
        themes: ['Indigenous Rights', 'Stolen Generation', 'Survival', 'Family'],
        synopsis: 'Based on a true story about three Aboriginal girls who escape from a settlement camp and make their way home by following the rabbit-proof fence.',
        source: 'National Film and Sound Archive',
        location: {
            state: 'Western Australia',
            country: 'Australia'
        },
        educationalResources: {
            themes: [
                'The Stolen Generation',
                'Indigenous Australian history',
                'Cultural identity and survival'
            ],
            discussionQuestions: [
                'How does the film represent the impact of government policies?',
                'What role does landscape play in the narrative?',
                'How is cultural identity portrayed?'
            ],
            activities: [
                'Historical context research',
                'Film technique analysis',
                'Creative writing from character perspectives'
            ],
            additionalResources: [
                {
                    type: 'teaching kit',
                    url: 'https://www.nfsa.gov.au/rabbit-proof-fence-study-guide',
                    description: 'NFSA educational resources'
                }
            ],
            curriculumLinks: [
                {
                    platform: 'Scootle',
                    url: 'https://www.scootle.edu.au/ec/search?q=indigenous+history',
                    description: 'Indigenous history resources'
                },
                {
                    platform: 'ACARA',
                    url: 'https://www.australiancurriculum.edu.au/resources/aboriginal-and-torres-strait-islander-histories-and-cultures/',
                    description: 'Indigenous perspectives in curriculum'
                }
            ],
            culturalContext: {
                historicalBackground: 'Based on true events from Australia\'s Stolen Generation period',
                culturalSignificance: 'Significant film in Australian Indigenous storytelling',
                teachingResources: [
                    {
                        title: 'Stolen Generation History',
                        url: 'https://www.nfsa.gov.au/stolen-generations',
                        type: 'historical context'
                    },
                    {
                        title: 'Indigenous Australian Cinema',
                        url: 'https://www.screenaustralia.gov.au/indigenous',
                        type: 'film context'
                    }
                ]
            },
            lessonPlans: [
                {
                    title: 'Understanding the Stolen Generation through Film',
                    duration: '3 hours',
                    objectives: [
                        'Understand the historical context of the Stolen Generation',
                        'Analyze film techniques in storytelling',
                        'Explore themes of identity and survival'
                    ],
                    activities: [
                        'Historical document analysis',
                        'Film scene analysis',
                        'Creative response writing'
                    ],
                    assessmentIdeas: [
                        'Research project on the Stolen Generation',
                        'Film analysis essay',
                        'Creative response to themes'
                    ]
                },
                {
                    title: 'Australian Film Analysis',
                    duration: '3 hours',
                    objectives: [
                        'Analyze film techniques and storytelling',
                        'Explore Australian cultural themes',
                        'Develop media literacy skills'
                    ],
                    activities: [
                        'Film technique analysis',
                        'Cultural representation discussion',
                        'Historical context research'
                    ],
                    assessmentIdeas: [
                        'Film analysis essay',
                        'Creative response project',
                        'Historical context presentation'
                    ]
                }
            ]
        },
        curriculum: {
            year: '9-12',
            subjects: ['English', 'History', 'Media Studies'],
            outcomes: [
                'Understanding of Indigenous Australian history',
                'Analysis of film techniques',
                'Critical thinking about historical perspectives'
            ],
            alignments: [
                'ACARA 9.4: Indigenous Perspectives',
                'ACARA 10.3: Film Studies'
            ]
        }
    },
    {
        id: 'movie2',
        title: 'The Sapphires',
        director: 'Wayne Blair',
        year: 2012,
        type: 'movie',
        category: 'musical drama',
        region: 'Australia',
        rating: 'PG',
        duration: '103 minutes',
        themes: ['Music', 'Indigenous Culture', 'Civil Rights', 'Identity'],
        synopsis: 'Based on a true story of four Aboriginal women who form a music group and perform for troops during the Vietnam War.',
        source: 'Screen Australia',
        location: {
            state: 'Victoria',
            country: 'Australia'
        },
        educationalResources: {
            themes: [
                'Indigenous Australian culture and music',
                '1960s social change',
                'Personal identity and empowerment'
            ],
            discussionQuestions: [
                'How does music contribute to storytelling?',
                'What social issues does the film address?',
                'How are themes of identity explored?'
            ],
            activities: [
                'Music and historical context analysis',
                'Character development study',
                'Creative performance workshop'
            ],
            additionalResources: [
                {
                    type: 'study guide',
                    url: 'https://www.screenaustralia.gov.au/the-sapphires-education',
                    description: 'Screen Australia educational resources'
                }
            ]
        },
        curriculum: {
            year: '9-12',
            subjects: ['English', 'Drama', 'Music', 'History'],
            outcomes: [
                'Understanding of historical context',
                'Analysis of narrative techniques',
                'Exploration of cultural representation'
            ],
            alignments: [
                'ACARA 9.2: Music in Context',
                'ACARA 10.1: Australian History'
            ]
        }
    }
];

// Add educational resources to each play and movie
australianPlays.forEach(play => {
    play.educationalResources = {
        ...play.educationalResources,
        curriculumLinks: [
            {
                platform: 'Scootle',
                url: `https://www.scootle.edu.au/ec/search?q=${encodeURIComponent(play.title)}`,
                description: 'Drama resources aligned with Australian Curriculum'
            },
            {
                platform: 'ACARA',
                url: 'https://www.australiancurriculum.edu.au/resources/drama',
                description: 'Official curriculum resources for drama studies'
            }
        ],
        culturalContext: {
            historicalBackground: play.educationalResources.culturalContext?.historicalBackground || '',
            culturalSignificance: play.educationalResources.culturalContext?.culturalSignificance || '',
            teachingResources: [
                ...(play.educationalResources.culturalContext?.teachingResources || []),
                {
                    title: 'Australian Theatre History',
                    url: 'https://www.ausstage.edu.au',
                    type: 'theatrical context'
                }
            ]
        },
        lessonPlans: [
            ...(play.educationalResources.lessonPlans || []),
            {
                title: 'Australian Drama Analysis',
                duration: '2 hours',
                objectives: [
                    'Analyze dramatic techniques in Australian theatre',
                    'Explore cultural themes and significance',
                    'Develop critical analysis skills'
                ],
                activities: [
                    'Scene analysis workshop',
                    'Character study discussion',
                    'Cultural context research'
                ],
                assessmentIdeas: [
                    'Performance analysis essay',
                    'Creative interpretation project',
                    'Cultural context presentation'
                ]
            }
        ]
    };
});

australianMovies.forEach(movie => {
    movie.educationalResources = {
        ...movie.educationalResources,
        curriculumLinks: [
            {
                platform: 'Screen Australia',
                url: `https://www.screenaustralia.gov.au/study/${encodeURIComponent(movie.title)}`,
                description: 'Film study resources and teaching materials'
            },
            {
                platform: 'NFSA',
                url: 'https://www.nfsa.gov.au/learning',
                description: 'Australian film and media resources'
            }
        ],
        culturalContext: {
            historicalBackground: movie.educationalResources.culturalContext?.historicalBackground || '',
            culturalSignificance: movie.educationalResources.culturalContext?.culturalSignificance || '',
            teachingResources: [
                ...(movie.educationalResources.culturalContext?.teachingResources || []),
                {
                    title: 'Australian Cinema History',
                    url: 'https://www.nfsa.gov.au/australian-cinema',
                    type: 'film context'
                }
            ]
        },
        lessonPlans: [
            ...(movie.educationalResources.lessonPlans || []),
            {
                title: 'Australian Film Analysis',
                duration: '3 hours',
                objectives: [
                    'Analyze film techniques and storytelling',
                    'Explore Australian cultural themes',
                    'Develop media literacy skills'
                ],
                activities: [
                    'Film technique analysis',
                    'Cultural representation discussion',
                    'Historical context research'
                ],
                assessmentIdeas: [
                    'Film analysis essay',
                    'Creative response project',
                    'Historical context presentation'
                ]
            }
        ]
    };
});

// Single export statement at the end
export { educationalPlatforms, australianPlays, australianMovies }; 