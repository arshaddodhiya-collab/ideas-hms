
// Use IIFE to avoid polluting global namespace
(function() {
    // State
    let activeView = 'overview';
    let selectedModule = null;
    let expandedSection = null;
    let activePhase = 1;

    // Data (Translated to English)
    const coreModules = [
        {
            id: 'nhi-card',
            icon: 'shield',
            title: 'NHI IC Card Integration',
            subtitle: '健保IC卡整合', 
            priority: 'CRITICAL',
            complexity: 'High',
            timeWeeks: 4,
            description: 'Complete integration with Taiwan\'s National Health Insurance IC card system. Every patient interaction starts with card verification.',
            features: [
                'Real-time card verification with NHIA server',
                'Read last 6 visit history from IC card chip',
                'Drug allergy alerts from card data',
                'Automatic copayment calculation (4 categories)',
                'Cross-hospital medical record access',
                'IC card reader hardware integration'
            ],
            entities: ['NHICard', 'CardVisitHistory', 'NHICardAllergy'],
            apis: [
                'POST /api/v1/nhi/cards/verify',
                'GET /api/v1/nhi/cards/{cardNumber}/history',
                'GET /api/v1/nhi/eligibility/check',
                'POST /api/v1/nhi/cards/update-visit'
            ],
            color: 'from-blue-600 to-cyan-500',
            impact: '23M+ cardholders, 100% patient coverage'
        },
        {
            id: 'nhi-claims',
            icon: 'file-text',
            title: 'NHI Claims Management',
            subtitle: '健保申報系統',
            priority: 'CRITICAL',
            complexity: 'High',
            timeWeeks: 4,
            description: 'Automated claim generation, submission, and tracking with NHIA. Hospital revenue depends on this module.',
            features: [
                'Auto-generate claims from encounters',
                'ICD-10 and procedure code validation',
                'Real-time claim submission to NHIA',
                'Claim status tracking and notifications',
                'Rejection handling and resubmission',
                'Payment reconciliation reports'
            ],
            entities: ['NHIClaim', 'NHIClaimItem', 'ClaimIcdCode', 'ClaimProcedureCode'],
            apis: [
                'POST /api/v1/claims/generate',
                'POST /api/v1/claims/{id}/submit',
                'GET /api/v1/claims/{claimNumber}/status',
                'PUT /api/v1/claims/{id}/resubmit'
            ],
            color: 'from-green-600 to-emerald-500',
            impact: '99.9% coverage, <2% rejection rate target'
        },
        {
            id: 'tcm',
            icon: 'leaf',
            title: 'TCM Integration',
            subtitle: '中西醫整合系統',
            priority: 'IMPORTANT',
            complexity: 'Medium',
            timeWeeks: 6,
            description: 'Traditional Chinese Medicine integration - unique to Taiwan\'s NHI system covering both Western and TCM.',
            features: [
                'Four diagnostics (Inspection, Listening/Smelling, Inquiry, Palpation) documentation',
                'Constitution type assessment',
                'Herbal prescription builder with NHI codes',
                'Acupuncture session tracking',
                'TCM-Western drug interaction checker',
                'Insurance coverage for both modalities'
            ],
            entities: ['TCMConsultation', 'HerbalPrescription', 'HerbalIngredient', 'AcupunctureSession'],
            apis: [
                'POST /api/v1/tcm/consultations',
                'POST /api/v1/tcm/prescriptions/herbal',
                'POST /api/v1/tcm/acupuncture/sessions',
                'GET /api/v1/tcm/formulas/search'
            ],
            color: 'from-amber-600 to-orange-500',
            impact: '50% population uses both TCM & Western medicine'
        },
        {
            id: 'pharmacy',
            icon: 'pill',
            title: 'Pharmacy Network',
            subtitle: '藥局網絡整合',
            priority: 'IMPORTANT',
            complexity: 'Medium',
            timeWeeks: 3,
            description: 'Connect to 6,000+ pharmacies nationwide for prescription transfers and medication pickup.',
            features: [
                'Find nearest pharmacies (map-based)',
                'Transfer prescriptions across pharmacies',
                'Check medication availability',
                'E-prescription transmission',
                'Patient notification when ready',
                'Chronic disease auto-refill'
            ],
            entities: ['PharmacyPartner', 'PrescriptionTransfer'],
            apis: [
                'GET /api/v1/pharmacies/nearby',
                'POST /api/v1/prescriptions/{id}/transfer',
                'GET /api/v1/pharmacies/{id}/inventory',
                'POST /api/v1/prescriptions/{id}/notify'
            ],
            color: 'from-purple-600 to-pink-500',
            impact: '6,000+ pharmacies, 1 per 2,000 people'
        },
        {
            id: 'healthbank',
            icon: 'database',
            title: 'My Health Bank',
            subtitle: '個人健康存摺',
            priority: 'MEDIUM',
            complexity: 'Medium',
            timeWeeks: 3,
            description: 'Government-backed personal health data repository. 10M+ active users managing their health data.',
            features: [
                'Sync patient data to government cloud',
                'Patient-controlled data sharing',
                'Granular consent management',
                'Export health summary PDF',
                'Lifetime medical record access',
                'Cross-hospital data retrieval'
            ],
            entities: ['HealthBankConsent', 'HealthBankAuthorizedProvider'],
            apis: [
                'POST /api/v1/healthbank/sync',
                'GET /api/v1/healthbank/retrieve/{nationalId}',
                'PUT /api/v1/healthbank/consent/update',
                'GET /api/v1/healthbank/export/pdf'
            ],
            color: 'from-indigo-600 to-blue-500',
            impact: '10M+ users, government-backed security'
        },
        {
            id: 'telehealth',
            icon: 'smartphone',
            title: 'Telemedicine Platform',
            subtitle: '遠距醫療平台',
            priority: 'MEDIUM',
            complexity: 'High',
            timeWeeks: 4,
            description: 'Video consultations with NHI reimbursement, especially for rural and offshore island populations.',
            features: [
                'HD video consultation rooms',
                'NHI-reimbursed telehealth',
                'E-prescription to pharmacy',
                'Rural/island priority queuing',
                'Multi-language support',
                'Connection quality monitoring'
            ],
            entities: ['TelehealthSession'],
            apis: [
                'POST /api/v1/telehealth/sessions/create',
                'GET /api/v1/telehealth/sessions/{id}/join',
                'PUT /api/v1/telehealth/sessions/{id}/complete',
                'POST /api/v1/telehealth/prescriptions/send'
            ],
            color: 'from-rose-600 to-red-500',
            impact: '24/7 access, 100% island coverage'
        },
        {
            id: 'preventive',
            icon: 'heart',
            title: 'Preventive Screening',
            subtitle: '預防保健篩檢',
            priority: 'MEDIUM',
            complexity: 'Low',
            timeWeeks: 2,
            description: 'Track free NHI-covered screenings (adult health check, cancer screenings) and send reminders.',
            features: [
                'Eligibility checker (age-based)',
                'Automated screening reminders',
                '4 major cancer screenings',
                'Adult health check management',
                'Follow-up scheduling',
                'Population compliance tracking'
            ],
            entities: ['PreventiveScreening'],
            apis: [
                'GET /api/v1/preventive/eligibility/{patientId}',
                'POST /api/v1/preventive/screenings',
                'GET /api/v1/preventive/reminders/send',
                'GET /api/v1/preventive/compliance/report'
            ],
            color: 'from-green-600 to-teal-500',
            impact: 'Free screenings, early detection focus'
        }
    ];

    const workflowSteps = [
        { step: 1, name: 'IC Card Check-in', icon: 'shield', desc: 'Patient inserts NHI IC card at kiosk/counter' },
        { step: 2, name: 'Eligibility Verification', icon: 'check-circle', desc: 'System verifies with NHIA in real-time' },
        { step: 3, name: 'Appointment/Registration', icon: 'calendar', desc: 'Schedule or walk-in registration' },
        { step: 4, name: 'Triage & Vitals', icon: 'activity', desc: 'Nurse records vital signs' },
        { step: 5, name: 'Consultation', icon: 'users', desc: 'Doctor consultation (Western or TCM)' },
        { step: 6, name: 'Prescription', icon: 'pill', desc: 'E-prescription sent to pharmacy' },
        { step: 7, name: 'Claims Generation', icon: 'file-text', desc: 'Auto-generate NHI claim from encounter' },
        { step: 8, name: 'Data Sync', icon: 'database', desc: 'Sync to My Health Bank if consented' }
    ];

    const implementationPhases = [
        {
            phase: 1,
            title: 'Foundation',
            weeks: '1-4',
            modules: ['nhi-card', 'nhi-claims'],
            tasks: [
                'Add NHI IC card entities and relationships',
                'Implement card verification service (mock API)',
                'Create claims management entities',
                'Build claims dashboard UI',
                'Add Taiwan-specific patient fields'
            ],
            deliverables: [
                'Working IC card reader interface',
                'Claims generation from encounters',
                'Basic NHI integration framework'
            ]
        },
        {
            phase: 2,
            title: 'TCM Integration',
            weeks: '5-8',
            modules: ['tcm'],
            tasks: [
                'Create TCM consultation entities',
                'Build herbal prescription module',
                'Implement acupuncture tracking',
                'Create TCM UI components',
                'Add TCM practitioner role'
            ],
            deliverables: [
                'TCM consultation forms',
                'Herbal prescription builder',
                'TCM-Western integration'
            ]
        },
        {
            phase: 3,
            title: 'External Integrations',
            weeks: '9-12',
            modules: ['pharmacy', 'healthbank'],
            tasks: [
                'Integrate with NHIA API (sandbox)',
                'Connect to My Health Bank',
                'Implement pharmacy network',
                'Add prescription transfer',
                'Test end-to-end claim flow'
            ],
            deliverables: [
                'Live NHIA connectivity',
                'Pharmacy network map',
                'E-prescription transmission'
            ]
        },
        {
            phase: 4,
            title: 'Advanced Features',
            weeks: '13-16',
            modules: ['telehealth', 'preventive'],
            tasks: [
                'Telehealth video integration',
                'Preventive screening tracker',
                'Mobile IC card reader app',
                'Analytics dashboard',
                'Compliance reports'
            ],
            deliverables: [
                'Working telehealth platform',
                'Screening reminder system',
                'Mobile patient app'
            ]
        },
        {
            phase: 5,
            title: 'Production Ready',
            weeks: '17-20',
            modules: [],
            tasks: [
                'Load testing (23M patient scale)',
                'Security audit (PDPA compliance)',
                'User acceptance testing',
                'Documentation and training',
                'Production deployment'
            ],
            deliverables: [
                'Production-ready system',
                'Full documentation',
                'Training materials'
            ]
        }
    ];

    const technicalStack = [
        {
            category: 'Backend Extensions',
            items: [
                { name: 'Spring Boot 3.x', status: 'existing', desc: 'Core framework (already in place)' },
                { name: 'IC Card Reader SDK', status: 'new', desc: 'Taiwan government-provided library' },
                { name: 'NHIA API Client', status: 'new', desc: 'OAuth2 integration with NHIA' },
                { name: 'WebRTC Server', status: 'new', desc: 'For telehealth video calls' },
                { name: 'Pharmacy Network API', status: 'new', desc: 'REST client for pharmacy integration' }
            ]
        },
        {
            category: 'Database Schema',
            items: [
                { name: '15+ New Tables', status: 'new', desc: 'Taiwan-specific entities' },
                { name: 'Modified Entities', status: 'update', desc: 'User, Patient, Prescription, Consultation' },
                { name: 'Indexes & Constraints', status: 'new', desc: 'Performance optimization' },
                { name: 'Audit Tables', status: 'new', desc: 'PDPA compliance logging' }
            ]
        },
        {
            category: 'Frontend Components',
            items: [
                { name: 'NHI Card Reader UI', status: 'new', desc: 'Real-time card reading interface' },
                { name: 'TCM Consultation Form', status: 'new', desc: 'Four Diagnostics input and formula builder' },
                { name: 'Claims Dashboard', status: 'new', desc: 'Submission tracking and reports' },
                { name: 'Pharmacy Map', status: 'new', desc: 'Google Maps integration' },
                { name: 'Telehealth Room', status: 'new', desc: 'Video consultation interface' }
            ]
        },
        {
            category: 'External APIs',
            items: [
                { name: 'NHIA Verification API', status: 'new', desc: 'IC card and eligibility checks' },
                { name: 'NHIA Claims API', status: 'new', desc: 'Claim submission and tracking' },
                { name: 'My Health Bank API', status: 'new', desc: 'Government health data sync' },
                { name: 'Pharmacy Network API', status: 'new', desc: 'Prescription transfers' },
                { name: 'Telehealth Platform', status: 'new', desc: 'VidyoConnect or Webex integration' }
            ]
        }
    ];

    const quickWins = [
        {
            title: 'Add NHI Card Number Field',
            time: '1 hour',
            difficulty: 'Easy',
            impact: 'High',
            code: `@Column(unique = true, length = 12)\nprivate String nhiCardNumber;`,
            description: 'Add to Patient entity, update registration form'
        },
        {
            title: 'Taiwan Address Format',
            time: '2 hours',
            difficulty: 'Easy',
            impact: 'Medium',
            code: `@Embeddable\npublic class TaiwanAddress {\n    private String city; // City/County\n    private String district; // District\n    private String postalCode; // Postal Code\n}`,
            description: 'Proper Taiwan address structure'
        },
        {
            title: 'Bilingual UI (Traditional Chinese/English)',
            time: '4 hours',
            difficulty: 'Easy',
            impact: 'High',
            code: `# messages_zh_TW.properties\npatient.registration=Patient Registration\nnhi.card.number=NHI Card Number`,
            description: 'i18n support for Traditional Chinese'
        },
        {
            title: 'Phone Number Validation',
            time: '1 hour',
            difficulty: 'Easy',
            impact: 'Low',
            code: `@Pattern(regexp = "^(09\\\\d{8}|0\\\\d{1,2}-\\\\d{7,8})$")\nprivate String phoneNumber;`,
            description: 'Taiwan mobile and landline formats'
        }
    ];

    // Functions
    function init() {
        renderNavigation();
        renderOverviewExtras();
        renderModules();
        renderWorkflow();
        renderRoadmap();
        renderTechnical();
        renderQuickWins();
        lucide.createIcons();
    }

    function renderNavigation() {
        const tabs = [
            { id: 'overview', label: 'Overview', icon: 'globe' },
            { id: 'modules', label: 'Core Modules', icon: 'database' },
            { id: 'workflow', label: 'Workflow', icon: 'trending-up' },
            { id: 'roadmap', label: 'Roadmap', icon: 'calendar' },
            { id: 'technical', label: 'Technical Stack', icon: 'code' },
            { id: 'quickwins', label: 'Quick Wins', icon: 'zap' }
        ];

        const navContainer = document.getElementById('navigation');
        navContainer.innerHTML = tabs.map(tab => `
            <button
                onclick="window.switchView('${tab.id}')"
                class="flex-1 min-w-[140px] px-4 py-3 rounded-lg transition-all flex items-center gap-2 justify-center ${
                    activeView === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }"
            >
                <i data-lucide="${tab.icon}" class="w-4 h-4"></i>
                <span class="font-medium text-sm">${tab.label}</span>
            </button>
        `).join('');
    }

    window.switchView = function(viewId) {
        activeView = viewId;
        renderNavigation();
        document.querySelectorAll('[data-view]').forEach(view => {
            if (view.dataset.view === viewId) {
                view.classList.add('active');
                lucide.createIcons();
            } else {
                view.classList.remove('active');
            }
        });
    };

    function renderOverviewExtras() {
        // Unique System List
        const uniqueSystem = [
            'IC card-based system (20+ years of digital health data)',
            'Single-payer model - all claims through NHIA',
            'TCM and Western medicine under one umbrella',
            '6,000+ pharmacy network with transfers'
        ];
        document.getElementById('unique-system-list').innerHTML = uniqueSystem.map(item => `
            <li class="flex items-start gap-2">
                <i data-lucide="check" class="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0"></i>
                <span>${item}</span>
            </li>
        `).join('');

        // Tech Landscape List
        const techLandscape = [
            '92% smartphone penetration - mobile-first',
            'Government-backed My Health Bank (10M+ users)',
            'Telehealth with NHI reimbursement',
            'Real-time API integrations required by law'
        ];
        document.getElementById('tech-landscape-list').innerHTML = techLandscape.map(item => `
            <li class="flex items-start gap-2">
                <i data-lucide="check" class="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0"></i>
                <span>${item}</span>
            </li>
        `).join('');
    }

    function renderModules() {
        const container = document.getElementById('modules-container');
        container.innerHTML = coreModules.map(module => {
            const isSelected = selectedModule === module.id;
            return `
                <div
                    class="bg-gradient-to-br ${module.color} rounded-xl shadow-xl p-6 text-white cursor-pointer transition-all ${
                        isSelected ? 'scale-105 ring-4 ring-white' : 'hover:scale-102'
                    }"
                    onclick="window.toggleModule('${module.id}')"
                >
                    <div class="flex items-start gap-4 mb-4">
                        <div class="bg-white/20 p-3 rounded-lg backdrop-blur">
                            <i data-lucide="${module.icon}" class="w-8 h-8"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <h3 class="text-2xl font-bold">${module.title}</h3>
                                ${module.priority === 'CRITICAL' ? `
                                    <span class="bg-red-500 text-xs px-2 py-1 rounded-full font-semibold">
                                        CRITICAL
                                    </span>
                                ` : ''}
                            </div>
                            <!-- Subtitle removed as requested to English only, or kept if useful as context? -->
                            <!-- Keeping subtitle in smaller font or just using English description -->
                            <p class="text-sm text-white/80 mb-2">${module.subtitle} (${module.title})</p>
                            <div class="flex gap-2 text-xs">
                                <span class="bg-white/20 px-2 py-1 rounded-full">${module.timeWeeks} weeks</span>
                                <span class="bg-white/20 px-2 py-1 rounded-full">${module.complexity}</span>
                            </div>
                        </div>
                    </div>
                    
                    <p class="text-white/95 leading-relaxed mb-4">
                        ${module.description}
                    </p>
                    
                    <div class="bg-white/10 backdrop-blur rounded-lg p-3 mb-3">
                        <div class="text-xs text-white/70 mb-1">Impact</div>
                        <div class="text-sm font-semibold">${module.impact}</div>
                    </div>
                    
                    ${isSelected ? `
                        <div class="border-t border-white/30 pt-4 mt-4 space-y-4">
                            <div>
                                <div class="text-sm font-semibold mb-2 text-white/90">✨ Key Features:</div>
                                <ul class="space-y-1">
                                    ${module.features.map(feature => `
                                        <li class="text-sm text-white/90 flex items-start gap-2">
                                            <i data-lucide="chevron-right" class="w-4 h-4 mt-0.5 flex-shrink-0"></i>
                                            <span>${feature}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                            <div>
                                <div class="text-sm font-semibold mb-2 text-white/90">🗄️ Entities:</div>
                                <div class="flex flex-wrap gap-2">
                                    ${module.entities.map(entity => `
                                        <span class="bg-white/20 px-2 py-1 rounded text-xs font-mono">
                                            ${entity}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                             <div>
                                <div class="text-sm font-semibold mb-2 text-white/90">🔌 APIs:</div>
                                <ul class="space-y-1">
                                    ${module.apis.map(api => `
                                        <li class="text-xs font-mono bg-black/20 px-2 py-1 rounded">
                                            ${api}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
        lucide.createIcons();
    }

    window.toggleModule = function(moduleId) {
        selectedModule = selectedModule === moduleId ? null : moduleId;
        renderModules();
    };

    function renderWorkflow() {
        const container = document.getElementById('workflow-container');
        container.innerHTML = workflowSteps.map((step, idx) => {
            const isLast = idx === workflowSteps.length - 1;
            return `
                <div class="relative">
                    <div class="flex items-start gap-4">
                        <div class="flex flex-col items-center">
                            <div class="bg-gradient-to-br from-blue-600 to-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg z-10">
                                ${step.step}
                            </div>
                             ${!isLast ? '<div class="w-0.5 h-16 bg-gradient-to-b from-blue-600 to-green-500 my-2 absolute top-12 left-6 -ml-px"></div>' : ''}
                        </div>
                        
                        <div class="flex-1 pb-6 pl-2">
                            <div class="flex items-center gap-3 mb-2">
                                <i data-lucide="${step.icon}" class="w-6 h-6 text-blue-600"></i>
                                <h4 class="text-xl font-bold text-gray-800">${step.name}</h4>
                            </div>
                            <p class="text-gray-600">${step.desc}</p>
                            
                            ${step.step === 1 ? `
                                <div class="mt-3 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                                    <div class="font-semibold text-blue-900 mb-1">Taiwan-Specific</div>
                                    <div class="text-sm text-blue-800">
                                        Every patient has a government-issued NHI IC card with embedded chip containing 
                                        medical history. Card reading is mandatory and instantaneous.
                                    </div>
                                </div>
                            ` : ''}
                            ${step.step === 5 ? `
                                <div class="mt-3 bg-amber-50 border-l-4 border-amber-600 p-4 rounded">
                                    <div class="font-semibold text-amber-900 mb-1">TCM Option</div>
                                    <div class="text-sm text-amber-800">
                                        Patient can choose Traditional Chinese Medicine consultation with 
                                        Four Diagnostics or Western medicine - both covered by NHI.
                                    </div>
                                </div>
                            ` : ''}
                            ${step.step === 7 ? `
                                <div class="mt-3 bg-green-50 border-l-4 border-green-600 p-4 rounded">
                                    <div class="font-semibold text-green-900 mb-1">Automated Process</div>
                                    <div class="text-sm text-green-800">
                                        Claims are auto-generated from encounters with ICD-10 codes, procedure codes, 
                                        and NHI pricing. Submitted to NHIA via API for reimbursement.
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Real-time Integrations List
        const realtimeInteg = [
            'NHIA API - Card verification & eligibility',
            'IC Card Reader - Hardware integration',
            'Pharmacy Network - E-prescription send'
        ];
        document.getElementById('realtime-integ-list').innerHTML = realtimeInteg.map(item => `
            <li class="flex items-start gap-2">
                <i data-lucide="external-link" class="w-4 h-4 mt-0.5 flex-shrink-0"></i>
                <span>${item}</span>
            </li>
        `).join('');

        // Batch Integrations List
        const batchInteg = [
            'Claims Submission - Daily batch to NHIA',
            'My Health Bank - Nightly data sync',
            'Payment Reconciliation - Weekly from NHIA'
        ];
        document.getElementById('batch-integ-list').innerHTML = batchInteg.map(item => `
            <li class="flex items-start gap-2">
                <i data-lucide="clock" class="w-4 h-4 mt-0.5 flex-shrink-0"></i>
                <span>${item}</span>
            </li>
        `).join('');

        lucide.createIcons();
    }

    function renderRoadmap() {
        const tabsContainer = document.getElementById('roadmap-tabs');
        tabsContainer.innerHTML = implementationPhases.map(phase => `
            <button
                onclick="window.setPhase(${phase.phase})"
                class="px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    activePhase === phase.phase
                    ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }"
            >
                Phase ${phase.phase}: ${phase.title}
                <div class="text-xs opacity-75 mt-1">Weeks ${phase.weeks}</div>
            </button>
        `).join('');

        const contentContainer = document.getElementById('roadmap-content');
        const phase = implementationPhases.find(p => p.phase === activePhase);
        
        if (phase) {
            contentContainer.innerHTML = `
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800">
                                Phase ${phase.phase}: ${phase.title}
                            </h3>
                            <p class="text-gray-600">Weeks ${phase.weeks}</p>
                        </div>
                        <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                            ${phase.modules.length > 0 ? `${phase.modules.length} Modules` : 'Final Phase'}
                        </div>
                    </div>

                    ${phase.modules.length > 0 ? `
                        <div class="mb-6">
                            <h4 class="font-semibold text-gray-800 mb-3">📦 Modules in This Phase:</h4>
                            <div class="flex flex-wrap gap-2">
                                ${phase.modules.map(moduleId => {
                                    const module = coreModules.find(m => m.id === moduleId);
                                    if (!module) return '';
                                    return `
                                        <div class="bg-gradient-to-r ${module.color} text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                            <i data-lucide="${module.icon}" class="w-4 h-4"></i>
                                            <span class="text-sm font-semibold">${module.title}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-3">✅ Tasks:</h4>
                            <ul class="space-y-2">
                                ${phase.tasks.map(task => `
                                    <li class="flex items-start gap-2 text-gray-700">
                                        <i data-lucide="check-circle" class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"></i>
                                        <span class="text-sm">${task}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <div>
                            <h4 class="font-semibold text-gray-800 mb-3">🎯 Deliverables:</h4>
                            <ul class="space-y-2">
                                ${phase.deliverables.map(deliverable => `
                                    <li class="flex items-start gap-2 text-gray-700">
                                        <i data-lucide="zap" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"></i>
                                        <span class="text-sm">${deliverable}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                
                ${phase.phase === 5 ? `
                    <div class="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-xl p-8 text-white">
                        <h4 class="text-2xl font-bold mb-4">🎉 Production Launch Checklist</h4>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h5 class="font-semibold mb-3">Technical Readiness</h5>
                                <ul class="space-y-2 text-sm">
                                    <li class="flex items-center gap-2">
                                        <i data-lucide="check" class="w-4 h-4"></i>
                                        Load tested for 23M patient scale
                                    </li>
                                    <!-- Add other checklist items here if needed -->
                                </ul>
                            </div>
                            <div>
                                <h5 class="font-semibold mb-3">Compliance & Training</h5>
                                <ul class="space-y-2 text-sm">
                                    <li class="flex items-center gap-2">
                                        <i data-lucide="check" class="w-4 h-4"></i>
                                        PDPA compliance audit passed
                                    </li>
                                     <!-- Add other checklist items here if needed -->
                                </ul>
                            </div>
                        </div>
                    </div>
                ` : ''}
            `;
            lucide.createIcons();
        }
    }

    window.setPhase = function(phase) {
        activePhase = phase;
        renderRoadmap();
    };

    function renderTechnical() {
        const container = document.getElementById('technical-container');
        container.innerHTML = technicalStack.map((category, idx) => {
            const isExpanded = expandedSection === idx;
            return `
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div 
                        class="flex items-center justify-between cursor-pointer"
                        onclick="window.toggleTechSection(${idx})"
                    >
                        <h4 class="text-xl font-bold text-gray-800">${category.category}</h4>
                        <i data-lucide="${isExpanded ? 'chevron-down' : 'chevron-right'}" class="w-6 h-6 text-gray-600"></i>
                    </div>

                    ${isExpanded ? `
                        <div class="mt-4 space-y-3">
                            ${category.items.map(item => `
                                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                                    <div class="flex-shrink-0">
                                        ${item.status === 'existing' ? '<div class="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-semibold">EXISTING</div>' : ''}
                                        ${item.status === 'new' ? '<div class="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">NEW</div>' : ''}
                                        ${item.status === 'update' ? '<div class="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">UPDATE</div>' : ''}
                                    </div>
                                    <div class="flex-1">
                                        <h5 class="font-semibold text-gray-800 mb-1">${item.name}</h5>
                                        <p class="text-sm text-gray-600">${item.desc}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
        lucide.createIcons();
    }

    window.toggleTechSection = function(idx) {
        expandedSection = expandedSection === idx ? null : idx;
        renderTechnical();
    };

    function renderQuickWins() {
        const container = document.getElementById('quickwins-container');
        container.innerHTML = quickWins.map(win => `
            <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all">
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <h4 class="text-xl font-bold text-gray-800 mb-1">${win.title}</h4>
                        <div class="flex gap-2 items-center flex-wrap">
                            <span class="text-sm text-gray-600">${win.time}</span>
                            <span class="text-gray-400">•</span>
                            <span class="text-sm font-semibold ${win.difficulty === 'Easy' ? 'text-green-600' : 'text-yellow-600'}">
                                ${win.difficulty}
                            </span>
                            <span class="text-gray-400">•</span>
                            <span class="text-sm font-semibold ${win.impact === 'High' ? 'text-red-600' : win.impact === 'Medium' ? 'text-yellow-600' : 'text-gray-600'}">
                                ${win.impact} Impact
                            </span>
                        </div>
                    </div>
                    <i data-lucide="zap" class="w-8 h-8 text-yellow-500"></i>
                </div>

                <p class="text-gray-600 mb-4 text-sm">${win.description}</p>

                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre class="text-xs text-green-400 font-mono"><code>${win.code}</code></pre>
                </div>
            </div>
        `).join('');

          // Checklist
          const checklist = [
            'Add nhiCardNumber field to Patient entity',
            'Update patient registration form UI',
            'Implement Taiwan address structure',
            'Add phone number validation',
            'Set up i18n for Traditional Chinese',
            'Create basic IC card reader UI mockup',
            'Research NHIA API documentation',
            'Set up development environment'
        ];
        document.getElementById('checklist-container').innerHTML = checklist.map(task => `
             <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer">
                <input type="checkbox" class="w-5 h-5 text-blue-600 rounded" />
                <span class="text-gray-700">${task}</span>
            </div>
        `).join('');

        lucide.createIcons();
    }

    // kickoff
    init();
})();
