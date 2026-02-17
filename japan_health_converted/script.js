
// Use IIFE to avoid polluting global namespace
(function() {
    // State
    let activeView = 'overview';
    let selectedModule = null;
    let hoveredPrinciple = null;

    // Data (converted from React component)
    const coreModules = [
        {
            id: 'mibyou-detection',
            icon: 'waves',
            japanese: '未病',
            romaji: 'Mibyou',
            english: 'Pre-Disease Detection',
            title: 'Mibyou Intelligence System',
            description: 'Japanese concept of "not yet ill"—detecting subtle imbalances before they become disease. Uses AI pattern recognition on daily vitals, sleep, diet logs, and even facial analysis to catch the earliest signs of decline.',
            features: ['Daily micro-assessment questionnaire', 'Facial color/tone analysis via smartphone', 'Seasonal susceptibility predictions', 'Preventive intervention recommendations'],
            color: 'from-blue-100 to-blue-200',
            textColor: 'text-blue-900',
            accentColor: 'bg-blue-600'
        },
        {
            id: 'hoken-integration',
            icon: 'users',
            japanese: '保険証',
            romaji: 'Hoken-sho',
            english: 'Universal Insurance Card',
            title: 'My Number Health Integration',
            description: 'Seamless integration with Japan\'s My Number system and universal health insurance. Instant access to complete medical history, prescriptions, and coverage—no paperwork, just your card and biometric verification.',
            features: ['My Number biometric login', 'Real-time insurance eligibility', 'Nationwide hospital network', 'Prescription history sync'],
            color: 'from-green-100 to-green-200',
            textColor: 'text-green-900',
            accentColor: 'bg-green-600'
        },
        {
            id: 'omotenashi-care',
            icon: 'heart',
            japanese: 'おもてなし',
            romaji: 'Omotenashi',
            english: 'Hospitality Care',
            title: 'Precision Care Concierge',
            description: 'Embodies Japanese omotenashi—anticipating needs before they\'re expressed. Coordinates everything: appointment reminders, transportation, meal prep for dietary restrictions, medication delivery, even weather-appropriate health advice.',
            features: ['Predictive scheduling (avoiding rush hours)', 'Barrier-free route mapping', 'Family notification system', 'Seasonal health tips'],
            color: 'from-pink-100 to-pink-200',
            textColor: 'text-pink-900',
            accentColor: 'bg-pink-600'
        },
        {
            id: 'kenko-shindan',
            icon: 'activity',
            japanese: '健康診断',
            romaji: 'Kenko Shindan',
            english: 'Comprehensive Health Check',
            title: 'Annual Wellness Orchestration',
            description: 'Manages Japan\'s mandatory annual health examinations with military precision. Books appointments, sends prep instructions, tracks results year-over-year, and creates beautiful visual health reports.',
            features: ['Auto-scheduling with employer coordination', 'Pre-exam preparation guides', 'Multi-year trend visualization', 'Abnormality escalation protocols'],
            color: 'from-purple-100 to-purple-200',
            textColor: 'text-purple-900',
            accentColor: 'bg-purple-600'
        },
        {
            id: 'kampo-database',
            icon: 'leaf',
            japanese: '漢方',
            romaji: 'Kampo',
            english: 'Herbal Medicine',
            title: 'Kampo-Western Integration',
            description: 'Bridges traditional Kampo (Japanese herbal medicine) with modern pharmaceuticals. Checks interactions, suggests complementary treatments, and connects patients with certified Kampo practitioners when appropriate.',
            features: ['Kampo-drug interaction checker', 'Constitutional type assessment', 'Certified practitioner directory', 'Insurance coverage for Kampo'],
            color: 'from-emerald-100 to-emerald-200',
            textColor: 'text-emerald-900',
            accentColor: 'bg-emerald-600'
        },
        {
            id: 'genki-tracking',
            icon: 'zap',
            japanese: '元気',
            romaji: 'Genki',
            english: 'Vitality/Energy',
            title: 'Daily Vitality Monitoring',
            description: 'Tracks your "genki" (energy/wellness) through gamified daily check-ins. More nuanced than "sick/healthy"—captures fatigue, motivation, social energy, appetite. Builds a rich longitudinal wellness profile.',
            features: ['Morning/evening genki rating', 'Energy pattern insights', 'Social battery tracking', 'Weather/season correlation'],
            color: 'from-amber-100 to-amber-200',
            textColor: 'text-amber-900',
            accentColor: 'bg-amber-600'
        }
    ];

    const japaneseConventions = [
        {
            id: 'meticulous-records',
            title: '記録文化',
            subtitle: 'Record-Keeping Culture',
            description: 'Exceptionally detailed medical records with visual timelines, handwritten doctor notes digitized, and comprehensive medication histories—nothing is ever lost.',
            icon: '📋'
        },
        {
            id: 'group-harmony',
            title: '和',
            subtitle: 'Wa - Group Harmony',
            description: 'Family involvement is standard. Platform supports family proxy accounts, group notifications, and multi-generational health planning.',
            icon: '👨‍👩‍👧‍👦'
        },
        {
            id: 'seasonal-awareness',
            title: '四季',
            subtitle: 'Seasonal Consciousness',
            description: 'Health guidance adapts to seasons: summer heat illness prevention, winter flu prep, spring allergy management, autumn check-up season.',
            icon: '🍂'
        },
        {
            id: 'punctuality',
            title: '時間厳守',
            subtitle: 'Strict Time Adherence',
            description: 'Appointment times are sacred. 15-minute early reminders, public transit integration, and real-time clinic wait-time displays.',
            icon: '⏰'
        },
        {
            id: 'privacy-respect',
            title: 'プライバシー',
            subtitle: 'Privacy & Discretion',
            description: 'Minimal data sharing by default. Patient controls exactly what each practitioner sees. Anonymous consultation options for sensitive topics.',
            icon: '🔒'
        },
        {
            id: 'aging-society',
            title: '高齢化社会',
            subtitle: 'Super-Aged Society Focus',
            description: 'Designed for elderly users: large fonts, voice navigation, simplified UI, and integration with nursing homes and day services.',
            icon: '👴'
        }
    ];

    const designPrinciples = [
        {
            title: 'Ma (間)',
            subtitle: 'Negative Space',
            description: 'Clean, uncluttered interfaces. White space is intentional. Each element has room to breathe.',
            visual: 'Minimal cards with generous padding'
        },
        {
            title: 'Kanso (簡素)',
            subtitle: 'Simplicity',
            description: 'Eliminate the unnecessary. Every button, every field serves a clear purpose.',
            visual: 'One primary action per screen'
        },
        {
            title: 'Shizen (自然)',
            subtitle: 'Naturalness',
            description: 'Interactions feel effortless and inevitable, not forced or artificial.',
            visual: 'Gentle transitions, organic animations'
        },
        {
            title: 'Shibui (渋い)',
            subtitle: 'Subtle Beauty',
            description: 'Understated elegance over flashy design. Beauty that reveals itself over time.',
            visual: 'Muted colors, refined typography'
        }
    ];

    const technologyFeatures = [
        {
            category: 'Convenience Tech',
            items: [
                'QR code check-in at all facilities',
                'Vending machine-style prescription pickup',
                'Contactless payment via Suica/Pasmo integration',
                'Robotic medication dispensing'
            ]
        },
        {
            category: 'Connectivity',
            items: [
                'LINE integration for appointment booking',
                'Real-time translation (100+ languages)',
                'Telemedicine with high-quality video',
                'Smart home health device sync (Omron, Tanita)'
            ]
        },
        {
            category: 'Precision Manufacturing',
            items: [
                'Wearable devices designed by MUJI aesthetics',
                'Medical-grade sensors smaller than a coin',
                'Battery life measured in months, not days',
                'Water-resistant to hot spring standards'
            ]
        }
    ];

    // Initialization
    function init() {
        renderNavigation();
        renderOverviewStaticContent();
        renderModules();
        renderConventions();
        renderTechnology();
        lucide.createIcons();
    }

    // Render Navigation
    function renderNavigation() {
        const tabs = [
            { id: 'overview', label: '概要', sub: 'Overview' },
            { id: 'modules', label: 'モジュール', sub: 'Modules' },
            { id: 'conventions', label: '文化', sub: 'Culture' },
            { id: 'technology', label: '技術', sub: 'Technology' }
        ];

        const navContainer = document.getElementById('navigation');
        navContainer.innerHTML = tabs.map(tab => `
            <button
                onclick="window.switchView('${tab.id}')"
                class="flex-1 min-w-[140px] px-6 py-4 rounded-md transition-all ${
                    activeView === tab.id
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }"
            >
                <div class="font-medium">${tab.label}</div>
                <div class="text-xs opacity-75 mt-1">${tab.sub}</div>
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
                 if(viewId === 'modules') renderModules(); 
                 if(viewId === 'conventions') renderConventions();
                // Re-create icons for the new view
                setTimeout(() => lucide.createIcons(), 0);
            } else {
                view.classList.remove('active');
            }
        });
    };

    // Render Overview Static Content
    function renderOverviewStaticContent() {
        // Design Principles
        document.getElementById('design-principles-container').innerHTML = designPrinciples.map(principle => `
            <div class="bg-white/10 backdrop-blur rounded-lg p-6">
                <h4 class="text-xl mb-2 text-pink-300">${principle.title}</h4>
                <p class="text-sm text-gray-300 mb-3">${principle.subtitle}</p>
                <p class="text-white/90 mb-3">${principle.description}</p>
                <div class="text-xs text-gray-400 italic border-t border-white/10 pt-3">
                    Implementation: ${principle.visual}
                </div>
            </div>
        `).join('');

        // Stats
        const stats = [
            { val: '29%', text: 'Of population over 65', sub: 'Super-aged society focus', color: 'red' },
            { val: '100%', text: 'Universal health coverage', sub: 'Integrated from day one', color: 'blue' },
            { val: '84.3', text: 'Years life expectancy', sub: 'Prevention-first approach', color: 'green' },
            { val: '98%', text: 'Smartphone penetration', sub: 'Mobile-first design', color: 'purple' }
        ];

        document.getElementById('stats-container').innerHTML = stats.map(stat => `
            <div class="text-center p-4 border-b-4 border-${stat.color}-500">
                <div class="text-4xl font-bold text-${stat.color}-600 mb-2">${stat.val}</div>
                <p class="text-gray-600 text-sm">${stat.text}</p>
                <p class="text-xs text-gray-500 mt-1">${stat.sub}</p>
            </div>
        `).join('');
    }

    // Render Modules
    function renderModules() {
        const container = document.getElementById('modules-container');
        container.innerHTML = coreModules.map(module => {
            const isSelected = selectedModule === module.id;
            return `
                <div
                    class="bg-gradient-to-br ${module.color} rounded-xl shadow-lg p-6 cursor-pointer transition-all border-2 ${
                        isSelected ? 'border-gray-800 scale-105' : 'border-transparent hover:border-gray-300'
                    }"
                    onclick="window.toggleModule('${module.id}')"
                >
                    <div class="flex items-start gap-4 mb-4">
                        <div class="${module.accentColor} p-3 rounded-lg">
                            <i data-lucide="${module.icon}" class="w-8 h-8 text-white"></i>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-semibold mb-1 ${module.textColor}">
                                ${module.title}
                            </h3>
                            <div class="flex items-center gap-2 text-sm mb-2">
                                <span class="font-bold">${module.japanese}</span>
                                <span class="text-gray-600">(${module.romaji})</span>
                            </div>
                            <p class="text-xs text-gray-600 mb-2">${module.english}</p>
                        </div>
                    </div>
                    
                    <p class="${module.textColor} leading-relaxed mb-4">
                        ${module.description}
                    </p>
                    
                    ${isSelected ? `
                        <div class="border-t-2 border-gray-300 pt-4 mt-4">
                            <p class="text-sm font-semibold mb-3 ${module.textColor}">主な機能 (Key Features):</p>
                            <ul class="space-y-2">
                                ${module.features.map(feature => `
                                    <li class="text-sm ${module.textColor} flex items-start gap-2">
                                        <span class="mt-1">▸</span>
                                        <span>${feature}</span>
                                    </li>
                                `).join('')}
                            </ul>
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

    // Render Conventions
    function renderConventions() {
        const container = document.getElementById('conventions-container');
        container.innerHTML = japaneseConventions.map(convention => {
            const isHovered = hoveredPrinciple === convention.id;
            // Note: mimicking hover state with JS click/mouseenter for simulation or just rely on CSS hover effects for text expansion if we want strictly CSS.
            // The original used local state. Let's use onmouseenter/leave to update state and re-render this component part
            return `
                <div
                    class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer hover-card"
                    onmouseenter="window.setHovered('${convention.id}')"
                    onmouseleave="window.setHovered(null)"
                >
                    <div class="text-5xl mb-4 text-center">${convention.icon}</div>
                    <h4 class="text-2xl font-semibold text-gray-800 mb-1 text-center">
                        ${convention.title}
                    </h4>
                    <p class="text-sm text-gray-500 text-center mb-4">${convention.subtitle}</p>
                    <p class="text-gray-700 text-center leading-relaxed transition-all ${
                        isHovered ? 'text-base' : 'text-sm'
                    }">
                        ${convention.description}
                    </p>
                </div>
            `;
        }).join('');
    }

    window.setHovered = function(id) {
        hoveredPrinciple = id;
        renderConventions();
    };

    // Render Technology
    function renderTechnology() {
         document.getElementById('technology-features-container').innerHTML = technologyFeatures.map((category) => `
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h4 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                    ${category.category}
                </h4>
                <ul class="space-y-3">
                    ${category.items.map(item => `
                        <li class="flex items-start gap-3 text-gray-700">
                            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span class="text-sm">${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        // Integration Highlights
        const natInfra = [
            'My Number Card biometric authentication',
            'Ministry of Health database sync',
            'Nationwide prescription network',
            'Real-time insurance verification'
        ];
        document.getElementById('national-infra-list').innerHTML = natInfra.map(item => `
            <li class="flex items-start gap-2">
                <span>✓</span>
                <span>${item}</span>
            </li>
        `).join('');

        const consumerEco = [
            'LINE app integration for messaging',
            'Suica/Pasmo payment integration',
            'Rakuten health points program',
            '7-Eleven prescription pickup'
        ];
        document.getElementById('consumer-eco-list').innerHTML = consumerEco.map(item => `
            <li class="flex items-start gap-2">
                <span>✓</span>
                <span>${item}</span>
            </li>
        `).join('');

        // Hardware Partners
        const hardware = [
            { icon: '⚖️', title: 'Tanita', desc: 'Medical-grade body composition analyzers with cloud sync' },
            { icon: '❤️', title: 'Omron', desc: 'Blood pressure monitors trusted by clinics nationwide' },
            { icon: '💤', title: 'Terumo', desc: 'Clinical thermometers and glucose monitoring systems' }
        ];
        document.getElementById('hardware-partners-container').innerHTML = hardware.map(item => `
            <div class="p-6 bg-gray-50 rounded-lg">
                <div class="text-3xl mb-3">${item.icon}</div>
                <h5 class="font-semibold text-gray-800 mb-2">${item.title}</h5>
                <p class="text-sm text-gray-600">${item.desc}</p>
            </div>
        `).join('');

        // Innovations
         const innovations = [
            { title: 'Smart Toilet Integration', desc: 'Connect with TOTO smart toilets for daily urinalysis—diabetes and kidney health monitoring without any effort' },
            { title: 'Onsen Health Check', desc: 'Partner hot springs track heart rate variability and stress recovery during bathing sessions' },
            { title: 'Capsule Hotel Sleep Lab', desc: 'Sensor-equipped capsules provide detailed sleep quality analysis for business travelers' },
            { title: 'Bento Nutritional Scanning', desc: 'Take photo of convenience store lunch—AI estimates calories, macros, and sodium content' }
        ];
         document.getElementById('innovations-container').innerHTML = innovations.map(item => `
            <div class="bg-white p-4 rounded-lg">
                <h5 class="font-semibold text-gray-800 mb-2">${item.title}</h5>
                <p class="text-sm text-gray-600">${item.desc}</p>
            </div>
        `).join('');
    }

    // Kickoff
    init();

})();
