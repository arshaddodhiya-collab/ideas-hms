// Application State
const state = {
    activeView: 'overview',
    selectedModule: null,
    expandedSection: null,
    activePhase: 1
};

// Data
const coreModules = [
    {
        id: 'abha',
        icon: '🔐',
        title: 'ABHA Integration',
        subtitle: 'Ayushman Bharat Health Account',
        priority: 'CRITICAL',
        complexity: 'High',
        timeWeeks: 4,
        description: 'Complete integration with India\'s unified health ID system (ABHA - Ayushman Bharat Health Account). 14-digit unique health ID for every citizen.',
        features: [
            'ABHA number generation and linking',
            'Aadhaar-based authentication',
            'Health records linked to ABHA',
            'Consent management for data sharing',
            'QR code-based patient identification',
            'Mobile OTP verification',
            'Interoperability with ABDM network'
        ],
        entities: ['ABHACard', 'ABHAConsent', 'ConsentArtifact', 'HealthLockerLink'],
        apis: [
            'POST /api/v1/abha/generate',
            'POST /api/v1/abha/link-aadhaar',
            'GET /api/v1/abha/{abhaNumber}/verify',
            'POST /api/v1/abha/consent/request',
            'GET /api/v1/abha/health-records'
        ],
        color: 'gradient-orange',
        impact: '500M+ potential users, mandatory for Ayushman Bharat'
    },
    {
        id: 'abdm',
        icon: '💾',
        title: 'ABDM PHR Integration',
        subtitle: 'Personal Health Records',
        priority: 'CRITICAL',
        complexity: 'High',
        timeWeeks: 5,
        description: 'Integration with Ayushman Bharat Digital Mission (ABDM) for unified personal health records accessible across India.',
        features: [
            'Health Information Provider (HIP) registration',
            'Health Information User (HIU) capability',
            'FHIR-compliant data exchange',
            'Consent-based health record sharing',
            'Digital health locker integration',
            'Lab reports, prescriptions, discharge summaries',
            'Unified Health Interface (UHI) support'
        ],
        entities: ['HealthRecord', 'ConsentRequest', 'DataTransfer', 'FHIRResource'],
        apis: [
            'POST /api/v1/abdm/hip/register',
            'POST /api/v1/abdm/records/push',
            'GET /api/v1/abdm/records/pull',
            'POST /api/v1/abdm/consent/notify',
            'POST /api/v1/fhir/bundle'
        ],
        color: 'gradient-blue',
        impact: 'National digital health ecosystem'
    },
    {
        id: 'ayushman',
        icon: '🛡️',
        title: 'PM-JAY Integration',
        subtitle: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana',
        priority: 'CRITICAL',
        complexity: 'Medium',
        timeWeeks: 4,
        description: 'Integration with world\'s largest government-funded health insurance scheme covering 500M+ beneficiaries with ₹5 lakh annual coverage.',
        features: [
            'Beneficiary verification via e-card',
            'Pre-authorization request automation',
            'Claims submission to SHA (State Health Agency)',
            'Package rate validation',
            'Empanelment status checking',
            'Real-time claim approval tracking',
            'Fraud detection and compliance'
        ],
        entities: ['PMJAYBeneficiary', 'PreAuthRequest', 'ABPMJAYClaim', 'PackageRate'],
        apis: [
            'POST /api/v1/pmjay/verify-beneficiary',
            'POST /api/v1/pmjay/preauth/create',
            'POST /api/v1/pmjay/claims/submit',
            'GET /api/v1/pmjay/claims/{id}/status',
            'GET /api/v1/pmjay/packages/rates'
        ],
        color: 'gradient-green',
        impact: '500M beneficiaries, ₹5L coverage per family'
    },
    {
        id: 'ayurveda',
        icon: '🌿',
        title: 'AYUSH Integration',
        subtitle: 'Ayurveda, Yoga, Unani, Siddha, Homeopathy',
        priority: 'IMPORTANT',
        complexity: 'Medium',
        timeWeeks: 6,
        description: 'Integration of traditional Indian medicine systems alongside modern allopathy. AYUSH ministry certified practitioners and treatments.',
        features: [
            'Ayurveda consultation (Prakriti analysis)',
            'Dosha assessment and treatment plans',
            'Herbal formulation database',
            'Panchakarma treatment tracking',
            'Yoga therapy prescriptions',
            'Homeopathy remedy selection',
            'Unani and Siddha medicine support'
        ],
        entities: ['AYUSHConsultation', 'PrakritiAssessment', 'HerbalFormulation', 'PanchakarmaSession'],
        apis: [
            'POST /api/v1/ayush/consultation/create',
            'POST /api/v1/ayush/prakriti/assess',
            'GET /api/v1/ayush/formulations/search',
            'POST /api/v1/ayush/panchakarma/session'
        ],
        color: 'gradient-amber',
        impact: '750,000+ AYUSH practitioners, 80% rural preference'
    },
    {
        id: 'telemedicine',
        icon: '📱',
        title: 'eSanjeevani Platform',
        subtitle: 'National Telemedicine Service',
        priority: 'HIGH',
        complexity: 'Medium',
        timeWeeks: 4,
        description: 'Integration with government\'s eSanjeevani telemedicine platform. Doctor-to-Doctor (B2B) and Patient-to-Doctor (B2C) consultations.',
        features: [
            'Video consultation rooms',
            'eSanjeevani OPD integration',
            'Prescription generation post-consultation',
            'Multi-language support (22 languages)',
            'Low-bandwidth optimization',
            'Rural healthcare center connectivity',
            'Queue management for teleconsultations'
        ],
        entities: ['TeleConsultation', 'ESanjeevaniSession', 'RemotePrescription'],
        apis: [
            'POST /api/v1/esanjeevani/session/create',
            'GET /api/v1/esanjeevani/queue/status',
            'POST /api/v1/esanjeevani/prescription/generate',
            'POST /api/v1/esanjeevani/notify-patient'
        ],
        color: 'gradient-purple',
        impact: '100M+ consultations, 155,000+ telemedicine centers'
    },
    {
        id: 'cowin',
        icon: '❤️',
        title: 'CoWIN Integration',
        subtitle: 'Vaccination & Immunization',
        priority: 'MEDIUM',
        complexity: 'Low',
        timeWeeks: 2,
        description: 'Integration with CoWIN platform for vaccination records, immunization tracking, and digital vaccine certificates.',
        features: [
            'Vaccination record retrieval',
            'Digital vaccine certificate generation',
            'Immunization schedule tracking',
            'Vaccine stock management',
            'Adverse event reporting (AEFI)',
            'Beneficiary registration support'
        ],
        entities: ['VaccinationRecord', 'VaccineCertificate', 'ImmunizationSchedule'],
        apis: [
            'GET /api/v1/cowin/certificate/{beneficiaryId}',
            'POST /api/v1/cowin/vaccination/record',
            'GET /api/v1/cowin/immunization/schedule',
            'POST /api/v1/cowin/aefi/report'
        ],
        color: 'gradient-red',
        impact: '2B+ vaccine doses administered'
    },
    {
        id: 'insurance',
        icon: '💳',
        title: 'Multi-Payer Insurance',
        subtitle: 'TPA & Private Insurance Integration',
        priority: 'HIGH',
        complexity: 'High',
        timeWeeks: 5,
        description: 'Integration with Third-Party Administrators (TPAs) and private insurance companies for cashless hospitalization and claims.',
        features: [
            'TPA network integration (ICICI Lombard, Star Health, etc.)',
            'E-card verification (physical + QR)',
            'Pre-authorization workflow',
            'Cashless claim submission',
            'Claim status tracking',
            'Package rate negotiation support',
            'Reimbursement claim processing'
        ],
        entities: ['InsurancePolicy', 'TPAPreAuth', 'CashlessClaim', 'PolicyCoverage'],
        apis: [
            'POST /api/v1/insurance/verify-policy',
            'POST /api/v1/tpa/preauth/submit',
            'GET /api/v1/tpa/preauth/{id}/status',
            'POST /api/v1/insurance/claim/cashless',
            'POST /api/v1/insurance/claim/reimbursement'
        ],
        color: 'gradient-indigo',
        impact: '25+ major TPAs, 30+ insurance companies'
    },
    {
        id: 'pharma',
        icon: '💊',
        title: 'Jan Aushadhi & Generic',
        subtitle: 'Affordable Medicine Network',
        priority: 'MEDIUM',
        complexity: 'Medium',
        timeWeeks: 3,
        description: 'Integration with Jan Aushadhi Kendras (generic medicine stores) and online pharmacy networks for affordable medication access.',
        features: [
            'Jan Aushadhi Kendra locator',
            'Generic medicine substitution',
            'E-prescription to pharmacy',
            'Medicine price comparison',
            'Home delivery integration',
            'Stock availability checker',
            'Subsidy calculation'
        ],
        entities: ['PharmacyPartner', 'GenericMapping', 'MedicinePrice', 'PrescriptionFulfillment'],
        apis: [
            'GET /api/v1/pharmacy/jan-aushadhi/nearby',
            'POST /api/v1/pharmacy/generic/substitute',
            'POST /api/v1/prescription/send-to-pharmacy',
            'GET /api/v1/pharmacy/medicine/price-compare'
        ],
        color: 'gradient-teal',
        impact: '9,000+ Jan Aushadhi Kendras, 75% cost savings'
    }
];

const implementationPhases = [
    {
        phase: 1,
        title: 'Foundation & Identity',
        weeks: '1-4',
        modules: ['abha', 'abdm'],
        tasks: [
            'Set up ABDM sandbox environment',
            'Implement ABHA generation and linking',
            'Create consent management framework',
            'Build FHIR data models',
            'Integrate Aadhaar authentication',
            'Develop health record push/pull APIs'
        ],
        deliverables: [
            'Working ABHA ID generation',
            'Patient health records in ABDM',
            'Consent-based data sharing'
        ]
    },
    {
        phase: 2,
        title: 'Insurance & Coverage',
        weeks: '5-9',
        modules: ['ayushman', 'insurance'],
        tasks: [
            'PM-JAY beneficiary verification',
            'Pre-authorization workflow automation',
            'TPA integration (3-5 major TPAs)',
            'Claims submission engines',
            'Package rate database setup',
            'Empanelment compliance checks'
        ],
        deliverables: [
            'Ayushman Bharat integration live',
            'Multi-TPA claim processing',
            'Automated pre-auth system'
        ]
    },
    {
        phase: 3,
        title: 'Traditional Medicine',
        weeks: '10-15',
        modules: ['ayurveda'],
        tasks: [
            'AYUSH practitioner registration',
            'Prakriti assessment tools',
            'Herbal formulation database',
            'Panchakarma session tracking',
            'Yoga therapy module',
            'Homeopathy remedy selection'
        ],
        deliverables: [
            'Complete AYUSH consultation module',
            'Traditional medicine prescriptions',
            'Integration with allopathy'
        ]
    },
    {
        phase: 4,
        title: 'Digital Services',
        weeks: '16-20',
        modules: ['telemedicine', 'cowin', 'pharma'],
        tasks: [
            'eSanjeevani platform integration',
            'Multi-language UI (Hindi, regional)',
            'CoWIN vaccination records',
            'Jan Aushadhi network integration',
            'Mobile app for patient access',
            'Low-bandwidth optimization'
        ],
        deliverables: [
            'Live telemedicine platform',
            'Vaccination certificate integration',
            'Pharmacy network connectivity'
        ]
    },
    {
        phase: 5,
        title: 'Production & Scale',
        weeks: '21-24',
        modules: [],
        tasks: [
            'Load testing (1.4B population scale)',
            'Regional language support (22 languages)',
            'Rural connectivity optimization',
            'Compliance audit (DPDPA 2023)',
            'State-wise deployment',
            'Training and documentation'
        ],
        deliverables: [
            'Production-ready multi-state system',
            'Complete documentation',
            'Government approval certifications'
        ]
    }
];

const indiaSpecificChallenges = [
    {
        challenge: 'Diverse Healthcare Systems',
        icon: '🏥',
        description: 'Mix of government hospitals, private hospitals, primary health centers, Ayurveda clinics',
        solution: 'Multi-facility type support with role-based workflows for each'
    },
    {
        challenge: 'Language Diversity',
        icon: '🗣️',
        description: '22 official languages, hundreds of dialects, varying literacy levels',
        solution: 'Unicode support, voice-based interfaces, pictorial navigation'
    },
    {
        challenge: 'Insurance Fragmentation',
        icon: '💳',
        description: 'PM-JAY (government), 25+ TPAs, 30+ private insurers, state schemes',
        solution: 'Universal insurance integration layer with adapter pattern'
    },
    {
        challenge: 'Rural Connectivity',
        icon: '📡',
        description: '65% rural population, intermittent internet, low bandwidth',
        solution: 'Offline-first architecture, data sync queues, SMS fallbacks'
    },
    {
        challenge: 'Traditional Medicine',
        icon: '🌿',
        description: 'AYUSH practitioners (750K+), parallel treatment systems',
        solution: 'Dual-track medical records, cross-system referral support'
    },
    {
        challenge: 'Aadhaar Integration',
        icon: '🔐',
        description: 'Mandatory for government schemes, privacy concerns, eKYC requirements',
        solution: 'Secure Aadhaar vault, consent-based access, virtual ID support'
    }
];

const technicalStack = [
    {
        category: 'Government APIs',
        items: [
            { name: 'ABDM Gateway', status: 'new', desc: 'Health records exchange via FHIR' },
            { name: 'ABHA API', status: 'new', desc: 'Health ID generation and verification' },
            { name: 'PM-JAY Portal API', status: 'new', desc: 'Beneficiary verification and claims' },
            { name: 'eSanjeevani API', status: 'new', desc: 'Telemedicine session management' },
            { name: 'CoWIN API', status: 'new', desc: 'Vaccination records and certificates' },
            { name: 'DigiLocker', status: 'new', desc: 'Digital document storage' }
        ]
    },
    {
        category: 'Authentication Systems',
        items: [
            { name: 'Aadhaar eKYC', status: 'new', desc: 'Biometric authentication' },
            { name: 'DigiYatra', status: 'new', desc: 'Digital identity verification' },
            { name: 'Mobile OTP (Indian carriers)', status: 'new', desc: 'SMS-based verification' },
            { name: 'Virtual ID Support', status: 'new', desc: 'Aadhaar privacy protection' }
        ]
    },
    {
        category: 'Data Standards',
        items: [
            { name: 'FHIR R4', status: 'new', desc: 'ABDM-mandated health data standard' },
            { name: 'SNOMED CT', status: 'new', desc: 'Clinical terminology' },
            { name: 'ICD-10 (India Edition)', status: 'new', desc: 'Diagnosis coding' },
            { name: 'LOINC', status: 'new', desc: 'Lab and observation codes' }
        ]
    },
    {
        category: 'Payment Gateways',
        items: [
            { name: 'UPI Integration', status: 'new', desc: 'PhonePe, Google Pay, Paytm' },
            { name: 'Payment Gateway (Razorpay/Paytm)', status: 'new', desc: 'Card/netbanking' },
            { name: 'BHIM UPI', status: 'new', desc: 'Government UPI app' },
            { name: 'NEFT/RTGS', status: 'new', desc: 'Bank transfers for claims' }
        ]
    }
];

const quickWins = [
    {
        title: 'Add ABHA Number Field',
        time: '1 hour',
        difficulty: 'Easy',
        impact: 'Critical',
        code: `@Column(unique = true, length = 14)
@Pattern(regexp = "^\\\\d{14}$")
private String abhaNumber; // 14-digit health ID`,
        description: 'Mandatory for ABDM integration'
    },
    {
        title: 'Indian Phone Number Validation',
        time: '1 hour',
        difficulty: 'Easy',
        impact: 'High',
        code: `@Pattern(regexp = "^[6-9]\\\\d{9}$")
private String mobileNumber; // Indian 10-digit mobile`,
        description: 'Valid Indian mobile numbers start with 6-9'
    },
    {
        title: 'Multi-Language Support',
        time: '3 hours',
        difficulty: 'Medium',
        impact: 'High',
        code: `# messages_hi.properties (Hindi)
patient.registration=रोगी पंजीकरण
abha.number=आयुष्मान भारत स्वास्थ्य खाता`,
        description: 'i18n for Hindi and regional languages'
    },
    {
        title: 'Aadhaar Number Field',
        time: '2 hours',
        difficulty: 'Easy',
        impact: 'Critical',
        code: `@Column(unique = true, length = 12)
@Pattern(regexp = "^[2-9]{1}[0-9]{11}$")
private String aadhaarNumber; // Encrypted storage`,
        description: 'Secure Aadhaar storage with encryption'
    },
    {
        title: 'Indian Address Format',
        time: '2 hours',
        difficulty: 'Easy',
        impact: 'Medium',
        code: `@Embeddable
public class IndianAddress {
    private String line1;
    private String line2;
    private String city;
    private String district;
    private String state;
    private String pincode; // 6 digits
}`,
        description: 'Proper Indian address structure with pincode'
    },
    {
        title: 'UPI Payment Integration',
        time: '4 hours',
        difficulty: 'Medium',
        impact: 'High',
        code: `// Razorpay UPI integration
RazorpayClient razorpay = new RazorpayClient(
    apiKey, apiSecret
);
JSONObject options = new JSONObject();
options.put("amount", amount * 100); // paise
options.put("currency", "INR");`,
        description: 'Accept UPI, cards, wallets for payments'
    }
];

const stateSpecific = [
    {
        state: 'Karnataka',
        scheme: 'Suvarna Arogya Suraksha',
        coverage: '₹5L per family',
        beneficiaries: '14M families'
    },
    {
        state: 'Tamil Nadu',
        scheme: 'Chief Minister\'s Health Insurance',
        coverage: '₹5L per family',
        beneficiaries: '20M families'
    },
    {
        state: 'Andhra Pradesh',
        scheme: 'YSR Aarogyasri',
        coverage: '₹5L per family',
        beneficiaries: '10M families'
    },
    {
        state: 'Maharashtra',
        scheme: 'Mahatma Jyotiba Phule Jan Arogya Yojana',
        coverage: '₹1.5L per family',
        beneficiaries: '30M families'
    },
    {
        state: 'West Bengal',
        scheme: 'Swasthya Sathi',
        coverage: '₹5L per family',
        beneficiaries: '7M families'
    }
];

// Helper Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Render Functions
function renderHeader() {
    return `
        <div class="header">
            <div class="header-content">
                <div>
                    <div class="header-title-section">
                        <div class="header-flag">🇮🇳</div>
                        <div>
                            <h1 class="header-title">India HMS Enhancement</h1>
                            <p class="header-subtitle">आयुष्मान भारत डिजिटल मिशन</p>
                        </div>
                    </div>
                    <p class="header-description">Ayushman Bharat Digital Mission - ABDM Integration</p>
                </div>
                <div class="header-stats">
                    <div class="stat-number text-orange-600">8</div>
                    <div class="stat-label">Core Modules</div>
                    <div class="stat-number text-green-600 mt-3">1.4B</div>
                    <div class="stat-label text-xs">Population Scale</div>
                </div>
            </div>
        </div>
    `;
}

function renderNavigation() {
    const tabs = [
        { id: 'overview', label: 'Overview', icon: '🌐', hindi: 'अवलोकन' },
        { id: 'modules', label: 'Modules', icon: '💾', hindi: 'मॉड्यूल' },
        { id: 'challenges', label: 'Challenges', icon: '⚠️', hindi: 'चुनौतियां' },
        { id: 'roadmap', label: 'Roadmap', icon: '📅', hindi: 'योजना' },
        { id: 'technical', label: 'Technical', icon: '💻', hindi: 'तकनीकी' },
        { id: 'quickstart', label: 'Quick Start', icon: '⚡', hindi: 'शुरुआत' }
    ];

    return `
        <div class="nav-container">
            ${tabs.map(tab => `
                <button 
                    class="nav-button ${state.activeView === tab.id ? 'active' : ''}"
                    onclick="setActiveView('${tab.id}')"
                >
                    <div class="nav-button-content">
                        <span>${tab.icon}</span>
                        <span class="nav-button-label">${tab.label}</span>
                    </div>
                    <div class="nav-button-hindi">${tab.hindi}</div>
                </button>
            `).join('')}
        </div>
    `;
}

function renderOverview() {
    return `
        <div class="space-y-8">
            <div class="grid grid-cols-3">
                <div class="card border-t-4 border-orange-600">
                    <div class="text-5xl mb-4">🔐</div>
                    <h3 class="text-xl font-bold mb-2 text-gray-800">ABHA Integration</h3>
                    <p class="text-gray-600 text-sm mb-3">
                        14-digit unique health ID for every Indian citizen under Ayushman Bharat Digital Mission
                    </p>
                    <div class="bg-orange-50 rounded-lg p-3">
                        <div class="text-2xl font-bold text-orange-600">500M+</div>
                        <div class="text-xs text-gray-600">Target ABHA IDs by 2025</div>
                    </div>
                </div>

                <div class="card border-t-4 border-green-600">
                    <div class="text-5xl mb-4">🛡️</div>
                    <h3 class="text-xl font-bold mb-2 text-gray-800">PM-JAY Coverage</h3>
                    <p class="text-gray-600 text-sm mb-3">
                        World's largest health insurance scheme - Pradhan Mantri Jan Arogya Yojana
                    </p>
                    <div class="bg-green-50 rounded-lg p-3">
                        <div class="text-2xl font-bold text-green-600">₹5 Lakh</div>
                        <div class="text-xs text-gray-600">Per Family Per Year</div>
                    </div>
                </div>

                <div class="card border-t-4 border-blue-600">
                    <div class="text-5xl mb-4">🌿</div>
                    <h3 class="text-xl font-bold mb-2 text-gray-800">AYUSH System</h3>
                    <p class="text-gray-600 text-sm mb-3">
                        Integration of Ayurveda, Yoga, Unani, Siddha, Homeopathy with modern medicine
                    </p>
                    <div class="bg-amber-50 rounded-lg p-3">
                        <div class="text-2xl font-bold text-orange-600">750K+</div>
                        <div class="text-xs text-gray-600">Registered AYUSH Practitioners</div>
                    </div>
                </div>
            </div>

            <div class="bg-gray-800 rounded-2xl shadow-xl p-8" style="color: white;">
                <h3 class="text-3xl font-light mb-6 text-center">Why India-Specific HMS?</h3>
                <div class="grid grid-cols-2">
                    <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);" class="rounded-xl p-6">
                        <h4 class="text-xl font-semibold mb-3" style="color: #fed7aa;">Government Initiatives</h4>
                        <ul class="space-y-2 text-sm" style="color: #d1d5db;">
                            <li class="flex items-start gap-2">
                                <span style="color: #4ade80;">✓</span>
                                <span>Ayushman Bharat Digital Mission (ABDM) - National health stack</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span style="color: #4ade80;">✓</span>
                                <span>PM-JAY covering 500M+ beneficiaries (world's largest)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span style="color: #4ade80;">✓</span>
                                <span>eSanjeevani - 100M+ teleconsultations delivered</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span style="color: #4ade80;">✓</span>
                                <span>State-specific health schemes (28 states + 8 UTs)</span>
                            </li>
                        </ul>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);" class="rounded-xl p-6">
                        <h4 class="text-xl font-semibold mb-3" style="color: #bfdbfe;">Unique Requirements</h4>
                        <ul class="space-y-2 text-sm" style="color: #d1d5db;">
                            <li class="flex items-start gap-2">
                                <span style="color: #4ade80;">✓</span>
                                <span>Multi-language support (22 official languages)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span style="color: #4ade80;">✓</span>
                                <span>Traditional medicine integration (AYUSH systems)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span style="color: #4ade80;">✓</span>
                                <span>Rural connectivity & offline-first design</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span style="color: #4ade80;">✓</span>
                                <span>Aadhaar-based authentication & eKYC</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="card">
                <h4 class="text-2xl font-bold text-gray-800 mb-6 text-center">ABDM Architecture Overview</h4>
                <div class="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                    <div class="grid grid-cols-4 text-center">
                        <div class="bg-white rounded-lg p-4 shadow">
                            <div class="text-5xl mb-2">🔐</div>
                            <div class="font-semibold text-gray-800">ABHA</div>
                            <div class="text-xs text-gray-600">Health ID</div>
                        </div>
                        <div class="bg-white rounded-lg p-4 shadow">
                            <div class="text-5xl mb-2">💾</div>
                            <div class="font-semibold text-gray-800">PHR</div>
                            <div class="text-xs text-gray-600">Health Records</div>
                        </div>
                        <div class="bg-white rounded-lg p-4 shadow">
                            <div class="text-5xl mb-2">📊</div>
                            <div class="font-semibold text-gray-800">HFR</div>
                            <div class="text-xs text-gray-600">Facility Registry</div>
                        </div>
                        <div class="bg-white rounded-lg p-4 shadow">
                            <div class="text-5xl mb-2">👥</div>
                            <div class="font-semibold text-gray-800">HPR</div>
                            <div class="text-xs text-gray-600">Health Professional</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-4">
                ${[
                    { number: '500M+', label: 'PM-JAY Beneficiaries', color: 'green' },
                    { number: '₹64K Cr', label: 'PM-JAY Budget (Annual)', color: 'blue' },
                    { number: '27,000+', label: 'Empaneled Hospitals', color: 'purple' },
                    { number: '9,000+', label: 'Jan Aushadhi Kendras', color: 'teal' }
                ].map(stat => `
                    <div class="bg-${stat.color}-50 rounded-xl p-6 text-center border-2">
                        <div class="text-3xl font-bold text-${stat.color}-600 mb-2">${stat.number}</div>
                        <div class="text-sm text-gray-700">${stat.label}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderModules() {
    return `
        <div class="space-y-6">
            <div class="card mb-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">8 Core Modules for India</h3>
                <p class="text-gray-600">Click each module for detailed features, entities, and integration details</p>
            </div>

            <div class="grid grid-cols-2">
                ${coreModules.map(module => {
                    const isSelected = state.selectedModule === module.id;
                    return `
                        <div 
                            class="module-card ${module.color} ${isSelected ? 'selected' : ''}"
                            onclick="toggleModule('${module.id}')"
                        >
                            <div class="module-header">
                                <div class="module-icon">
                                    <span style="font-size: 2rem;">${module.icon}</span>
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <h3 class="module-title">${module.title}</h3>
                                        ${module.priority === 'CRITICAL' ? '<span class="priority-badge priority-critical">CRITICAL</span>' : ''}
                                        ${module.priority === 'HIGH' ? '<span class="priority-badge priority-high">HIGH</span>' : ''}
                                    </div>
                                    <p class="module-subtitle">${module.subtitle}</p>
                                    <div class="module-meta">
                                        <span class="meta-badge">${module.timeWeeks} weeks</span>
                                        <span class="meta-badge">${module.complexity}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <p class="module-description">${module.description}</p>
                            
                            <div class="module-impact">
                                <div class="impact-label">Impact</div>
                                <div class="impact-value">${module.impact}</div>
                            </div>
                            
                            ${isSelected ? `
                                <div class="module-details">
                                    <div class="detail-section">
                                        <div class="detail-title">✨ Key Features:</div>
                                        <ul class="feature-list space-y-1">
                                            ${module.features.map(feature => `
                                                <li class="feature-item">
                                                    <span>▸</span>
                                                    <span>${feature}</span>
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                    
                                    <div class="detail-section">
                                        <div class="detail-title">🗄️ Entities:</div>
                                        <div class="entity-tags">
                                            ${module.entities.map(entity => `
                                                <span class="entity-tag">${entity}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                    
                                    <div class="detail-section">
                                        <div class="detail-title">🔌 APIs:</div>
                                        <ul class="api-list">
                                            ${module.apis.map(api => `
                                                <li class="api-item">${api}</li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderChallenges() {
    return `
        <div class="space-y-6">
            <div class="card mb-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">India-Specific Challenges & Solutions</h3>
                <p class="text-gray-600">Unique healthcare challenges in Indian context and architectural solutions</p>
            </div>

            <div class="grid grid-cols-2">
                ${indiaSpecificChallenges.map(item => `
                    <div class="card">
                        <div class="flex items-start gap-4 mb-4">
                            <div class="text-5xl">${item.icon}</div>
                            <div class="flex-1">
                                <h4 class="text-xl font-bold text-gray-800 mb-2">${item.challenge}</h4>
                                <p class="text-gray-600 text-sm mb-3">${item.description}</p>
                                <div class="bg-green-50 border-l-4 border-green-600 p-3 rounded">
                                    <div class="text-xs font-semibold text-green-900 mb-1">Solution</div>
                                    <div class="text-sm" style="color: #166534;">${item.solution}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="gradient-orange rounded-xl shadow-xl p-8" style="color: white;">
                <h4 class="text-2xl font-bold mb-6">State-Specific Health Schemes Integration</h4>
                <p class="mb-6" style="color: #fed7aa;">
                    Apart from PM-JAY, many states run their own health insurance schemes. Your HMS must integrate with these:
                </p>
                <div class="overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>State</th>
                                <th>Scheme Name</th>
                                <th>Coverage</th>
                                <th>Beneficiaries</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${stateSpecific.map(item => `
                                <tr>
                                    <td class="font-semibold">${item.state}</td>
                                    <td>${item.scheme}</td>
                                    <td>${item.coverage}</td>
                                    <td>${item.beneficiaries}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <h4 class="text-xl font-bold text-gray-800 mb-6">Compliance Requirements</h4>
                <div class="grid grid-cols-2">
                    <div>
                        <h5 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <span>🔒</span>
                            Data Protection & Privacy
                        </h5>
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li class="flex items-start gap-2">
                                <span class="text-green-600">✓</span>
                                <span>Digital Personal Data Protection Act 2023 (DPDPA)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-green-600">✓</span>
                                <span>Aadhaar Act compliance (secure vault storage)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-green-600">✓</span>
                                <span>ABDM data security guidelines</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-green-600">✓</span>
                                <span>Consent management framework</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <span>🛡️</span>
                            Healthcare Regulations
                        </h5>
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li class="flex items-start gap-2">
                                <span class="text-green-600">✓</span>
                                <span>Clinical Establishments Act</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-green-600">✓</span>
                                <span>Drugs and Cosmetics Act (e-pharmacy)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-green-600">✓</span>
                                <span>Telemedicine Practice Guidelines 2020</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-green-600">✓</span>
                                <span>Pre-Conception & Pre-Natal Diagnostic Techniques Act</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderRoadmap() {
    const currentPhase = implementationPhases.find(p => p.phase === state.activePhase);
    
    return `
        <div class="space-y-6">
            <div class="card mb-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">24-Week Implementation Roadmap</h3>
                <p class="text-gray-600">Phased deployment from ABDM foundation to multi-state production</p>
            </div>

            <div class="phase-nav">
                ${implementationPhases.map(phase => `
                    <button 
                        class="phase-button ${state.activePhase === phase.phase ? 'active' : ''}"
                        onclick="setActivePhase(${phase.phase})"
                    >
                        Phase ${phase.phase}: ${phase.title}
                        <div class="phase-week">Weeks ${phase.weeks}</div>
                    </button>
                `).join('')}
            </div>

            ${currentPhase ? `
                <div class="card">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800">
                                Phase ${currentPhase.phase}: ${currentPhase.title}
                            </h3>
                            <p class="text-gray-600">Weeks ${currentPhase.weeks}</p>
                        </div>
                        <div class="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg font-semibold">
                            ${currentPhase.modules.length > 0 ? `${currentPhase.modules.length} Modules` : 'Final Phase'}
                        </div>
                    </div>

                    ${currentPhase.modules.length > 0 ? `
                        <div class="mb-6">
                            <h4 class="font-semibold text-gray-800 mb-3">📦 Modules in This Phase:</h4>
                            <div class="flex flex-wrap gap-2">
                                ${currentPhase.modules.map(moduleId => {
                                    const module = coreModules.find(m => m.id === moduleId);
                                    if (!module) return '';
                                    return `
                                        <div class="${module.color} text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                            <span>${module.icon}</span>
                                            <span class="text-sm font-semibold">${module.title}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="grid grid-cols-2">
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-3">✅ Tasks:</h4>
                            <ul class="space-y-2">
                                ${currentPhase.tasks.map(task => `
                                    <li class="flex items-start gap-2 text-gray-700">
                                        <span class="text-green-600">✓</span>
                                        <span class="text-sm">${task}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <div>
                            <h4 class="font-semibold text-gray-800 mb-3">🎯 Deliverables:</h4>
                            <ul class="space-y-2">
                                ${currentPhase.deliverables.map(deliverable => `
                                    <li class="flex items-start gap-2 text-gray-700">
                                        <span class="text-orange-600">⭐</span>
                                        <span class="text-sm">${deliverable}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function renderTechnical() {
    return `
        <div class="space-y-6">
            <div class="card mb-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Technical Stack for India</h3>
                <p class="text-gray-600">Government APIs, authentication systems, and compliance requirements</p>
            </div>

            ${technicalStack.map((category, idx) => `
                <div class="card">
                    <div 
                        class="expandable-header"
                        onclick="toggleSection(${idx})"
                    >
                        <h4 class="text-xl font-bold text-gray-800">${category.category}</h4>
                        <span>${state.expandedSection === idx ? '▼' : '▶'}</span>
                    </div>

                    ${state.expandedSection === idx ? `
                        <div class="expandable-content space-y-3">
                            ${category.items.map(item => `
                                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg transition-all">
                                    <div class="flex-shrink-0">
                                        <div class="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                            NEW
                                        </div>
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
            `).join('')}

            <div class="gradient-indigo rounded-xl shadow-xl p-8" style="color: white;">
                <h4 class="text-2xl font-bold mb-6">🔌 ABDM Sandbox & Production URLs</h4>
                <div class="grid grid-cols-2">
                    <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);" class="rounded-xl p-4">
                        <h5 class="font-semibold mb-3" style="color: #ddd6fe;">Sandbox Environment</h5>
                        <div class="space-y-2 text-sm" style="font-family: monospace;">
                            <div>ABHA: https://abhasbx.abdm.gov.in</div>
                            <div>Gateway: https://dev.abdm.gov.in</div>
                            <div>PHR: https://phrsbx.abdm.gov.in</div>
                        </div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);" class="rounded-xl p-4">
                        <h5 class="font-semibold mb-3" style="color: #bfdbfe;">Production Environment</h5>
                        <div class="space-y-2 text-sm" style="font-family: monospace;">
                            <div>ABHA: https://abha.abdm.gov.in</div>
                            <div>Gateway: https://abdm.gov.in</div>
                            <div>PHR: https://phr.abdm.gov.in</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderQuickStart() {
    const tasks = [
        'Register hospital on ABDM sandbox portal',
        'Add ABHA number field to Patient entity',
        'Add Aadhaar number field (encrypted storage)',
        'Implement Indian phone number validation',
        'Set up multi-language support (Hindi + English)',
        'Update patient registration form UI',
        'Test ABHA API connectivity',
        'Review DPDPA 2023 compliance requirements',
        'Set up UPI payment gateway (Razorpay/Paytm)',
        'Configure Indian address format'
    ];

    return `
        <div class="space-y-6">
            <div class="card mb-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">⚡ Quick Start Guide</h3>
                <p class="text-gray-600">Implement these foundational changes first - hours, not weeks!</p>
            </div>

            <div class="grid grid-cols-2">
                ${quickWins.map(win => `
                    <div class="quick-win-card">
                        <div class="quick-win-header">
                            <div>
                                <h4 class="quick-win-title">${win.title}</h4>
                                <div class="quick-win-meta">
                                    <span>🕐</span>
                                    <span class="text-sm text-gray-600">${win.time}</span>
                                    <span class="text-gray-400">•</span>
                                    <span class="text-sm font-semibold ${win.difficulty === 'Easy' ? 'text-green-600' : 'text-yellow-600'}">
                                        ${win.difficulty}
                                    </span>
                                    <span class="text-gray-400">•</span>
                                    <span class="text-sm font-semibold ${
                                        win.impact === 'Critical' ? 'text-red-600' :
                                        win.impact === 'High' ? 'text-orange-600' : 'text-gray-600'
                                    }">
                                        ${win.impact}
                                    </span>
                                </div>
                            </div>
                            <span style="font-size: 2rem;">⚡</span>
                        </div>

                        <p class="text-gray-600 mb-4 text-sm">${win.description}</p>

                        <div class="code-block">
                            <pre><code>${escapeHtml(win.code)}</code></pre>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="gradient-orange rounded-xl shadow-xl p-8" style="color: white;">
                <h4 class="text-2xl font-bold mb-6">🚀 Getting Started with ABDM</h4>
                <div class="grid grid-cols-3">
                    <div style="background: rgba(255, 255, 255, 0.9); color: #1f2937;" class="rounded-lg p-4">
                        <div class="text-3xl mb-2">1️⃣</div>
                        <h5 class="font-semibold mb-2">Register on ABDM Sandbox</h5>
                        <p class="text-sm">Visit https://sandbox.abdm.gov.in and register as HIP/HIU</p>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.9); color: #1f2937;" class="rounded-lg p-4">
                        <div class="text-3xl mb-2">2️⃣</div>
                        <h5 class="font-semibold mb-2">Get API Credentials</h5>
                        <p class="text-sm">Obtain Client ID and Secret for authentication</p>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.9); color: #1f2937;" class="rounded-lg p-4">
                        <div class="text-3xl mb-2">3️⃣</div>
                        <h5 class="font-semibold mb-2">Test ABHA Creation</h5>
                        <p class="text-sm">Start with ABHA number generation API calls</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <h4 class="text-xl font-bold text-gray-800 mb-6">📋 Week 1 Implementation Checklist</h4>
                <div class="space-y-3">
                    ${tasks.map(task => `
                        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all">
                            <input type="checkbox" />
                            <span class="text-gray-700">${task}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderFooter() {
    return `
        <div class="footer">
            <div class="footer-header">
                <div class="text-6xl">🇮🇳</div>
                <div>
                    <h4 class="footer-title">Ayushman Bharat Digital Mission</h4>
                    <p class="footer-subtitle">आयुष्मान भारत डिजिटल मिशन</p>
                </div>
            </div>
            <p class="footer-description">
                Transform your HMS for India's 1.4 billion population with ABDM, PM-JAY, and AYUSH integration
            </p>
            <div class="footer-stats">
                <div class="footer-stat">
                    <div class="text-3xl font-bold text-orange-600">8</div>
                    <div class="text-gray-700">Core Modules</div>
                </div>
                <div class="footer-stat">
                    <div class="text-3xl font-bold text-green-600">500M+</div>
                    <div class="text-gray-700">PM-JAY Coverage</div>
                </div>
                <div class="footer-stat">
                    <div class="text-3xl font-bold text-blue-600">24</div>
                    <div class="text-gray-700">Week Roadmap</div>
                </div>
                <div class="footer-stat">
                    <div class="text-3xl font-bold text-purple-600">6</div>
                    <div class="text-gray-700">Gov't APIs</div>
                </div>
            </div>
        </div>
    `;
}

function renderApp() {
    let content = '';
    
    switch(state.activeView) {
        case 'overview':
            content = renderOverview();
            break;
        case 'modules':
            content = renderModules();
            break;
        case 'challenges':
            content = renderChallenges();
            break;
        case 'roadmap':
            content = renderRoadmap();
            break;
        case 'technical':
            content = renderTechnical();
            break;
        case 'quickstart':
            content = renderQuickStart();
            break;
        default:
            content = renderOverview();
    }

    document.getElementById('app').innerHTML = `
        <div class="min-h-screen bg-gradient-to-br p-6">
            <div class="max-w-7xl mx-auto">
                ${renderHeader()}
                ${renderNavigation()}
                ${content}
                ${renderFooter()}
            </div>
        </div>
    `;
}

// Event Handlers
function setActiveView(view) {
    state.activeView = view;
    renderApp();
}

function toggleModule(moduleId) {
    state.selectedModule = state.selectedModule === moduleId ? null : moduleId;
    renderApp();
}

function setActivePhase(phase) {
    state.activePhase = phase;
    renderApp();
}

function toggleSection(idx) {
    state.expandedSection = state.expandedSection === idx ? null : idx;
    renderApp();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});
