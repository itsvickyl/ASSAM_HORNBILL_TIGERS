# Implementation Plan: Post-Fix Audit Remediation

## Goal
Fix all critical, high, and medium issues identified in the independent post-fix audit. Prioritized by: legal/credibility risk → functional bugs → performance → SEO/accessibility.

---

## Phase 1 — Critical: Credibility & Legal Fixes

These must be fixed before any demo or public viewing.

---

### 1.1 Remove Rickroll Video

#### [MODIFY] [MatchCenter.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/pages/MatchCenter.jsx)
- Replace the YouTube iframe (`dQw4w9WgXcQ`) with a styled "Highlights Coming Soon" placeholder card
- Keep the modal structure but show a branded message instead of an iframe
- Show match info (opponent, date) with a "Video highlights will be available after the match" message

---

### 1.2 Replace Fabricated Coaching Staff

#### [MODIFY] [coaches.js](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/data/coaches.js)
- Replace Gary Kirsten, Ricky Ponting, Wasim Akram, Jonty Rhodes with generic staff titles:
  - "Head Coach" — Name TBD, placeholder bio about coaching philosophy
  - "Batting Coach" — Name TBD
  - "Bowling Coach" — Name TBD
  - "Fielding & Conditioning Coach" — Name TBD
- Keep Unsplash images (they're generic enough) but update alt text to "Coaching Staff Placeholder"
- Add a note in the UI: "Official coaching staff announcements coming soon"

---

### 1.3 Remove Unauthorized Sponsor Names

#### [MODIFY] [SponsorReel.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/home/SponsorReel.jsx)
- Replace all sponsor names with generic partnership categories:
  - "Principal Sponsor" — "Your Brand Here"
  - "Energy Partner" — "Your Brand Here"
  - etc.
- OR: Replace the entire sponsor reel with a styled "Partnership Opportunities" CTA banner that links to a contact/inquiry section
- Fix "Bramhaputra" → remove entirely (it was misspelled "Brahmaputra")

---

### 1.4 Fix Deceptive Ticket Confirmation

#### [MODIFY] [TicketModal.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/shared/TicketModal.jsx)
- Change the confirmation screen:
  - Remove "Confirmation & e-tickets sent to your email"
  - Replace with: "🎟️ Ticket Booking Preview — Online booking is not yet available. Visit the ACA Stadium box office or check back soon for online ticket sales."
- Change the submit button from "Proceed To Secure Checkout" to "Preview Booking (Demo)"
- Add a subtle "DEMO" badge to the modal header

---

### 1.5 Fix Fan Poll Fake Player Names

#### [MODIFY] [PollCard.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/fanzone/PollCard.jsx)
- Replace "Vikram Singh (104 off 52)" → "Abinash Haloi (104 off 52)"
- Replace "Amit Kumar (4-18)" → "Khanindra Choudhury (4-18)"
- Replace "Tariq Ali (35* & 2-24)" → "Jintu Ahmed (35* & 2-24)"
- These are actual squad members from `players.js`

---

## Phase 2 — Functional Bug Fixes

---

### 2.1 Fix MatchCenter Tabs

#### [MODIFY] [MatchCenter.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/pages/MatchCenter.jsx)
- Wrap `<PointsTable />` inside `{activeTab === 'standings' && <PointsTable />}`
- Wrap fixtures + live dashboard + stats inside `{activeTab === 'all' && ...}`
- Both sections now toggle correctly based on tab selection

---

### 2.2 Fix FilterBar Dark-Mode Colors

#### [MODIFY] [FilterBar.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/squad/FilterBar.jsx)
- Change `text-primary` → `text-accent` for active filter (gold on dark = visible)
- Change `text-gray-400 hover:text-ink` → `text-gray-400 hover:text-white`
- Change `border-gray-200` → `border-white/10`

---

### 2.3 Add 404 Catch-All Route

#### [MODIFY] [App.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/App.jsx)
- Add `<Route path="*" element={<NotFound />} />` inside the Layout route
- Create a simple NotFound component with brand styling and a "Return Home" link

#### [NEW] [NotFound.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/pages/NotFound.jsx)
- Styled 404 page matching the dark maroon theme

---

### 2.4 Fix Dead Links

#### [MODIFY] [Footer.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/layout/Footer.jsx)
- Remove social links that point to `#`, replace with a "Social accounts coming soon" text
- Remove Privacy Policy / Terms links or mark as "Coming Soon"
- Remove or mark `info@hornbilltigers.com` as a placeholder

---

### 2.5 Fix Remaining Minor Bugs

#### [MODIFY] [LatestMatchCard.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/home/LatestMatchCard.jsx)
- Import fixtures from `fixtures.js` and derive the next upcoming fixture dynamically instead of hardcoding "KKR" and "Oct 22"
- Derive countdown target from fixture date

#### [MODIFY] [Merchandise.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/pages/Merchandise.jsx)
- Wire the sort dropdown `onChange` to actually sort `filteredProducts`

---

## Phase 3 — Performance

---

### 3.1 Add Code Splitting

#### [MODIFY] [App.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/App.jsx)
- Convert all page imports to `React.lazy()`:
  ```jsx
  const Home = lazy(() => import('./pages/Home'));
  const SquadRoster = lazy(() => import('./pages/SquadRoster'));
  // etc.
  ```
- Wrap `<Routes>` in `<Suspense fallback={<LoadingSpinner />}>`
- Create a branded loading spinner component

#### [NEW] [LoadingSpinner.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/shared/LoadingSpinner.jsx)
- Full-screen branded loading state with team logo pulse animation

---

### 3.2 Add Image Lazy Loading

#### [MODIFY] Multiple components
- Add `loading="lazy"` to all `<img>` tags in:
  - [PlayerCard.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/squad/PlayerCard.jsx)
  - [CoachCard.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/coaching/CoachCard.jsx)
  - [ProductCard.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/merchandise/ProductCard.jsx) (need to check)
  - [MilestoneCard.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/history/MilestoneCard.jsx) (need to check)
  - [DownloadCard.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/fanzone/DownloadCard.jsx)
  - [PlayerModal.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/squad/PlayerModal.jsx)
  - [TrophyCabinet.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/pages/TrophyCabinet.jsx)

---

### 3.3 Remove Dead Code & Unused Dependencies

#### [MODIFY] [App.css](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/App.css)
- Delete entire file — all 185 lines are Vite template boilerplate, unused

#### [DELETE] [assets/vite.svg](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/assets/vite.svg)
#### [DELETE] [assets/react.svg](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/assets/react.svg)

#### [MODIFY] [ScrollToTop.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/shared/ScrollToTop.jsx)
- Delete this component entirely — Layout.jsx already handles scroll-to-top

#### [MODIFY] [App.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/App.jsx)
- Remove `ScrollToTop` import and `<ScrollToTop />` usage

#### [MODIFY] [package.json](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/package.json)
- Remove `motion` from dependencies if confirmed unused after grep
- Remove `@types/react` and `@types/react-dom` from devDependencies (JS project, not TS)

---

## Phase 4 — SEO & Accessibility

---

### 4.1 Fix Open Graph & SEO

#### [MODIFY] [index.html](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/index.html)
- Change `og:image` and `twitter:image` from `/logo.png` to a placeholder absolute URL with a TODO comment: `<!-- TODO: Replace with absolute production URL -->`
- Add `og:url` meta tag
- Fix JSON-LD: add `url`, `logo`, `image` fields; change `SportsActivityLocation` → `StadiumOrArena`

#### [NEW] [public/robots.txt](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/public/robots.txt)
- Basic robots.txt allowing all crawlers

#### [MODIFY] [Layout.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/layout/Layout.jsx)
- Add dynamic canonical link updates alongside title/description updates

---

### 4.2 Modal Accessibility

#### [MODIFY] [TicketModal.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/shared/TicketModal.jsx)
- Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Add Escape key handler to close modal
- Add focus trap (trap focus within modal when open)
- Prevent background scroll when modal is open

#### [MODIFY] [PlayerModal.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/squad/PlayerModal.jsx)
- Same accessibility fixes as TicketModal

#### [MODIFY] [MatchCenter.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/pages/MatchCenter.jsx) (video modal)
- Same accessibility fixes

---

### 4.3 Reduced Motion Support

#### [MODIFY] [index.css](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/index.css)
- Add `@media (prefers-reduced-motion: reduce)` block:
  - Disable marquee animation
  - Disable fade-in animations
  - Disable hover transforms
  - Set `scroll-behavior: auto`

---

## Data Architecture Cleanup

#### [NEW] [sponsors.js](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/data/sponsors.js)
- Extract sponsor data from SponsorReel inline code

#### [NEW] [standings.js](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/data/standings.js)
- Extract points table data from PointsTable inline code

#### [MODIFY] [TicketModal.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/shared/TicketModal.jsx)
- Import fixture data from `fixtures.js` instead of hardcoding 3 matches inline

#### [MODIFY] [LatestMatchCard.jsx](file:///c:/Users/Hp/Desktop/ISCL%20website/assam%20website/react%20assam/src/components/home/LatestMatchCard.jsx)
- Import from `fixtures.js` and derive next fixture dynamically

---

## Verification Plan

### Automated Tests
```bash
cmd /c npm run build
```
- Must complete with zero errors

### Manual Verification
- Confirm no rickroll video appears
- Confirm coaching staff shows TBD names
- Confirm sponsor section shows generic placeholders
- Confirm ticket modal shows "Demo" labeling
- Confirm poll card shows real squad names
- Confirm MatchCenter tabs switch content
- Confirm 404 page renders for invalid routes
- Confirm FilterBar text is readable on dark background
- Confirm code splitting works (network tab shows lazy chunks)
- Confirm images below fold load lazily
