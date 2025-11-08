import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import BullHead from '../../assets/branding/bull-head.svg'
import BullCourier from '../../assets/branding/bull-courier.svg'

type Variant = 'head' | 'courier'
interface Props { variant?: Variant; size?: number; style?: ViewStyle }

export default function BrandLogo({ variant = 'head', size = 64, style }: Props) {
  const Svg = variant === 'head' ? BullHead : BullCourier
  return (
    <View style={[styles.wrap, { width: size, height: size }, style]}>
      <Svg width="100%" height="100%" />
    </View>
  )
}
const styles = StyleSheet.create({ wrap: { alignItems: 'center', justifyContent: 'center' } })