import React from 'react'
import { ScrollView, View, Alert, useWindowDimensions, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { BullHeadHotspots } from '../../components/BullHeadHotspots'
import { BULL_IMAGE, BULL_SPOTS, SPOT_TO_ROUTE } from '../../constants/bull-spots'

export default function HomeScreen() {
  const router = useRouter()
  const { width } = useWindowDimensions()

  // Konténer szélesség: 90% viewport, plafon nagy kijelzőn
  const maxW = Math.min(width * 0.9, Platform.OS === 'web' ? 900 : 420)

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ gap: 24 }}>
        <BullHeadHotspots
          imageSource={BULL_IMAGE}
          spots={BULL_SPOTS}
          debug={false}
          showLabels={true}              // automatikusan elrejti szűk szélességnél
          markerSize="auto"              // dinamikus gombméret
          containerWidth={maxW}          // rugalmas szélesség
          containerMaxWidth={900}        // weben plafon
          autoHideLabelsBelowWidth={500} // 500px alatt rejtse a címkéket
          onSpotPress={(id) => {
            const route = SPOT_TO_ROUTE[id]
            if (route) {
              router.push(route as any)
            } else {
              Alert.alert('Info', `Nincs útvonal hozzárendelve ehhez: ${id}`)
            }
          }}
        />
      </View>
    </ScrollView>
  )
}
