# REVO: AI-Powered Academic Evolution - Redesign Plan

## Overview
This plan outlines the redesign and implementation of the **REVO** ecosystem, evolving from a data-dense dashboard to a comprehensive academic evolution system. The redesign focuses on four core modules: Academic Drive (Management), Logic Audit (Verification), Defense Lab (Simulation), and Fintech/Marketplace (Economy).

## Project Type: WEB (React + Vite + TypeScript)

## Success Criteria
- [ ] **Unified Aesthetic:** "Data-Dense Academic Dashboard" (Crimson Pro + Atkinson Hyperlegible) applied consistently.
- [ ] **Functional Depth:** All functional requirements (SRS, Split-screen Audit, Biometric Lab, Wallet) implemented.
- [ ] **Technical Excellence:** 4k-ready animations, zero lint errors, and mobile-accessible touch targets.

## Tech Stack
- **Frontend:** React 18, Vite, TypeScript.
- **Styling:** Tailwind CSS v4, Framer Motion (Animations).
- **Icons:** Lucide React.
- **State:** React Hooks (useState/useEffect/useContext).

## Proposed File Structure Changes
- `src/pages/Drive/`: Components for Workspaces, Calendar, and Study list.
- `src/pages/Thesis/`: Split-screen components and Audit result visualizations.
- `src/pages/Defense/`: Juror personas, Biometric sidebar, and Transcript buffer.
- `src/pages/Marketplace/`: Wallet, Pricing tables, and Grid view.

## Task Breakdown

### Phase 1: Foundation & Navigation [P0]
- [ ] **Task 1.1:** Refactor `App.tsx` sidebar to include Wallet sub-items and configuration.
    - **Agent:** @frontend-specialist
    - **Verify:** Navigation links work and reflect the new hierarchy.
- [ ] **Task 1.2:** Update `design-system/revo-ai/MASTER.md` with specific components for "Workspace" cards and "Gauge" charts.
    - **Agent:** @frontend-specialist
    - **Verify:** Design tokens are defined.

### Phase 2: Academic Drive (Linh hồn của việc học) [P1]
- [ ] **Task 2.1:** Implement Folder-based Workspace UI in `DrivePage.tsx`.
    - **Agent:** @frontend-specialist
    - **Verify:** Grid view handles "Workspaces" with subject-specific metadata.
- [ ] **Task 2.2:** Build the AI Smart Tools modal (PDF to Flashcards/Quiz).
    - **Agent:** @frontend-specialist
    - **Verify:** Modal triggers and shows simulated conversion state.
- [ ] **Task 2.3:** Add SRS Logic sidebar/view (Spaced Repetition Calendar).
    - **Agent:** @frontend-specialist
    - **Verify:** Calendar component displays "Study Today" items.

### Phase 3: Logic Audit (Premium) [P1]
- [ ] **Task 3.1:** Implement Split-screen Layout in `ThesisPage.tsx`.
    - **Agent:** @frontend-specialist (Skill: frontend-design)
    - **Verify:** Responsive split view (Doc vs Results).
- [ ] **Task 3.2:** Add Internal Consistency markers and Readiness Gauge.
    - **Agent:** @frontend-specialist
    - **Verify:** Contradictions are highlighted; Gauge reflects real data.
- [ ] **Task 3.3:** Citation Highlight & Scroll Sync.
    - **Agent:** @frontend-specialist
    - **Verify:** Clicking audit error scrolls the document fragment view.

### Phase 4: Defense Lab (Phòng giả lập AI) [P2]
- [ ] **Task 4.1:** Persona Selection Card Grid.
    - **Agent:** @frontend-specialist
    - **Verify:** Cards toggle active persona; stats update.
- [ ] **Task 4.2:** Voice Waveform & Reflex Timer implementation.
    - **Agent:** @frontend-specialist (Skill: performance-profiling)
    - **Verify:** Waveform animates during AI turns; Timer tracks start-of-speech.

### Phase 5: Fintech & Marketplace [P2]
- [ ] **Task 5.1:** Revo Wallet Dashboard with Transaction History.
    - **Agent:** @frontend-specialist
    - **Verify:** History list is formatted correctly.
- [ ] **Task 5.2:** Dynamic VietQR Modal & Pricing Tables.
    - **Agent:** @frontend-specialist
    - **Verify:** QR modal displays correctly; Pricing comparison is clear.

## Phase X: Verification
- [ ] **Build Check:** `npm run build` passes with zero errors.
- [ ] **Lint Check:** `npm run lint` passes.
- [ ] **UX Audit:** All touch targets >= 44px; Blue/Orange contrast verified.
- [ ] **Performance:** Lighthouse score > 90 for Desktop.
