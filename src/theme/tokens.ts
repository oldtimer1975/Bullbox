/**
 * BullBox Design Tokens
 * Brand colors, spacing, and styling constants
 */

export const colors = {
  // Brand palette
  background: '#0F172A',      // Dark slate background
  primary: '#E10600',         // Red primary color
  accent: '#2563EB',          // Blue accent color
  
  // Neutrals
  white: '#FFFFFF',
  lightGray: '#F8FAFC',
  gray: '#64748B',
  darkGray: '#334155',
  
  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Text colors
  text: {
    primary: '#0F172A',
    secondary: '#64748B',
    inverse: '#FFFFFF',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999, // Fully rounded (circles, pills)
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 32,
    hero: 48,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};
