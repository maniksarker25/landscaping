/**
 * Centralized design tokens.
 *
 * These are the ONLY source of truth for color in the app. They are written
 * to CSS custom properties in `globals.css` and consumed everywhere via
 * Tailwind's `theme.extend.colors` (see `tailwind.config.ts`), which maps
 * each token to `hsl(var(--token) / <alpha-value>)`.
 *
 * To re-skin the entire site, change the values below (and mirror them in
 * globals.css) — never hardcode a hex/rgb value inside a component.
 *
 * Values are stored as raw HSL triples (no `hsl()` wrapper) so Tailwind can
 * apply opacity modifiers, e.g. `bg-primary/10`.
 */

export const theme = {
  colors: {
    primary: "174 61% 14%", // deep lagoon teal
    primaryForeground: "45 38% 92%",

    secondary: "168 24% 58%", // soft aqua
    secondaryForeground: "174 61% 10%",

    accent: "39 45% 47%", // muted brass
    accentForeground: "45 38% 96%",

    background: "44 33% 92%", // warm limestone
    foreground: "160 12% 12%", // charcoal ink

    muted: "42 22% 87%",
    mutedForeground: "160 8% 38%",

    card: "45 40% 97%",
    cardForeground: "160 12% 12%",

    border: "42 18% 80%",
    input: "42 18% 80%",
    ring: "174 61% 14%",

    destructive: "6 74% 45%",
    destructiveForeground: "45 38% 96%",

    success: "152 45% 32%",
    successForeground: "45 38% 96%",
  },
  radius: "0.625rem",
} as const;

export type ThemeColorToken = keyof typeof theme.colors;
