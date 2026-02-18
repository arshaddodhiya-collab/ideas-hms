# Problem Statement Title
**Legacy Systems to NHCX-aligned FHIR Convertor (specifically Coverage Eligibility, Claim, Communication)**

## Category
**FHIR Utility for Providers**

## Core Problem
HMIS systems/medical devices in hospitals use different legacy systems; ABDM ecosystem needs NHCX-aligned FHIR.

## Primary Stakeholder
Hospitals, HMIS

## Desired Output
Open source micro-service for legacy systems-to-FHIR convertor.

---

Healthcare facilities increasingly rely on a wide range of legacy clinical and administrative systems—such as medical devices, laboratory systems, radiology systems, pharmacy systems, and older hospital information systems—that generate data in non-FHIR formats (e.g., HL7 v2.x messages, CSV exports, XML, DB dump, proprietary APIs, flat files).

However, ABDM-aligned digital health ecosystems and NHCX-adjacent workflows require data to be exchanged as NHCX-aligned FHIR bundles to enable interoperability, standardised processing, and downstream integration.

The absence of a reusable, standard conversion layer forces HMIS vendors and hospitals to build custom, system-specific adapters, leading to duplicated effort, inconsistent mappings, and slow adoption of FHIR-based workflows.

## Problem Statement
Develop an open-source service that can be a microservice or a library that transforms data from legacy healthcare systems into NHCX-aligned FHIR bundles for **Coverage Eligibility, Claim and Pre-Auth** enabling seamless consumption by NHCX-compliant HMIS platforms and healthcare applications.

## Objective
The objective is to simplify and standardise the transformation of legacy healthcare data into NHCX-aligned FHIR bundles, reduce integration effort for HMIS vendors and hospitals, and accelerate adoption of interoperable ABDM-compliant digital health systems.

## The Solution Should:
- **Choose the use-case** (Coverage Eligibility, Claim, Communication)
- **Accept data from common legacy healthcare sources such as:**
  - HL7 v2.x messages (devices, labs, ADT systems)
  - Flat files or structured exports (CSV, XML)
  - Proprietary or legacy system APIs / database dump
- **Map and transform source data** into appropriate FHIR resources
- **Map the data to SNOMED CT codes**
- **Package outputs as FHIR bundles** conforming to ABDM and NHCX profiles
- **Support configuration-driven mappings** to accommodate system variability without custom code
- **Include validation** against NRCeS-defined NHCX profiles with clear error reporting
- **Be designed as an open-source, reusable component** that can be embedded into any HMIS

> **Note:** Shortlisted solutions will be required to provide a brief demo for the Jury tentatively on **3rd March 2026**.
