const innovations = [
  {
    id: 1,
    code: "01",
    tag: "AI × RURAL",
    title: "Jugaad Diagnostics",
    subtitle: "Voice-First AI Doctor for Bharat",
    emoji: "🎙️",
    color: "#FF6B35",
    glow: "#FF6B3560",
    description:
      "A conversational AI doctor that speaks in local dialects — Bhojpuri, Marathi, Tamil, Bengali. No smartphone needed. Just a basic feature phone call to a toll-free number. Describes symptoms in natural language, gets triage advice, nearest PHC direction, and emergency alerts sent to ASHAs.",
    why: "650M Indians use feature phones. Healthcare can't wait for smartphone adoption.",
    impact: "Last-mile access for 500M rural Indians",
    techStack: ["NLP dialect models", "IVR integration", "ASHA alert system", "Offline SMS fallback"],
    metrics: { label1: "Feature phone", val1: "No app needed", label2: "Languages", val2: "22+ dialects" },
    phase: "Research",
    novelty: 98,
  },
  {
    id: 2,
    code: "02",
    tag: "IOT × PREVENTION",
    title: "Chai & Check",
    subtitle: "Embedded Health Sensors in Rural Kiosks",
    emoji: "🫖",
    color: "#00C4A7",
    glow: "#00C4A760",
    description:
      "Partner with chai stalls, paan shops, and kirana stores — India's original community hubs — to embed low-cost IoT health kiosks. Touch a sensor pad to get BP, SpO2, and blood glucose estimate while waiting for chai. Anonymous data feeds district health dashboards.",
    why: "Indians visit chai stalls daily. Co-locate health checks with natural social behavior.",
    impact: "40M kirana stores, zero friction health check",
    techStack: ["IoT biometric sensors", "NFC tap-to-check", "Edge computing", "District health API"],
    metrics: { label1: "Target locations", val1: "1M+ kiosks", label2: "Cost per check", val2: "₹0 for user" },
    phase: "Prototype",
    novelty: 95,
  },
  {
    id: 3,
    code: "03",
    tag: "BLOCKCHAIN × IDENTITY",
    title: "Health NFT Passport",
    subtitle: "Immutable Lifetime Medical Record on Chain",
    emoji: "🔗",
    color: "#7C3AED",
    glow: "#7C3AED60",
    description:
      "Every major health event — birth, vaccinations, surgeries, chronic conditions — minted as a verifiable credential on a permissioned blockchain. Migrant workers carry their full medical history in a QR code, accessible anywhere in India without internet dependency.",
    why: "200M+ migrant workers have fragmented health records across 5+ states.",
    impact: "Portable health identity for 200M migrants",
    techStack: ["Hyperledger Fabric", "W3C Verifiable Credentials", "Offline QR sync", "ABDM integration"],
    metrics: { label1: "Migrant workers", val1: "200M+", label2: "Record loss", val2: "Near zero" },
    phase: "Concept",
    novelty: 92,
  },
  {
    id: 4,
    code: "04",
    tag: "AI × MATERNAL",
    title: "Mata Care Intelligence",
    subtitle: "AI-Powered Antenatal Risk Prediction",
    emoji: "🤱",
    color: "#EC4899",
    glow: "#EC489960",
    description:
      "Predictive AI trained on 10M Indian pregnancy outcomes to flag high-risk pregnancies at week 12. Integrates with ASHA worker tablets. Sends hyper-local alerts to district hospitals to pre-position beds, blood, and specialists. Speaks to mothers in their native tongue via WhatsApp audio.",
    why: "India has 44,000 maternal deaths/year — 67% preventable with early detection.",
    impact: "Prevent 30,000+ maternal deaths annually",
    techStack: ["Predictive ML model", "ASHA tablet integration", "WhatsApp Business API", "NHM data feeds"],
    metrics: { label1: "Maternal deaths/yr", val1: "44,000", label2: "Preventable", val2: "67%" },
    phase: "Pilot",
    novelty: 94,
  },
  {
    id: 5,
    code: "05",
    tag: "GAMIFICATION × COMPLIANCE",
    title: "Swasth Rewards",
    subtitle: "UPI Cashback for Healthy Behavior",
    emoji: "🪙",
    color: "#F59E0B",
    glow: "#F59E0B60",
    description:
      "Gamified health insurance where preventive actions earn real money. Attend your annual health checkup: ₹500 cashback. Walk 8,000 steps for 30 days: ₹200. Quit tobacco for 90 days (confirmed via biomarker test): ₹2,000. Powered by UPI and verified by partner labs and pharmacies.",
    why: "Compliance to preventive care in India is below 12%. Incentives work.",
    impact: "10x improvement in preventive care uptake",
    techStack: ["UPI cashback engine", "Wearable step API", "Lab verification API", "Tobacco biomarker test"],
    metrics: { label1: "Current compliance", val1: "12%", label2: "Target uplift", val2: "10x" },
    phase: "Design",
    novelty: 88,
  },
  {
    id: 6,
    code: "06",
    tag: "MENTAL HEALTH × SCALE",
    title: "MannSeva",
    subtitle: "Vernacular Mental Health AI + Peer Network",
    emoji: "🧠",
    color: "#3B82F6",
    glow: "#3B82F660",
    description:
      "India has 1 psychiatrist per 200,000 people. MannSeva deploys empathetic AI counselors trained on culturally-aware Indian mental health datasets, available on WhatsApp in 12 languages. Escalates to human counselors for crisis cases. Peer support groups organized by district and life-stage.",
    why: "150M Indians need mental health care. Only 2% have access.",
    impact: "Scale mental healthcare from 2% to 50% access",
    techStack: ["Fine-tuned LLM (India mental health)", "WhatsApp chatbot", "Crisis escalation engine", "Peer matching algorithm"],
    metrics: { label1: "Current access", val1: "2%", label2: "Target access", val2: "50%" },
    phase: "Beta",
    novelty: 91,
  },
  {
    id: 7,
    code: "07",
    tag: "COMPUTER VISION × LAB",
    title: "UrineScope AI",
    subtitle: "Smartphone-Based Dipstick Lab Reader",
    emoji: "🔬",
    color: "#10B981",
    glow: "#10B98160",
    description:
      "A ₹5 urine dipstick + your phone's camera = full urine analysis in 60 seconds. AI reads the color changes on the strip with medical-grade accuracy. Detects UTI, diabetes, kidney disease, and pregnancy. Results stored in ABHA. Works in zero-connectivity mode with batch upload.",
    why: "80% of diagnostic value comes from basic tests. Make them free.",
    impact: "Replace ₹500 lab visit with ₹5 dipstick",
    techStack: ["Computer vision model", "Dipstick color calibration AI", "Offline ABHA sync", "Lab-grade validation"],
    metrics: { label1: "Cost per test", val1: "₹5 vs ₹500", label2: "Accuracy", val2: "94.2% validated" },
    phase: "Prototype",
    novelty: 96,
  },
  {
    id: 8,
    code: "08",
    tag: "LOGISTICS × COLD CHAIN",
    title: "VaccineTrack",
    subtitle: "Blockchain Cold Chain for Last-Mile Vaccines",
    emoji: "💉",
    color: "#06B6D4",
    glow: "#06B6D460",
    description:
      "India wastes 25% of vaccines due to broken cold chain. Solar-powered IoT temperature loggers with tamper-evident seals track every vaccine vial from state depot to ASHA worker bag. Any temperature breach auto-flags the vial in CoWIN and notifies supervisors via SMS.",
    why: "Cold chain failure wastes ₹2,000 Cr in vaccines annually.",
    impact: "Save ₹2,000 Cr, protect 50M children",
    techStack: ["Solar IoT logger", "NFC vial tags", "CoWIN integration", "Blockchain audit trail"],
    metrics: { label1: "Vaccine wastage", val1: "25%", label2: "Target wastage", val2: "<3%" },
    phase: "Pilot",
    novelty: 87,
  },
  {
    id: 9,
    code: "09",
    tag: "AI × RADIOLOGY",
    title: "X-Ray Sahayak",
    subtitle: "AI Radiologist for PHCs — ₹1 Per Scan",
    emoji: "🩻",
    color: "#8B5CF6",
    glow: "#8B5CF660",
    description:
      "India has 1 radiologist per 100,000 people but takes 12M X-rays a week at district hospitals with no specialist. AI reads chest X-rays for TB, pneumonia, cardiomegaly in under 10 seconds. Results integrated with NTM TB portal. District radiologist reviews only flagged cases.",
    why: "15M undiagnosed TB cases. Most X-rays sit unread for 2-3 days.",
    impact: "Read every X-ray in 10 seconds, detect 15M TB cases",
    techStack: ["Vision Transformer (CXR)", "NTM TB portal API", "DICOM integration", "Radiologist review queue"],
    metrics: { label1: "TB undiagnosed", val1: "15M cases", label2: "Read time", val2: "10 seconds" },
    phase: "Clinical Trial",
    novelty: 93,
  },
  {
    id: 10,
    code: "10",
    tag: "SOCIAL DETERMINANTS × AI",
    title: "Sehat Score",
    subtitle: "India's First Social Health Credit Score",
    emoji: "📊",
    color: "#F43F5E",
    glow: "#F43F5E60",
    description:
      "A composite health risk score (like CIBIL, but for health) built from anonymized data — sanitation access, water quality, air quality index, income tier, disease burden — mapped to every PIN code. Insurance companies price premiums. Government targets interventions. Pharma plans distribution. Privacy-first architecture.",
    why: "80% of health outcomes are determined by social factors, not medical ones.",
    impact: "India's first social health equity index",
    techStack: ["Pincode-level data aggregation", "Privacy-preserving ML", "AQI/water quality APIs", "Anonymous insurance model"],
    metrics: { label1: "Health determined by", val1: "Social factors: 80%", label2: "Current tracking", val2: "0%" },
    phase: "Research",
    novelty: 97,
  },
];

const phases = {
  Research: { color: "#94A3B8", bg: "#1E293B" },
  Concept: { color: "#A78BFA", bg: "#2D1B69" },
  Prototype: { color: "#34D399", bg: "#064E3B" },
  Design: { color: "#FCD34D", bg: "#451A03" },
  Pilot: { color: "#60A5FA", bg: "#1E3A5F" },
  Beta: { color: "#F472B6", bg: "#500724" },
  "Clinical Trial": { color: "#FB923C", bg: "#431407" },
};

const filterTypes = ["All", "AI", "IoT", "Rural", "Prevention", "Mental Health"];
const tagFilters = {
    All: () => true,
    AI: (i) => i.tag.includes("AI"),
    IoT: (i) => i.tag.includes("IOT"),
    Rural: (i) => i.tag.includes("RURAL") || i.impact.includes("rural") || i.impact.includes("Rural"),
    Prevention: (i) => i.tag.includes("PREVENTION") || i.tag.includes("MATERNAL") || i.tag.includes("COMPLIANCE"),
    "Mental Health": (i) => i.tag.includes("MENTAL"),
};

let currentFilter = "All";
let selectedId = null;
let mounted = false;

// DOM Elements
const filtersContainer = document.getElementById('filters');
const gridContainer = document.getElementById('grid');
const detailPanel = document.getElementById('detail-panel');

// Initialize
function init() {
    renderFilters();
    renderGrid();
    setTimeout(() => {
        mounted = true;
        updateNoveltyBars();
    }, 100);
}

// Render Filters
function renderFilters() {
    filtersContainer.innerHTML = filterTypes.map(f => `
        <button 
            class="filter-btn ${currentFilter === f ? 'active' : ''}" 
            onclick="setFilter('${f}')"
            style="
                ${currentFilter === f ? `background: #FF6B35; border-color: #FF6B35;` : ''}
            "
        >
            ${f.toUpperCase()}
        </button>
    `).join('');
}

function setFilter(filter) {
    currentFilter = filter;
    renderFilters();
    renderGrid();
}

// Render Grid
function renderGrid() {
    const filtered = innovations.filter(tagFilters[currentFilter]);
    
    gridContainer.innerHTML = filtered.map(item => {
        const isSelected = selectedId === item.id;
        const phaseStyle = phases[item.phase] || phases.Research;
        
        // Inline styles for dynamic rendering
        const bgStyle = isSelected 
            ? `background: linear-gradient(135deg, ${item.color}15, #0A0F1A); border-left: 3px solid ${item.color};`
            : `border-left: 3px solid transparent;`;
            
        const phaseBadgeStyle = `
            color: ${phaseStyle.color}; 
            border: 1px solid ${phaseStyle.color}40; 
            background: ${phaseStyle.color}10;
        `;
        
        return `
            <div 
                class="grid-item ${isSelected ? 'selected' : ''}" 
                onclick="toggleSelection(${item.id})"
                onmouseenter="handleMouseEnter(this, '${item.color}')"
                onmouseleave="handleMouseLeave(this)"
                style="${bgStyle}"
            >
                <div class="hover-glow" style="display: none;"></div>
                
                <div class="item-header">
                    <span class="item-code">${item.code}</span>
                    <span class="item-phase" style="${phaseBadgeStyle}">${item.phase.toUpperCase()}</span>
                </div>
                
                <div class="item-emoji">${item.emoji}</div>
                
                <div class="item-tag" style="color: ${item.color}">${item.tag}</div>
                
                <h3 class="item-title">${item.title}</h3>
                
                <p class="item-subtitle">${item.subtitle}</p>
                
                <div class="novelty-container">
                    <div class="novelty-header">
                        <span class="novelty-label">NOVELTY INDEX</span>
                        <span class="novelty-value" style="color: ${item.color}">${item.novelty}%</span>
                    </div>
                    <div class="novelty-bar-bg">
                        <div 
                            class="novelty-bar-fill" 
                            style="
                                width: ${mounted ? item.novelty + '%' : '0%'}; 
                                background: ${item.color};
                            "
                        ></div>
                    </div>
                </div>
                
                <div class="metrics-container">
                    <div>
                        <div class="metric-label">${item.metrics.label1}</div>
                        <div class="metric-value">${item.metrics.val1}</div>
                    </div>
                    <div class="text-right">
                        <div class="metric-label">${item.metrics.label2}</div>
                        <div class="metric-value">${item.metrics.val2}</div>
                    </div>
                </div>
                
                <div class="expand-text" style="color: ${isSelected ? item.color : '#334155'}">
                    ${isSelected ? '▲ COLLAPSE' : '▼ EXPLORE'}
                </div>
            </div>
        `;
    }).join('');
    
    // Re-apply novelty animations if mounted
    if (mounted) {
        requestAnimationFrame(() => updateNoveltyBars());
    }
}

function updateNoveltyBars() {
    const bars = document.querySelectorAll('.novelty-bar-fill');
    bars.forEach(bar => {
        // Force reflow to ensure transition works if re-rendered
        // In this simple implementation, the width is already set in HTML string
        // but if we wanted to animate on filter change we might need this
    });
}

function handleMouseEnter(element, color) {
    if (element.classList.contains('selected')) return;
    element.style.background = '#0F172A';
    const glow = element.querySelector('.hover-glow');
    if (glow) {
        glow.style.display = 'block';
        glow.style.background = `linear-gradient(90deg, transparent, ${color}, transparent)`;
    }
}

function handleMouseLeave(element) {
    if (element.classList.contains('selected')) return;
    element.style.background = '#080C14';
    const glow = element.querySelector('.hover-glow');
    if (glow) {
        glow.style.display = 'none';
    }
}

function toggleSelection(id) {
    if (selectedId === id) {
        selectedId = null;
        detailPanel.classList.add('hidden');
    } else {
        selectedId = id;
        renderDetail(id);
        detailPanel.classList.remove('hidden');
        detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    renderGrid();
}

// Render Detail
function renderDetail(id) {
    const active = innovations.find(i => i.id === id);
    if (!active) return;
    
    const containerStyle = `
        background: linear-gradient(135deg, ${active.color}08, #0A0F1A 60%);
        border: 1px solid ${active.color}30;
        border-top: 3px solid ${active.color};
    `;
    
    const watermarkStyle = `color: ${active.color}08;`;
    const tagStyle = `color: ${active.color};`;
    const phaseStyle = phases[active.phase] || phases.Research;
    
    detailPanel.style.cssText = containerStyle;
    
    detailPanel.innerHTML = `
        <div class="watermark" style="${watermarkStyle}">${active.code}</div>
        
        <div style="position: relative;">
            <div class="detail-header">
                <span class="detail-emoji">${active.emoji}</span>
                <div>
                    <div class="detail-tag" style="${tagStyle}">${active.tag}</div>
                    <h2 class="detail-title">${active.title}</h2>
                    <p class="detail-subtitle">${active.subtitle}</p>
                </div>
            </div>
            
            <div class="detail-grid">
                <div class="description-box">
                    <div class="box-label" style="color: ${active.color}">CONCEPT</div>
                    <p style="font-size: 14px; lineHeight: 1.8; color: #CBD5E1; margin: 0;">
                        ${active.description}
                    </p>
                </div>
                
                <div class="why-box" style="border-top: 3px solid ${active.color}">
                    <div class="box-label" style="color: #64748B">THE PROBLEM</div>
                    <p style="font-size: 13px; lineHeight: 1.7; color: #94A3B8; margin: 0 0 16px;">
                        ${active.why}
                    </p>
                    <div 
                        class="impact-box" 
                        style="
                            background: ${active.color}10;
                            border: 1px solid ${active.color}30;
                            color: ${active.color};
                        "
                    >
                        💡 ${active.impact}
                    </div>
                </div>
            </div>
            
            <div class="tech-stack">
                <div class="box-label" style="color: #334155">TECH STACK</div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${active.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
            
            <div class="bottom-metrics">
                <div class="bottom-metric-box">
                    <div class="bottom-metric-label">PHASE</div>
                    <div class="bottom-metric-val" style="color: ${phaseStyle.color}">${active.phase}</div>
                </div>
                <div class="bottom-metric-box">
                    <div class="bottom-metric-label">NOVELTY</div>
                    <div class="bottom-metric-val" style="color: ${active.color}">${active.novelty}/100</div>
                </div>
                <div class="bottom-metric-box">
                    <div class="bottom-metric-label">${active.metrics.label1.toUpperCase()}</div>
                    <div class="bottom-metric-val" style="color: #94A3B8">${active.metrics.val1}</div>
                </div>
                <div class="bottom-metric-box">
                    <div class="bottom-metric-label">${active.metrics.label2.toUpperCase()}</div>
                    <div class="bottom-metric-val" style="color: #94A3B8">${active.metrics.val2}</div>
                </div>
            </div>
        </div>
    `;
}

// Start app
init();
