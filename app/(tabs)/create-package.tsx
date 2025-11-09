import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, LayoutChangeEvent, Platform } from 'react-native'
import { router, useNavigation } from 'expo-router'
import BrandLogo from '../../src/components/BrandLogo'

const HEAD = require('../../assets/branding/bull-head.png')

// Hotspot: 0..1 arányos koordináták (x,y), és sugár (r) a min(képSzélesség,képMagasság) arányában
type Spot = {
  key: string
  label: string
  route: string
  x: number
  y: number
  r: number
}

// Alap (finomhangolható) pontok – írd meg, ha valamelyik mennyit mozduljon (pl. mouth y 0.78 -> 0.75)
const SPOTS: Spot[] = [
  { key: 'mouth', label: 'Száj → Csomag indítás',   route: '/create-package-form', x: 0.50, y: 0.78, r: 0.12 },
  { key: 'nose',  label: 'Orr → Árkalkuláció',      route: '/pricing',             x: 0.50, y: 0.60, r: 0.10 },
  { key: 'earL',  label: 'Bal fül → Értesítések',   route: '/notifications',       x: 0.25, y: 0.26, r: 0.10 },
  { key: 'earR',  label: 'Jobb fül → Értesítések',  route: '/notifications',       x: 0.75, y: 0.26, r: 0.10 },
  { key: 'eyeL',  label: 'Bal szem → Követés',      route: '/tracking',            x: 0.40, y: 0.43, r: 0.08 },
  { key: 'eyeR',  label: 'Jobb szem → Követés',     route: '/tracking',            x: 0.60, y: 0.43, r: 0.08 },
]

export default function CreatePackageInteractive() {
  const navigation = useNavigation()
  useEffect(() => {
    // @ts-ignore
    navigation.setOptions?.({
      headerShown: true,
      headerTitle: () => <BrandLogo variant="head" size={40} accessibilityLabel="BullBox" />,
      headerStyle: { backgroundColor: '#0F172A' },
      headerTintColor: '#F8FAFC',
    })
  }, [navigation])

  // A ténylegesen megjelenített kép kerete (x,y,width,height) – ehhez igazítjuk a hotspotokat
  const [imgBox, setImgBox] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const onImageLayout = (e: LayoutChangeEvent) => {
    const { x, y, width, height } = e.nativeEvent.layout
    setImgBox({ x, y, width, height })
  }

  // Tooltip (mobilon nyomásra 1.2s-ig jelenik meg)
  const [hint, setHint] = useState<{ text: string; x: number; y: number } | null>(null)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const showHint = (text: string, x: number, y: number) => {
    if (hintTimer.current) clearTimeout(hintTimer.current)
    setHint({ text, x, y })
    hintTimer.current = setTimeout(() => setHint(null), 1200)
  }

  const go = (route: string) => router.push(route)

  return (
    <View style={styles.root}>
      {/* Kép: contain, arány megőrzés, max ~96% a rendelkezésre állóból */}
      <View style={styles.heroWrapper}>
        <Image
          source={HEAD}
          style={styles.hero}
          resizeMode="contain"
          onLayout={onImageLayout}
        />
      </View>

      {/* Hotspot overlay — abszolút a teljes képernyőn, de a pozíciókat az imgBox-hoz számoljuk */}
      <View pointerEvents="box-none" style={styles.overlay}>
        {imgBox.width > 0 && imgBox.height > 0 && SPOTS.map((s) => {
          const cx = imgBox.x + s.x * imgBox.width
          const cy = imgBox.y + s.y * imgBox.height
          const rPx = Math.min(imgBox.width, imgBox.height) * s.r
          const left = cx - rPx
          const top = cy - rPx
          return (
            <Pressable
              key={s.key}
              onPressIn={() => showHint(s.label, cx, cy)}
              onPress={() => go(s.route)}
              hitSlop={16}
              android_ripple={{ color: 'rgba(37,99,235,0.15)', borderless: false }}
              style={({ pressed }) => [
                styles.spot,
                {
                  left, top, width: rPx * 2, height: rPx * 2,
                  borderColor: pressed ? 'rgba(37,99,235,0.6)' : 'rgba(255,255,255,0.12)',
                  backgroundColor: pressed ? 'rgba(37,99,235,0.08)' : 'transparent',
                }
              ]}
              accessibilityLabel={s.label}
            />
          )
        })}
      </View>

      {/* Tooltip mobilon/desktopon — rövid időre felvillan */}
      {hint && (
        <View pointerEvents="none" style={[styles.hint, { left: hint.x + 10, top: hint.y + 10 }]}>
          <Text style={styles.hintText}>{hint.text}</Text>
        </View>
      )}
    </View>
  )
}

const colors = {
  bg: '#0F172A',
  elev: '#111827',
  fg: '#F8FAFC',
  muted: '#94A3B8',
  accent: '#2563EB',
  primary: '#E10600',
  border: '#1F2937',
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  heroWrapper: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  hero: {
    width: '96%',
    height: '96%',
    maxWidth: '96%',
    maxHeight: '96%',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
  },
  spot: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
  },
  hint: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.72)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  hintText: { color: colors.fg, fontWeight: '700', fontSize: 12, letterSpacing: 0.2 },
})
