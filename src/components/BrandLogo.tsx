import React from 'react';
import { View, StyleSheet } from 'react-native';
import BullHeadSvg from '@/assets/branding/bull-head.svg';
import BullCourierSvg from '@/assets/branding/bull-courier.svg';

interface BrandLogoProps {
  variant: 'head' | 'courier';
  size?: number;
}

/**
 * BrandLogo component
 * Renders the bull head or courier illustration SVG
 */
export default function BrandLogo({ variant, size = 120 }: BrandLogoProps) {
  const SvgComponent = variant === 'head' ? BullHeadSvg : BullCourierSvg;
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <SvgComponent width={size} height={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
