import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import BullHeadSvg from '@/assets/branding/bull-head.svg';
import BullCourierSvg from '@/assets/branding/bull-courier.svg';

export type BrandLogoVariant = 'head' | 'courier';

export interface BrandLogoProps {
  /**
   * Variant of the logo to display
   * - 'head': Bull head mark (for favicon, app icon, small spaces)
   * - 'courier': Full courier illustration (for hero sections, splash)
   */
  variant?: BrandLogoVariant;
  
  /**
   * Width of the logo in pixels
   */
  width?: number;
  
  /**
   * Height of the logo in pixels
   */
  height?: number;
  
  /**
   * Additional styles for the container
   */
  style?: ViewStyle;
}

/**
 * BrandLogo - Reusable component for displaying Bullbox branding assets
 * 
 * Usage:
 * ```tsx
 * // Small logo in header
 * <BrandLogo variant="head" width={40} height={50} />
 * 
 * // Large hero illustration
 * <BrandLogo variant="courier" width={300} height={300} />
 * ```
 */
export function BrandLogo({
  variant = 'head',
  width,
  height,
  style,
}: BrandLogoProps) {
  const Logo = variant === 'head' ? BullHeadSvg : BullCourierSvg;
  
  // Default dimensions based on variant
  const defaultWidth = variant === 'head' ? 80 : 200;
  const defaultHeight = variant === 'head' ? 100 : 200;
  
  return (
    <View style={[styles.container, style]}>
      <Logo 
        width={width ?? defaultWidth} 
        height={height ?? defaultHeight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
