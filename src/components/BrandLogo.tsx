import React from 'react'
import { View, StyleSheet, ViewStyle, Image, ImageStyle, AccessibilityProps } from 'react-native'

type Variant = 'head' | 'courier'

type Props = {
  variant?: Variant
  size?: number
  style?: ViewStyle
  imageStyle?: ImageStyle
  accessibilityLabel?: AccessibilityProps['accessibilityLabel']
}

export default function BrandLogo({
  variant = 'head',
  size = 48,
  style,
  imageStyle,
  accessibilityLabel,
}: Props) {
  const source =
    variant === 'head'
      ? require('../../assets/branding/bull-head.png')
      : require('../../assets/branding/bull-courier.png')

  return (
    <View style={[styles.wrap, { width: size, height: size }, style]}>
      <Image
        source={source}
        style={[{ width: size, height: size }, imageStyle]}
        resizeMode="contain"
        accessibilityLabel={accessibilityLabel ?? (variant === 'head' ? 'BullBox brand head' : 'BullBox courier bull')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
})
