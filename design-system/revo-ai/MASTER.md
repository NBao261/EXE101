# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Revo AI
**Generated:** 2026-03-18 23:55:00
**Category:** Modern EdTech Platform

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#2563EB` | `--color-brand` |
| Secondary | `#60A5FA` | `--color-secondary` |
| CTA/Accent | `#F97316` | `--color-cta` |
| Background | `#F8FAFC` | `--color-background` |
| Text | `#0F172A` | `--color-text` |

**Color Notes:** Vibrant blues, soft backgrounds, and high-energy accents.

### Typography

- **Primary Font:** Be Vietnam Pro
- **Secondary Font:** Inter
- **Mood:** friendly, clean, modern, trustworthy, educational
- **Google Fonts:** [Be Vietnam Pro + Inter](https://fonts.google.com/share?selection.family=Be+Vietnam+Pro:wght@100;400;700;900|Inter:wght@400;700)

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `6px` | Tight gaps |
| `--space-sm` | `12px` | Icon gaps |
| `--space-md` | `24px` | Standard padding |
| `--space-lg` | `36px` | Section padding |
| `--space-xl` | `48px` | Large gaps |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-md` | `0 4px 20px -5px rgba(0,0,0,0.05)` | Cards, buttons |
| `--shadow-lg` | `0 10px 40px -10px rgba(0,0,0,0.08)` | Modals, dropdowns |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: var(--color-brand);
  color: white;
  padding: 12px 28px;
  border-radius: 10px;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.2);
}

/* CTA Button */
.btn-cta {
  background: var(--color-cta);
  color: white;
  padding: 12px 28px;
  border-radius: 10px;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.2);
}
```

### Cards

```css
.card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #F1F5F9;
  box-shadow: var(--shadow-md);
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: #E2E8F0;
}
```

---

## Style Guidelines

**Style:** Modern EdTech

**Keywords:** Friendly, clean, whitespace-heavy, rounded, intuitive, accessible

**Best For:** Learning management systems, educational tools, student dashboards

### Page Pattern

**Pattern Name:** Clean Focus

- **CTA Placement:** Primary actions clearly highlighted
- **Section Order:** Context > Main Activity > Insights

---

## Anti-Patterns (Do NOT Use)

- ❌ Ornate design
- ❌ No filtering

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
