# DIAL SEVA — Product Requirements Document
### MVP Version | Free & Open-Source Tech Stack
**Version:** 1.0-MVP | **Status:** Draft | **Date:** February 2026 | **Author:** Product Team

---

## Table of Contents
1. [Product Overview](#1-product-overview)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [User Personas](#4-user-personas)
5. [MVP Scope](#5-mvp-scope)
6. [User Stories & Acceptance Criteria](#6-user-stories--acceptance-criteria)
7. [Feature Specifications](#7-feature-specifications)
8. [MVP Tech Stack](#8-mvp-tech-stack)
9. [System Architecture](#9-system-architecture)
10. [Call Flow Walkthrough](#10-call-flow-walkthrough)
11. [Data Model](#11-data-model)
12. [Risks & Mitigations](#12-risks--mitigations)
13. [Launch Plan](#13-launch-plan)
14. [Out of Scope for MVP](#14-out-of-scope-for-mvp)

---

## 1. Product Overview

**DIAL SEVA** (डायल सेवा) is a voice-first AI health triage system for rural India. A person dials a single toll-free number from any basic feature phone — no internet, no smartphone, no literacy required — and is guided through a natural conversation in their local dialect to receive triage advice, directions to the nearest Primary Health Centre (PHC), and emergency alerts dispatched automatically to their village ASHA worker.

The MVP targets a single-district pilot across **4 dialects: Bhojpuri, Marathi, Tamil, and Bengali**, built entirely on free and open-source tools to validate core product assumptions before investing in production infrastructure.

---

## 2. Problem Statement

### The Gap
Over 65% of India's population lives in rural areas. A qualified doctor is accessible to fewer than 1 in 3 rural Indians within a reasonable distance. When someone falls ill in a remote village, the decision of "is this serious enough to travel?" is made by guessing — often leading to either dangerous delays in emergencies or unnecessary expensive trips for minor ailments.

### Why Existing Solutions Fail
- **Telemedicine apps** require a smartphone and internet — unavailable to most rural households
- **Written health guides** require literacy — India has ~250 million adults who cannot read
- **Government helplines (104)** are in formal Hindi — inaccessible to dialect speakers
- **ASHA workers** are overstretched — one ASHA covers ~1000 people, often without connectivity

### The Opportunity
Every rural household in India has access to at least one GSM feature phone. Voice calls work on 2G. ASHA workers already use basic SMS. DIAL SEVA uses this existing infrastructure to deliver AI-powered triage at zero marginal cost per call.

---

## 3. Goals & Success Metrics

### MVP Goals

| Goal | What It Means |
|------|---------------|
| Validate dialect comprehension | Can Whisper/IndicASR understand real rural speech well enough? |
| Validate triage logic | Do callers trust and act on the advice given? |
| Validate ASHA alert pipeline | Does the SMS alert actually reach ASHA in time? |
| Validate call completion rate | Can a first-time caller complete a session without dropping off? |

### Success Metrics (Pilot — 3 months, 1 district)

| Metric | Target |
|--------|--------|
| Call completion rate (caller reaches triage output) | ≥ 70% |
| ASR Word Error Rate on medical vocabulary | ≤ 20% (relaxed for MVP) |
| Emergency triage accuracy vs. clinical review | ≥ 80% agreement |
| ASHA SMS delivery rate | ≥ 90% |
| Average session duration | ≤ 8 minutes |
| Caller satisfaction (end-of-call rating) | ≥ 65% positive |
| Total pilot calls handled | 500+ calls in 90 days |

### North Star Metric
**% of Emergency-tier callers who reached a health facility within 4 hours** — tracked via ASHA worker follow-up survey.

---

## 4. User Personas

### Persona 1 — Sunita, 34, Rural Homemaker (Primary User)
- Village in Bhojpuri-speaking Bihar
- No smartphone, owns a basic Nokia feature phone (Rs. 800)
- Can speak but not read; has heard of "sarkari helpline" but never used one
- Pain point: Son has had fever for 2 days, doesn't know if it's serious enough to travel 12 km to town

### Persona 2 — Rekha, 28, ASHA Worker (Alert Recipient)
- Covers 900 households in a Marathi-speaking Maharashtra village
- Has a smartphone but relies on SMS for notifications (WhatsApp is unreliable in her area)
- Pain point: Learns about medical emergencies too late, often after families have tried home remedies for days

### Persona 3 — Dr. Pradeep, 45, PHC Medical Officer (Escalation Recipient)
- Manages a PHC covering 12 villages in Tamil Nadu
- Wants early warning for cases coming his way so he can prepare
- Pain point: Patients arrive at PHC at midnight with advanced conditions that could have been managed earlier

### Persona 4 — State Health Programme Manager (Dashboard User)
- Monitors district health indicators for the Ministry of Health
- Needs call volume data, triage outcomes, and ASHA response rates by block
- Pain point: No real-time visibility into rural health-seeking behaviour

---

## 5. MVP Scope

### In Scope
- Inbound voice call handling via Asterisk + Twilio trial number
- Language selection: Bhojpuri, Marathi, Tamil, Bengali (+ Hindi default)
- Natural language symptom collection via Whisper ASR
- Hardcoded Python decision-tree triage engine (top 20 rural complaints)
- Red flag keyword detection (7 emergency conditions)
- PHC lookup from NIC CSV for pilot district (pre-loaded, manual)
- PHC phone number and verbal directions readout via Vakyansh TTS
- ASHA SMS alert via Fast2SMS for Emergency-tier outcomes
- Session logging to PostgreSQL (Supabase free tier)
- Simple ops dashboard: call count, triage distribution, alert status

### Pilot Scope Constraints
- **1 district only** — proof of concept before scaling
- **Top 20 symptom clusters** — not full clinical coverage
- **Pre-loaded PHC data** — no live API sync
- **WhatsApp bot version built first**, telephony added in week 6

---

## 6. User Stories & Acceptance Criteria

### Epic 1: Voice Call Access

**US-1.1** — As a rural caller, I want to call a single number from any phone so that I don't need internet or a smartphone.
- AC: Call connects from BSNL/Jio/Airtel on 2G voice within 5 rings
- AC: No data connection required at any point in the session

**US-1.2** — As a caller, I want to hear the greeting in a language I understand so that I know I'm in the right place.
- AC: Hindi welcome message plays within 3 seconds of connect
- AC: Pressing 1–4 switches to Bhojpuri / Marathi / Tamil / Bengali respectively
- AC: If no input in 8 seconds, defaults to Hindi and continues

**US-1.3** — As a caller with low tech literacy, I want the system to guide me step by step so that I don't get confused.
- AC: Every prompt ends with a clear instruction (e.g., "1 dabao hanh ke liye")
- AC: If no input detected for 10 seconds, prompt replays automatically (up to 3 times)
- AC: Caller can say "wapas" or press * to repeat the previous prompt

---

### Epic 2: Symptom Collection

**US-2.1** — As a caller, I want to describe my symptoms in my own words so that I don't have to guess medical terms.
- AC: System accepts free-form speech input of 5–30 seconds
- AC: ASR transcribes Bhojpuri/Marathi/Tamil/Bengali with WER ≤ 20%
- AC: Colloquial terms (e.g., "bukhar", "dast", "seena dard") are correctly mapped to symptom categories

**US-2.2** — As a caller, I want the system to ask me follow-up questions so that it understands my situation better.
- AC: System asks a minimum of 3 and maximum of 6 follow-up questions
- AC: Questions cover: duration, severity (mild/moderate/severe), associated symptoms, age of patient
- AC: System reads back a 2-sentence symptom summary before delivering triage

**US-2.3** — As a pregnant caller, I want the system to recognise my condition so that I get maternity-specific advice.
- AC: If caller mentions pregnancy (in any dialect variant), system switches to maternity triage pathway
- AC: Maternity pathway includes 5 WHO danger sign checks

---

### Epic 3: Triage Output

**US-3.1** — As a caller, I want to know how serious my situation is so that I can decide whether to travel to hospital.
- AC: Every session produces one of three triage outputs: Emergency / Urgent / Self-care
- AC: Triage output is communicated in caller's dialect within 5 seconds of symptom collection ending
- AC: Output includes specific next action (e.g., "Abhi 108 call karein" / "Kal PHC jaao" / "Ghar pe aaram karein")

**US-3.2** — As a caller with an emergency, I want the system to tell me clearly and immediately so that I don't waste time.
- AC: On detection of any red flag (chest pain, difficulty breathing, unconscious, seizure, heavy bleeding, stroke signs, snake bite), system immediately escalates to Emergency tier without completing full symptom questionnaire
- AC: Emergency message is delivered within 2 turns of red flag detection

**US-3.3** — As a caller in the Self-care tier, I want practical home advice so that I can manage the condition.
- AC: Self-care output includes at least 2 specific actionable instructions in caller's dialect
- AC: ORS preparation instructions given for all diarrhoea/dehydration cases

---

### Epic 4: PHC Direction

**US-4.1** — As a caller, I want to know where the nearest PHC is so that I don't have to ask around.
- AC: System identifies nearest PHC from pilot district database within 3 seconds
- AC: PHC phone number is read out slowly and offered to be repeated once
- AC: Basic landmark-based verbal direction is given (pre-written for pilot district PHCs)

**US-4.2** — As a caller directed to a PHC, I want to know if it's currently open so that I don't travel for nothing.
- AC: For Urgent-tier cases, system advises PHC operational hours
- AC: If PHC is likely closed (after 4pm or Sunday), system provides duty doctor number or CHC alternative

---

### Epic 5: ASHA Alerts

**US-5.1** — As an ASHA worker, I want to receive an SMS when someone in my village has an emergency so that I can respond quickly.
- AC: Emergency-tier session triggers SMS to mapped ASHA within 60 seconds of call ending
- AC: SMS contains: patient reference ID, symptoms summary (2 lines), recommended action, timestamp

**US-5.2** — As an ASHA worker, I want to acknowledge the alert so that the system knows I've seen it.
- AC: ASHA can reply "ACK" to the SMS to log acknowledgement
- AC: Acknowledgement timestamp is logged in the database

**US-5.3** — As a health system, I want escalation when ASHA doesn't respond so that no emergency goes unnoticed.
- AC: If no ACK received within 30 minutes, secondary SMS sent to PHC doctor's registered number
- AC: Escalation event is logged in ops dashboard

---

### Epic 6: Operations & Monitoring

**US-6.1** — As a programme manager, I want to see daily call volumes and triage outcomes so that I can report on pilot performance.
- AC: Dashboard shows total calls, breakdown by triage tier, by language, by district block
- AC: Data refreshes every 24 hours
- AC: Accessible via web browser, password-protected

---

## 7. Feature Specifications

### 7.1 IVR & Call Flow Engine

The IVR is built on **Asterisk** with dialplan scripts. Key behaviours:

- Max call duration: 15 minutes (auto-disconnect with advisory)
- Silence detection: re-prompt after 10s, disconnect after 3 missed prompts
- DTMF priority: if both voice and DTMF detected in same window, DTMF wins
- Audio format: G.711 ulaw, 8kHz (standard PSTN)
- All prompts pre-recorded as .wav files for reliability (not live TTS on every prompt)

### 7.2 ASR Pipeline

Input audio is streamed from Asterisk via AGI (Asterisk Gateway Interface) to a Python service running **Whisper large-v3** (self-hosted on Oracle Cloud A1 ARM instance).

- Language hint passed per session (e.g., `language="hi"` for Bhojpuri as fallback)
- Medical vocabulary boost: custom vocabulary list of 200 common rural health terms fed as hotwords
- Confidence threshold: if confidence < 0.4, system plays "Kya aap phir se bol sakte hain?" and re-records
- Max recording per utterance: 30 seconds

### 7.3 NLU & Dialogue Manager

**Rasa Open Source** manages the conversation state machine with custom actions calling the triage engine.

Slots collected per session:
- `language` — set at greeting
- `chief_complaint` — free text mapped to symptom category
- `duration` — hours/days
- `severity` — mild/moderate/severe
- `patient_age_group` — child/adult/elderly
- `patient_gender`
- `is_pregnant` — boolean
- `red_flag_detected` — boolean, triggers immediate escalation
- `associated_symptoms` — list

Dialogue fallback: if Rasa intent confidence < 0.5 after 2 attempts, route to clarification loop asking caller to choose from 3 DTMF options.

### 7.4 Triage Engine

Python decision tree covering 20 symptom clusters:

| Cluster | Red Flags → Emergency | Urgent Triggers | Default |
|---------|----------------------|-----------------|---------|
| Chest/Heart | Chest pain + breathlessness, palpitations + sweating | Chest pain alone > 30 min | Urgent |
| Respiratory | Breathlessness at rest, blue lips | Breathlessness on exertion, cough > 3 weeks | Urgent/Self-care |
| Fever | Fever + seizure, fever + neck stiffness | Fever > 4 days, fever + rash | Urgent |
| Diarrhoea | Bloody stool + infant, severe dehydration | Diarrhoea > 3 days | Self-care + ORS |
| Abdominal | Rigid abdomen, severe constant pain | Moderate pain > 24h | Urgent |
| Maternity | Heavy bleeding, severe headache + vision change, no fetal movement | Swelling face/hands | Emergency |
| Paediatric | Not feeding, unconscious, convulsions | High fever child < 5 | Emergency |
| Injury | Uncontrolled bleeding, fracture + numbness | Wound with pus | Urgent |
| Snake/Animal bite | Any snake bite | Dog bite (rabies risk) | Emergency |
| Neurological | Sudden facial droop, arm weakness, slurred speech | Severe sudden headache | Emergency |

Logic is explicit `if/elif/else` in Python — no ML, no black box. Every decision point is auditable by a doctor.

### 7.5 PHC Directory (MVP)

- Source: NIC National Health Portal PHC CSV for pilot district — downloaded once, manual monthly refresh
- Stored in PostgreSQL with columns: phc_id, name, tehsil, lat, lng, phone, hours, landmark_directions
- Lookup: match caller's tehsil (collected via voice) to nearest PHC by tehsil name — no geospatial math needed for single-district MVP
- Directions: hand-written in each dialect for each PHC by a local field researcher during pilot setup

### 7.6 ASHA Alert System

- ASHA-village mapping stored in PostgreSQL: asha_id, name, mobile, village_list, block
- On Emergency trigger: Celery task dispatched immediately with session_id
- SMS content template (160 chars): `DIAL SEVA ALERT [REF#XXXX]: Chest pain + breathlessness. Emergency. Patient called from [village]. Please check immediately.`
- SMS sent via Fast2SMS API — free tier 50 SMS/day, upgrade to Rs. 0.18/SMS for pilot volume
- ACK tracking: incoming SMS webhook checks for "ACK" and updates asha_alerts table

---

## 8. MVP Tech Stack

### Why Free Stack
The MVP must prove the concept with zero infrastructure spend. Every tool below has a free tier sufficient for a single-district pilot of 500 calls.

| Layer | Tool | Why This | Free Limit |
|-------|------|----------|------------|
| Telephony | Asterisk (self-hosted) | Open-source PBX, full control | Free forever |
| Test Number | Twilio free trial | Quick SIP trunk setup | $15 credit (~200 calls) |
| ASR | Whisper large-v3 | Best open-source multilingual ASR | Free (self-hosted) |
| TTS | Vakyansh (AI4Bharat) | Native Indian language neural voices | Free (self-hosted) |
| NLU/Dialogue | Rasa Open Source | Multi-turn dialogue, slot filling | Free forever |
| Language Model | IndicBERT (HuggingFace) | Trained on Indian languages | Free to download |
| Triage Engine | Python decision tree | Auditable, doctor-reviewable, fast | Free forever |
| Location | OpenStreetMap + manual CSV | No API cost, offline-capable | Free forever |
| SMS Alerts | Fast2SMS | India-first, DLT-compliant | 50 free SMS/day |
| Backend | Python + FastAPI | Fast, async, great ML ecosystem | Free forever |
| Database | Supabase (PostgreSQL) | Managed Postgres, dashboard included | 500MB free |
| Cache/Queue | Upstash Redis | Serverless Redis for session state | 10k commands/day free |
| File Storage | Cloudflare R2 | Zero egress fees, S3-compatible | 10GB/month free |
| Infrastructure | Oracle Cloud Free Tier | 4 OCPUs, 24GB RAM ARM forever | Free forever |
| Auth | Keycloak (self-hosted) | MFA, role-based access | Free forever |
| Monitoring | Grafana Cloud free | Metrics + logs, 14-day retention | Free tier |
| Error Tracking | Sentry free tier | Error alerts across services | 5k events/month free |
| CI/CD | GitHub Actions | Automated test + deploy pipeline | 2000 min/month free |
| DNS + SSL | Cloudflare free | SSL, DDoS protection | Free forever |
| Containers | Docker Compose | Simple single-VM deployment | Free forever |

### Infrastructure Layout — Single Oracle Cloud VM

```
Oracle Cloud A1 ARM Instance (4 OCPU, 24GB RAM — FREE FOREVER)
├── Asterisk container        (telephony + IVR)
├── FastAPI app container     (core API, triage engine, alert dispatcher)
├── Rasa container            (NLU + dialogue manager)
├── Whisper service container (ASR inference — CPU mode on ARM)
├── Vakyansh TTS container    (voice synthesis)
├── Celery worker container   (async alert tasks)
├── Redis container           (session cache, Celery broker)
└── Nginx container           (reverse proxy, SSL termination)

External free tiers:
├── Supabase                  (PostgreSQL database)
├── Cloudflare R2             (call recording storage)
├── Fast2SMS                  (SMS delivery)
└── Grafana Cloud             (monitoring + alerting)
```

### Start With WhatsApp Bot First

Before building the full Asterisk telephony stack (2–3 weeks of work), build the same dialogue flow as a **WhatsApp bot using Twilio WhatsApp Sandbox** (free). This takes 3–4 days and lets you:

- Validate NLU accuracy with real users via text before adding voice complexity
- Validate triage logic with doctors by reviewing 100 real conversations
- Gather real symptom descriptions in all 4 dialects to improve Whisper fine-tuning
- Show a working demo to stakeholders in week 1

Switch to voice-over-PSTN only after the conversation flow is validated at the end of week 5.

---

## 9. System Architecture

### Component Diagram

```
[Caller Feature Phone]
        |
        | PSTN Voice Call (2G)
        v
[Asterisk IVR Server]
        |
        | AGI socket bridge
        v
[FastAPI Core Service]
    |        |        |
    v        v        v
[Whisper  [Rasa    [Triage
  ASR]    NLU]     Engine]
    |        |        |
    +--------+--------+
             |
             v
    [PostgreSQL on Supabase]
             |
     +-------+-------+
     |               |
     v               v
[PHC Lookup]   [Celery Worker]
(PostGIS CSV)       |
     |         [Fast2SMS API]
     v               |
[Vakyansh TTS]  [SMS → ASHA]
     |
[Audio → Caller]
```

### Data Flow per Call

1. Caller dials → Asterisk answers → plays pre-recorded greeting WAV
2. Caller presses DTMF language choice → Asterisk sets language context
3. Asterisk prompts for symptom description → records 30s audio
4. Audio WAV sent to FastAPI via AGI socket
5. FastAPI → Whisper ASR → transcription text returned
6. FastAPI → Rasa NLU → intent and entities extracted
7. Rasa dialogue manager fills slots → determines next prompt or triggers triage
8. FastAPI → Triage Engine → returns tier (Emergency / Urgent / Self-care)
9. FastAPI → PHC Lookup → returns PHC name, phone, pre-written directions
10. FastAPI → Vakyansh TTS → generates audio for advice + PHC info
11. Audio streamed back to Asterisk → played to caller
12. On Emergency: FastAPI → Celery task → Fast2SMS → ASHA SMS dispatched
13. Full session data written to PostgreSQL (Supabase)

---

## 10. Call Flow Walkthrough

**Scenario: Sunita calls from Bihar, Bhojpuri, son has fever and convulsions**

```
[00:00] Asterisk answers call
SYSTEM:  "Namaste, Swasthya Seva mein aapka swagat.
          Bhojpuri ke liye 1 dabao..."
CALLER:  presses 1

[00:08] Language set to Bhojpuri
SYSTEM:  "Namaskar. Aaj kaun beemar baa?
          Apna naam aur umar batao."
CALLER:  "Hamaar beta, uska 4 saal ba"

[00:22] Rasa slot: patient_age_group = child, age = 4
SYSTEM:  "Theek ba. Kaahe ki takleef ba? Apna hisaab se batao."
CALLER:  "Bukhar baa aur thodi der pahile mirgi aail"

[00:38] NLU: chief_complaint = fever, associated = convulsion
        RED FLAG DETECTED: fever + convulsion in child under 5

[00:40] IMMEDIATE ESCALATION — no further questions
SYSTEM:  "Iha BAHUT GAMBHIR ba. Apna beta ke ABHI Sadar
          Hospital le jaao ya 108 call karein. Rokna mat.
          108 ka number ba: EK-SHOONYA-AATH.
          Aapke najdik PHC: Phulwari PHC, Civil Lines ke paas.
          Phone: 0612-XXXXXXX."

[01:10] Call ending
SYSTEM:  "Khayal rakhein. Jaldi jaao."

[01:15] Call ends
→ Celery task dispatched immediately
→ SMS sent to Ramkali Devi (ASHA, Phulwari village):
  "DIAL SEVA ALERT [REF#0042]: Child 4yr - Fever + Convulsion.
   EMERGENCY. Called from Phulwari. Please check immediately."

[01:20] SMS delivered to ASHA ✓
[01:25] Session logged to Supabase ✓
[31:25] No ACK received after 30 mins → escalation SMS to PHC doctor ✓
```

---

## 11. Data Model

### Core Tables (PostgreSQL on Supabase)

```sql
-- Call sessions
sessions (
  session_id        UUID PRIMARY KEY,
  called_at         TIMESTAMP,
  caller_msisdn     VARCHAR(6),       -- last 6 digits only, pseudonymised
  language          VARCHAR(20),
  patient_age_group VARCHAR(10),
  chief_complaint   VARCHAR(100),
  triage_tier       VARCHAR(10),      -- Emergency / Urgent / Self-care
  phc_id            INTEGER,
  call_duration_sec INTEGER,
  caller_rating     BOOLEAN,          -- end-of-call satisfaction prompt
  created_at        TIMESTAMP
)

-- PHC directory — pilot district
phcs (
  phc_id            SERIAL PRIMARY KEY,
  name              VARCHAR(100),
  tehsil            VARCHAR(50),
  district          VARCHAR(50),
  phone             VARCHAR(15),
  hours             VARCHAR(50),
  directions_bho    TEXT,             -- Bhojpuri
  directions_mr     TEXT,             -- Marathi
  directions_ta     TEXT,             -- Tamil
  directions_bn     TEXT,             -- Bengali
  is_active         BOOLEAN
)

-- ASHA workers
asha_workers (
  asha_id           SERIAL PRIMARY KEY,
  name              VARCHAR(100),
  mobile            VARCHAR(10),
  village           VARCHAR(100),
  tehsil            VARCHAR(50),
  block             VARCHAR(50),
  is_active         BOOLEAN
)

-- ASHA alerts
asha_alerts (
  alert_id          SERIAL PRIMARY KEY,
  session_id        UUID REFERENCES sessions,
  asha_id           INTEGER REFERENCES asha_workers,
  sent_at           TIMESTAMP,
  sms_status        VARCHAR(20),
  acked_at          TIMESTAMP,
  escalated_at      TIMESTAMP,
  escalated_to      VARCHAR(100)
)

-- Symptom logs — for model improvement post-pilot
symptom_logs (
  log_id            SERIAL PRIMARY KEY,
  session_id        UUID REFERENCES sessions,
  asr_transcript    TEXT,
  nlu_intent        VARCHAR(50),
  slots_json        JSONB,
  triage_output     VARCHAR(10),
  created_at        TIMESTAMP
)
```

---

## 12. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Whisper ASR accuracy too low for Bhojpuri | High | High | Start with WhatsApp text bot to collect real utterances and use for Whisper fine-tuning before telephony launch |
| Oracle Cloud free tier capacity insufficient at peak | Medium | Medium | Load test at 20 concurrent calls; ARM instance handles ~50 concurrent Whisper jobs at 1x speed |
| Fast2SMS daily SMS limit hit quickly | Medium | Low | Upgrade to paid plan (Rs. 0.18/SMS); budget Rs. 500 for full 90-day pilot |
| Triage false negative — Emergency case missed | Low | Critical | Over-sensitive red flag list; when in doubt classify up; weekly clinical review of all Emergency cases |
| ASHA mobile numbers out of date in pilot district | High | Medium | Manual field verification of all 50 ASHAs in pilot district before launch |
| Asterisk SIP configuration issues with Twilio | Medium | Medium | Use Plivo as backup SIP provider; test both in parallel before launch |
| Caller hangs up before triage is delivered | High | Medium | Deliver partial triage if 2+ symptoms collected; log incomplete session for review |
| DLT registration for SMS sender ID missing | High | High | Begin DLT registration 6 weeks before pilot; use Fast2SMS pre-registered sender ID meanwhile |

---

## 13. Launch Plan

### Phase 0 — Foundation (Weeks 1–2)
- [ ] Set up Oracle Cloud free tier VM and Docker Compose environment
- [ ] Deploy Rasa + Whisper + Vakyansh in containers, verify they run
- [ ] Build WhatsApp bot with same dialogue flow using Twilio sandbox
- [ ] Load pilot district PHC data into Supabase
- [ ] Build ASHA worker directory — manual, 50 ASHAs for pilot district

### Phase 1 — WhatsApp Pilot (Weeks 3–5)
- [ ] 50 test users (community health workers, ASHA supervisors) test WhatsApp bot
- [ ] Collect 200+ real symptom conversations across 4 dialects
- [ ] Validate triage logic with 2 doctors reviewing 100 sessions
- [ ] Fix dialogue gaps and add missing symptom clusters
- [ ] Target: 80%+ triage agreement with clinical review before proceeding

### Phase 2 — Voice Integration (Weeks 6–8)
- [ ] Deploy Asterisk and configure SIP trunk with Twilio trial credit
- [ ] Build AGI bridge connecting Asterisk and FastAPI
- [ ] Record all IVR prompts using native dialect voice artists (4 languages)
- [ ] End-to-end call testing — 100 internal test calls before external users
- [ ] ASHA SMS alert pipeline tested with 5 real ASHA workers

### Phase 3 — Soft Launch (Weeks 9–12)
- [ ] 5 villages, 500 target calls over 6 weeks
- [ ] Weekly clinical review of all Emergency-tier cases
- [ ] ASHA feedback collected fortnightly via phone survey
- [ ] Ops dashboard reviewed by district health officer weekly
- [ ] Go/No-Go decision for district-wide rollout at week 12

### Go/No-Go Criteria for Expansion
- Call completion rate ≥ 70%
- Zero missed Emergency cases confirmed in clinical review
- ASHA SMS delivery ≥ 90%
- No data breach or security incident
- Positive endorsement from at least 1 district health officer

---

## 14. Out of Scope for MVP

The following are explicitly deferred to post-MVP:

- Live doctor connection or telemedicine — no call transfer to a human
- Outbound calls to patients — DIAL SEVA does not call callers back
- EMR or ABDM health record creation
- Geospatial PHC routing — simple tehsil-name matching only for MVP
- Languages beyond the 4 Phase 1 dialects
- Mental health triage pathways — deferred for clinical safety reasons
- Chronic disease management or longitudinal patient tracking
- Insurance or Ayushman Bharat card verification
- Prescription or medication name recommendations
- Video or image input — voice only
- Kubernetes or auto-scaling — single Docker Compose VM for MVP

---

## Appendix A: Dialect Reference for Triage Prompts

| Symptom Prompt | Bhojpuri | Marathi | Tamil | Bengali |
|----------------|----------|---------|-------|---------|
| "What is wrong?" | Kaahe ki takleef ba? | Kaay tras hoto? | Enna kashtam? | Ki hoyeche? |
| "How long?" | Kab se ba? | Kiti divs zalay? | Eppodhu irundhu? | Kotodin dhore? |
| "Mild/Moderate/Severe?" | Halka / Theek-theek / Bahut zyada | Saman / Madhyam / Jaast | Konjam / Naduvaana / Romba | Halka / Madhyam / Beshi |
| "Are you pregnant?" | Ka aap garbhwati bani? | Tumhi garvar aahat ka? | Neenga karuvaaka irukkinga? | Aapni ki garboboati? |

---

## Appendix B: Red Flag Keywords by Dialect

| Condition | Bhojpuri | Marathi | Tamil | Bengali |
|-----------|----------|---------|-------|---------|
| Chest pain | seena dard, chhaati mein dard | chhaatit dukhnay | nenjil vaali | buker betha |
| Breathlessness | sans lena mushkil, dam ghutan | shwaas gheta yet nahi | maarppu pidikuthu | shwas nite parchhi na |
| Seizure | mirgi, jhatka, khich | jhad, aaghaat | valichal, izhuppu | khichuni, morgi |
| Unconscious | behosh, hosh nahi | shaadh nahi | mayangu | behoosh, gyaan nei |
| Heavy bleeding | zyada khoon bah raha | jaast rakt padnay | adhika irattham | onek rakter dhara |
| Stroke signs | muh tircha, haath kamzor | toand vakda | vaaydhu saivu | mukh banka, haath durbalo |
| Snake bite | saanp kata | saap chavla | paambhu kadichchu | shaap kaameche |

---

*Document Owner: Product Team*
*Clinical Advisor sign-off required before Phase 3 soft launch*
*Next Review: Post-Phase 1 WhatsApp Pilot — Week 5*
