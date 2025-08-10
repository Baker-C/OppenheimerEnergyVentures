# Oppenheimer Energy Ventures — Project Requirements Document

## 1. Overview
A minimalist, professional two-page website for Oppenheimer Energy Ventures.

**Goals:**
- Communicate the organization’s mission visually and textually.
- Provide easy access to informational materials and team/advisors.
- Maintain a clean, accessible, and fast-loading design.

---

## 2. Pages & Structure

### 2.1 Home Page (`/`)
**Features:**
- Full-width autoplay video (muted, looped, inline on mobile) as a non-interactive background.
- Centered paragraph description below the video.
- Top-right navigation (Home, Information).

### 2.2 Information Page (`/information`)
**Sections:**
1. **Materials**
   - Column list of downloadable items.
   - Left-aligned name, right-aligned download button.
   - Top & bottom borders for each row.
2. **Advisors**
   - Simple list or compact cards of advisors.
3. **Team**
   - Simple list or compact cards with name, role, and optional bio.

---

## 3. Navigation
- Top-right on all pages.
- Links: Home → `/`, Information → `/information`.
- Simple hover/focus states.

---

## 4. Accessibility & Performance
- WCAG AA contrast.
- Keyboard navigable.
- Autoplay video is muted, decorative, and `aria-hidden`.
- Compressed video with poster fallback.
- Static rendering; Lighthouse ≥ 90 desktop.

---

## 5. Project File Outline

### Root Files
- `package.json` — Project dependencies and scripts.
- `tailwind.config.ts` — Tailwind configuration.
- `postcss.config.mjs` — PostCSS configuration.

### `/app`
- `layout.tsx` — Root layout with navigation.
- `globals.css` — Tailwind base and global styles.
- `/page.tsx` — Home page with hero video and paragraph.
- `/information/page.tsx` — Information page with Materials, Advisors, Team sections.

### `/components`
- `Nav.tsx` — Top navigation links.
- `HeroVideo.tsx` — Full-width, autoplay, non-interactive video.
- `Container.tsx` — Max-width wrapper with padding.
- `Section.tsx` — Reusable section component with heading.
- `MaterialRow.tsx` — Row layout for materials list.
- `PeopleList.tsx` — List layout for advisors and team.

### `/data`
- `materials.json` — Array of downloadable material items.
- `advisors.json` — Array of advisor profiles.
- `team.json` — Array of team member profiles.

### `/public`
- `/video/hero.mp4` — Hero video file.
- `/video/hero-poster.jpg` — Poster image for the hero video.
- `/downloads/*` — Files for materials section.

---

## 6. Acceptance Criteria

**Home:**
- Video plays automatically without interaction.
- Video has no controls, no focus, no pointer interaction.
- Description centered and readable.

**Information:**
- Materials list has correct left/right alignment and borders.
- Advisors list appears above Team section.
- All text content is responsive and accessible.

**Global:**
- Navigation works across all screen sizes.
- No console errors; HTML validates.
