
// Use IIFE to avoid polluting global namespace
(function() {
    // State
    let activeView = 'overview';
    let selectedModule = null;
    let selectedFeature = null;

    // Data (copied from React component)
    const coreModules = [
        {
            id: 'nhi-integration',
            icon: 'shield',
            title: 'NHI Smart Card System',
            subtitle: '健保IC卡整合',
            description: 'Seamless integration with Taiwan\'s world-renowned National Health Insurance IC card system. Real-time eligibility verification, comprehensive medical history access, and instant claims processing—all from a single card swipe.',
            features: [
                'IC card reader compatibility (desktop & mobile)',
                'Real-time NHI eligibility & coverage check',
                '6-visit history instant access',
                'Automatic copayment calculation',
                'Drug allergy alerts from card data',
                'Cross-hospital medical records'
            ],
            color: 'from-blue-600 to-cyan-500',
            stats: { label: '23M+', desc: 'Active NHI cardholders' }
        },
        {
            id: 'pharmacy-network',
            icon: 'pill',
            title: 'Unified Pharmacy Network',
            subtitle: '全國藥局網絡',
            description: 'Connected to Taiwan\'s extensive pharmacy network. Pick up prescriptions at any participating pharmacy island-wide, track medication adherence, and get instant drug interaction warnings combining Western medicine and TCM.',
            features: [
                '6,000+ connected pharmacies',
                'Prescription transfer across locations',
                'TCM-Western medicine interaction checker',
                'Medication reminder & tracking',
                'Chronic disease refill automation',
                'Generic drug cost comparison'
            ],
            color: 'from-green-600 to-emerald-500',
            stats: { label: '99.9%', desc: 'Population coverage' }
        },
        {
            id: 'tcm-integration',
            icon: 'droplet',
            title: 'TCM-Western Dual Track',
            subtitle: '中西醫雙軌系統',
            description: 'Taiwan uniquely covers both Traditional Chinese Medicine and Western medicine under NHI. The platform seamlessly integrates both approaches, tracking acupuncture, herbal prescriptions, and conventional treatments in one unified record.',
            features: [
                'TCM practitioner directory & booking',
                'Herbal prescription database',
                'Acupuncture session tracking',
                'Constitution type assessment (體質分析)',
                'Integrated treatment timelines',
                'Insurance coverage for both modalities'
            ],
            color: 'from-amber-600 to-orange-500',
            stats: { label: '50%', desc: 'Use both TCM & Western medicine' }
        },
        {
            id: 'telehealth',
            icon: 'smartphone',
            title: 'Video Consultation Platform',
            subtitle: '遠距醫療平台',
            description: 'High-quality video consultations with robust support for rural and offshore island populations. Integrated with NHI for reimbursement, prescription e-transmission, and follow-up care coordination.',
            features: [
                'HD video with medical-grade security',
                'NHI reimbursement for telehealth',
                'E-prescription direct to pharmacy',
                'Multi-language support (Mandarin, Taiwanese, Hakka)',
                'Rural & island priority access',
                'Family member proxy consultations'
            ],
            color: 'from-purple-600 to-pink-500',
            stats: { label: '24/7', desc: 'Access to care' }
        },
        {
            id: 'health-data',
            icon: 'activity',
            title: 'Personal Health Bank',
            subtitle: '個人健康資料庫',
            description: 'Taiwan\'s "My Health Bank" integration—a government-backed personal health data repository. Citizens control their own data and can share it selectively with providers, researchers, or family members.',
            features: [
                'Lifetime medical record access',
                'Lab results & imaging reports',
                'Vaccination certificates',
                'Granular sharing permissions',
                'Health data analytics & insights',
                'Export for international travel'
            ],
            color: 'from-indigo-600 to-blue-500',
            stats: { label: '10M+', desc: 'Active users' }
        },
        {
            id: 'preventive-care',
            icon: 'heart',
            title: 'Community Health Screening',
            subtitle: '社區健康篩檢',
            description: 'Manages free adult health screenings, cancer screenings, and preventive care services provided by NHI. Automated eligibility checking, appointment scheduling, and results tracking with family notifications.',
            features: [
                'Age-based screening recommendations',
                'Mobile health screening units',
                'Cancer screening programs (4 major types)',
                'Chronic disease management plans',
                'Health education resources',
                'Community health station locator'
            ],
            color: 'from-rose-600 to-red-500',
            stats: { label: 'Free', desc: 'Preventive screenings' }
        }
    ];

    const taiwanAdvantages = [
        {
            title: 'World-Class NHI System',
            description: 'Ranked #1 globally for healthcare access and quality. 99.9% population coverage with minimal wait times and comprehensive benefits including TCM.',
            icon: '🏆',
            stat: '#1 Global Ranking'
        },
        {
            title: 'Tech-Savvy Population',
            description: 'Highest density of convenience stores globally, smartphone penetration >90%, and digital payment adoption. Citizens expect seamless digital health services.',
            icon: '📱',
            stat: '92% Smartphone Users'
        },
        {
            title: 'East-West Medicine Harmony',
            description: 'Unique integration of TCM and Western medicine under single-payer system. 50% of population uses both modalities regularly.',
            icon: '☯️',
            stat: '9,000+ TCM Clinics'
        },
        {
            title: 'Pharmacy Accessibility',
            description: 'Pharmacy-to-population ratio higher than most countries. Community pharmacists play crucial role in medication counseling and chronic disease management.',
            icon: '💊',
            stat: '1 Pharmacy/2,000 People'
        },
        {
            title: 'Island Healthcare Equity',
            description: 'Special programs ensure rural areas, offshore islands, and indigenous communities receive equal access through telehealth and mobile clinics.',
            icon: '🏝️',
            stat: '100% Coverage'
        },
        {
            title: 'Aging Society Preparedness',
            description: 'Advanced long-term care 2.0 program, community care stations, and family caregiver support integrated into health system.',
            icon: '👴',
            stat: '16% Over 65'
        }
    ];

    const platformFeatures = {
        patient: [
            'NHI IC card mobile reader support',
            'Real-time clinic wait times & queue numbers',
            'Prescription history & refill management',
            'Multi-hospital appointment consolidation',
            'Health screening eligibility checker',
            'Bilingual interface (繁體中文/English)',
            'Family member account linking',
            'COVID-19 vaccination certificate',
            'Medical expense tracking & tax deduction'
        ],
        provider: [
            'NHI claims submission & tracking',
            'IC card verification & reading',
            'E-prescription transmission',
            'Cross-institutional record access',
            'Chronic disease registry integration',
            'Clinical decision support (Taiwan guidelines)',
            'Telehealth consultation tools',
            'Referral management system',
            'Quality metrics dashboard'
        ],
        pharmacy: [
            'Prescription receiving from hospitals',
            'NHI drug price lookup',
            'Medication therapy management',
            'Drug interaction checking (Western + TCM)',
            'Inventory management',
            'Patient medication history access',
            'Chronic disease medication tracking',
            'Generic substitution recommendations',
            'Pharmacy-physician communication portal'
        ]
    };

    const techEcosystem = [
        {
            category: 'Government Infrastructure',
            items: [
                'National Health Insurance Administration (NHIA) database',
                'Ministry of Health and Welfare integration',
                'Taiwan CDC data feeds',
                'My Health Bank (個人健康存摺) API',
                'Digital COVID certificate system',
                'E-hospital platform connectivity'
            ]
        },
        {
            category: 'Local Tech Integration',
            items: [
                'LINE official account for notifications',
                'Taiwan Mobile payment (台灣Pay)',
                'FamilyMart/7-Eleven kiosk integration',
                'YouBike health point rewards',
                'Gogoro battery swap station health tips',
                'Local cloud providers (Chunghwa Telecom)'
            ]
        },
        {
            category: 'Medical Devices',
            items: [
                'Local IC card readers (all brands)',
                'Taiwan-made blood pressure monitors',
                'Glucose meters with NHI integration',
                'Smart pill boxes with reminders',
                'Wearables from local manufacturers',
                'Telehealth kits for remote areas'
            ]
        }
    ];

    const uniqueFeatures = [
        {
            title: 'Convenience Store Health Stations',
            description: 'Partner with 7-Eleven and FamilyMart for basic health checks, prescription pickup points, and telehealth kiosks in 10,000+ locations.',
            icon: '🏪'
        },
        {
            title: 'MRT Health Points Program',
            description: 'Earn health points for taking public transportation, attending screenings, and healthy behaviors—redeemable for copay discounts.',
            icon: '🚇'
        },
        {
            title: 'Night Market Nutrition Scanner',
            description: 'Photo-based calorie and nutrition estimation for street food—Taiwan\'s #1 dining option gets health-conscious.',
            icon: '🍜'
        },
        {
            title: 'Temple Prayer Health Check',
            description: 'Partner temples offer free blood pressure and glucose checks during worship visits—merging tradition with prevention.',
            icon: '🏮'
        },
        {
            title: 'Typhoon Medical Preparedness',
            description: 'Automated prescription refill reminders before typhoon season, stockpile suggestions, and emergency clinic locator.',
            icon: '🌀'
        },
        {
            title: 'Betel Nut Cessation Program',
            description: 'AI-powered support for quitting betel nut chewing (major oral cancer risk) with NHI-covered counseling.',
            icon: '🌰'
        }
    ];

    // Initialization
    function init() {
        renderNavigation();
        renderOverviewStaticContent();
        renderModules();
        renderUsers();
        renderAdvantages();
        renderInnovation();
        lucide.createIcons();
    }

    // Render Navigation
    function renderNavigation() {
        const tabs = [
            { id: 'overview', label: '概覽', en: 'Overview' },
            { id: 'modules', label: '核心模組', en: 'Core Modules' },
            { id: 'users', label: '用戶介面', en: 'User Interfaces' },
            { id: 'advantages', label: '台灣優勢', en: 'Taiwan Advantages' },
            { id: 'innovation', label: '創新功能', en: 'Innovations' }
        ];

        const navContainer = document.getElementById('navigation');
        navContainer.innerHTML = tabs.map(tab => `
            <button
                onclick="window.switchView('${tab.id}')"
                class="flex-1 min-w-[120px] px-4 py-3 rounded-lg transition-all ${
                    activeView === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }"
            >
                <div class="font-semibold text-sm">${tab.label}</div>
                <div class="text-xs opacity-75">${tab.en}</div>
            </button>
        `).join('');
    }

    // Global function to switch view
    window.switchView = function(viewId) {
        activeView = viewId;
        
        // Update tabs styling
        renderNavigation();

        // Update view visibility
        document.querySelectorAll('[data-view]').forEach(view => {
            if (view.dataset.view === viewId) {
                view.classList.add('active');
                // Re-render modules if switching to modules to ensure icons are created
                if(viewId === 'modules') renderModules(); 
                // Re-create icons for the new view
                setTimeout(() => lucide.createIcons(), 0);
            } else {
                view.classList.remove('active');
            }
        });
    };

    // Render Overview Static Content (Lists & Stats)
    function renderOverviewStaticContent() {
        // Efficiency List
        const efficiencyList = [
            'No pre-authorization delays—see any doctor anytime',
            'Transparent pricing—all costs published online',
            'Minimal paperwork—IC card does everything',
            'Administrative overhead <2% vs 8-12% globally'
        ];
        document.getElementById('efficiency-list').innerHTML = efficiencyList.map(item => `
            <li class="flex items-start gap-2">
                <span class="text-green-400">✓</span>
                <span>${item}</span>
            </li>
        `).join('');

        // Tech List
        const techList = [
            'IC card system since 2003—20+ years of data',
            'Real-time claims processing and verification',
            'Comprehensive drug interaction database',
            'Population health analytics for policy-making'
        ];
        document.getElementById('tech-list').innerHTML = techList.map(item => `
            <li class="flex items-start gap-2">
                <span class="text-green-400">✓</span>
                <span>${item}</span>
            </li>
        `).join('');

        // Stats
        const stats = [
            { number: '23M+', label: 'NHI Cardholders', color: 'blue' },
            { number: '6,000+', label: 'Pharmacies', color: 'green' },
            { number: '<$100', label: 'Avg Copay (USD)', color: 'purple' },
            { number: '10M+', label: 'My Health Bank Users', color: 'red' }
        ];
        document.getElementById('overview-stats').innerHTML = stats.map(stat => `
            <div class="bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-50 rounded-xl p-6 text-center border-2 border-${stat.color}-200">
                <div class="text-3xl font-bold text-${stat.color}-700 mb-2">${stat.number}</div>
                <div class="text-sm text-gray-700">${stat.label}</div>
            </div>
        `).join('');
    }

    // Render Modules
    function renderModules() {
        const container = document.getElementById('modules-container');
        container.innerHTML = coreModules.map(module => {
            const isSelected = selectedModule === module.id;
            // Note: Lucide icons are injected via data-lucide attribute
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
                            <h3 class="text-2xl font-bold mb-1">${module.title}</h3>
                            <p class="text-sm text-white/80 mb-3">${module.subtitle}</p>
                            <div class="inline-block bg-white/20 px-3 py-1 rounded-full text-xs backdrop-blur">
                                ${module.stats.label} ${module.stats.desc}
                            </div>
                        </div>
                    </div>
                    
                    <p class="text-white/95 leading-relaxed mb-4">
                        ${module.description}
                    </p>
                    
                    ${isSelected ? `
                        <div class="border-t border-white/30 pt-4 mt-4 fade-in">
                            <p class="text-sm font-semibold mb-3 text-white/90">核心功能 (Core Features):</p>
                            <div class="grid grid-cols-1 gap-2">
                                ${module.features.map(feature => `
                                    <div class="bg-white/10 backdrop-blur rounded-lg p-2 text-sm flex items-start gap-2">
                                        <span class="text-white/60 mt-0.5">•</span>
                                        <span>${feature}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
        lucide.createIcons();
    }

    // Module Toggle Logic
    window.toggleModule = function(moduleId) {
        selectedModule = selectedModule === moduleId ? null : moduleId;
        renderModules();
    };

    // Render Users View
    function renderUsers() {
        // Portals
        const portalConfig = [
            { key: 'patient', title: 'Patient Portal', sub: '民眾端', icon: 'users', color: 'blue' },
            { key: 'provider', title: 'Provider Portal', sub: '醫療端', icon: 'stethoscope', color: 'green' },
            { key: 'pharmacy', title: 'Pharmacy Portal', sub: '藥局端', icon: 'pill', color: 'purple' }
        ];

        document.getElementById('users-portals').innerHTML = portalConfig.map(portal => `
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center gap-3 mb-4">
                    <i data-lucide="${portal.icon}" class="w-8 h-8 text-${portal.color}-600"></i>
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">${portal.title}</h3>
                        <p class="text-sm text-gray-500">${portal.sub}</p>
                    </div>
                </div>
                <ul class="space-y-2">
                    ${platformFeatures[portal.key].map(feature => `
                        <li class="flex items-start gap-2 text-sm text-gray-700">
                            <div class="w-1.5 h-1.5 bg-${portal.color}-600 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>${feature}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        // Tech Ecosystem
        document.getElementById('tech-ecosystem').innerHTML = techEcosystem.map(category => `
            <div class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h4 class="text-lg font-bold text-gray-800 mb-4">${category.category}</h4>
                <ul class="space-y-2">
                    ${category.items.map(item => `
                        <li class="flex items-start gap-2 text-sm text-gray-700">
                            <span class="text-blue-600">▸</span>
                            <span>${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
    }

    // Render Advantages View
    function renderAdvantages() {
        // Main Advantages Cards
        document.getElementById('advantages-container').innerHTML = taiwanAdvantages.map(advantage => `
             <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all">
                <div class="flex items-start gap-4">
                    <div class="text-5xl">${advantage.icon}</div>
                    <div class="flex-1">
                        <h4 class="text-xl font-bold text-gray-800 mb-2">${advantage.title}</h4>
                        <p class="text-gray-600 mb-3 leading-relaxed">${advantage.description}</p>
                        <div class="inline-block bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                            ${advantage.stat}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Unique System Grid
        const uniqueSystem = [
            { title: 'Freedom of Choice', desc: 'Patients can visit any clinic or hospital without referrals. Want a second opinion? See another doctor the same day. Doctor shopping is expected and accommodated.' },
            { title: 'Affordability', desc: 'Average copay under $100 USD. Premium chronic disease medications often $3-5 USD monthly. No medical bankruptcy—healthcare is a right, not a luxury.' },
            { title: 'Convenience', desc: 'Clinics open until 9-10 PM, weekends included. Pharmacies everywhere. Pick up meds at 7-Eleven. See a doctor after work without taking time off.' },
            { title: 'Innovation Speed', desc: 'Digital COVID certificates in weeks, not months. Mask rationing system during shortages. Rapid policy implementation thanks to centralized data and decision-making.' }
        ];

        document.getElementById('unique-system-container').innerHTML = uniqueSystem.map(item => `
            <div class="bg-white/10 backdrop-blur rounded-xl p-6">
                <h5 class="text-lg font-semibold mb-3">${item.title}</h5>
                <p class="text-sm text-white/90">${item.desc}</p>
            </div>
        `).join('');
    }

    // Render Innovation View
    function renderInnovation() {
        const container = document.getElementById('features-container');
        container.innerHTML = uniqueFeatures.map((feature, idx) => {
            const isSelected = selectedFeature === idx;
            return `
                <div 
                    class="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer"
                    onclick="window.toggleFeature(${idx})"
                >
                    <div class="flex items-start gap-4">
                        <div class="text-4xl">${feature.icon}</div>
                        <div class="flex-1">
                            <h4 class="text-xl font-bold text-gray-800 mb-2">${feature.title}</h4>
                            <p class="text-gray-600 leading-relaxed transition-all ${isSelected ? 'text-base' : 'text-sm'}">
                                ${feature.description}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Integrations
        const integrations = [
            { icon: '🥤', title: 'Bubble Tea Nutrition', desc: 'Database of 1,000+ drink shops with sugar level tracking and recommendations' },
            { icon: '🛵', title: 'Scooter Safety', desc: 'Air quality alerts for outdoor workers and scooter commuters with mask reminders' },
            { icon: '🏔️', title: 'Hiking Health', desc: 'Mountain trail difficulty ratings with cardiovascular readiness assessments' }
        ];

        document.getElementById('integrations-container').innerHTML = integrations.map(item => `
            <div class="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div class="text-4xl mb-3">${item.icon}</div>
                <h5 class="font-semibold mb-2">${item.title}</h5>
                <p class="text-sm text-white/90">${item.desc}</p>
            </div>
        `).join('');

        // Metrics
        const metrics = [
            { val: '40%', text: 'Reduction in medication errors via IC card drug alerts', color: 'blue' },
            { val: '85%', text: 'Patient satisfaction with healthcare access and quality', color: 'green' },
            { val: '2-3hrs', text: 'Average time from symptom to treatment (vs global 24-48hrs)', color: 'purple' }
        ];

        document.getElementById('metrics-container').innerHTML = metrics.map(stat => `
            <div class="text-center p-6 bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-xl">
                <div class="text-4xl font-bold text-${stat.color}-600 mb-2">${stat.val}</div>
                <p class="text-gray-700">${stat.text}</p>
            </div>
        `).join('');
    }

    window.toggleFeature = function(idx) {
        selectedFeature = selectedFeature === idx ? null : idx;
        renderInnovation();
    };

    // Kickoff
    init();

})();
