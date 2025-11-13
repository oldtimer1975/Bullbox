import React, { useEffect, useRef, useState } from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native'
import * as Haptics from 'expo-haptics'

export type Hotspot = {
  id: string
  label: string
  x: number
  y: number
  align?: 'top' | 'bottom' | 'left' | 'right'
}

type Props = {
  imageSource: ImageSourcePropType
  spots?: Hotspot[]
  debug?: boolean
  onSpotPress?: (id: string) => void
  containerStyle?: ImageStyle
  // DINAMIKUS marker méret: 'auto' = a konténer szélességből számol
  markerSize?: number | 'auto'
  showLabels?: boolean
  labelOffset?: number
  // Rugalmas méretezés
  containerWidth?: number | string      // '100%' vagy px
  containerMaxWidth?: number            // px plafon (weben)
  autoHideLabelsBelowWidth?: number     // e szélesség alatt elrejti a címkéket
}

export function BullHeadHotspots({
  imageSource,
  spots = [],
  debug = false,
  onSpotPress,
  containerStyle,
  markerSize = 'auto',
  showLabels = true,
  labelOffset = 8,
  containerWidth = '100%',
  containerMaxWidth = 900,
  autoHideLabelsBelowWidth = 460,
}: Props) {
  const [aspectRatio, setAspectRatio] = useState<number>(1)
  const [lastTap, setLastTap] = useState<{ x: number; y: number } | null>(null)
  const containerRef = useRef<View>(null)
  const [layoutSize, setLayoutSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 })

  // Kép arány meghatározás (require vagy uri)
  useEffect(() => {
    try {
      if (typeof imageSource === 'number') {
        const resolver = (Image as any).resolveAssetSource
        if (typeof resolver === 'function') {
          const { width, height } = resolver(imageSource)
          if (width && height) {
            setAspectRatio(width / height)
            return
          }
        }
      } else if (imageSource && typeof imageSource === 'object' && 'uri' in (imageSource as any)) {
        const uri = (imageSource as any).uri
        if (uri) {
          Image.getSize(
            uri,
            (w, h) => {
              if (w && h) setAspectRatio(w / h)
            },
            () => setAspectRatio(1)
          )
        }
      }
    } catch {
      setAspectRatio(1)
    }
  }, [imageSource])

  const handleLayout = (e: any) => {
    const { width, height } = e.nativeEvent.layout
    setLayoutSize({ w: width, h: height })
  }

  // Natív debug tap (iOS/Android)
  const handleDebugTapNative = (e: any) => {
    if (!debug) return
    const { locationX, locationY } = e.nativeEvent || {}
    const { w, h } = layoutSize
    if (typeof locationX === 'number' && typeof locationY === 'number' && w > 0 && h > 0) {
      const nx = +(locationX / w).toFixed(3)
      const ny = +(locationY / h).toFixed(3)
      setLastTap({ x: nx, y: ny })
      console.log(`tap@bull: x=${nx}, y=${ny}`)
    }
  }

  // Web debug tap – boundingRect alapján
  const handleDebugTapWeb = (e: any) => {
    if (!debug || Platform.OS !== 'web') return
    try {
      const node = containerRef.current as unknown as HTMLElement | null
      if (!node) return
      const rect = node.getBoundingClientRect?.()
      if (!rect) return
      const clientX = e?.nativeEvent?.clientX ?? e?.clientX
      const clientY = e?.nativeEvent?.clientY ?? e?.clientY
      if (typeof clientX !== 'number' || typeof clientY !== 'number') return
      const xIn = clientX - rect.left
      const yIn = clientY - rect.top
      if (rect.width > 0 && rect.height > 0) {
        const nx = +(xIn / rect.width).toFixed(3)
        const ny = +(yIn / rect.height).toFixed(3)
        setLastTap({ x: nx, y: ny })
        console.log(`tap@bull: x=${nx}, y=${ny}`)
      }
    } catch {}
  }

  // Címke pozíció az align szerint
  const labelStyleFor = (side: Hotspot['align'] | undefined, marker: number, offset: number) => {
    switch (side) {
      case 'left':
        return { marginLeft: -(marker / 2 + offset), transform: [{ translateX: -8 }] }
      case 'right':
        return { marginLeft: marker / 2 + offset }
      case 'top':
        return { marginTop: -(marker / 2 + offset) }
      case 'bottom':
      default:
        return { marginTop: marker / 2 + offset }
    }
  }

  const containerDimStyle =
    typeof containerWidth === 'string'
      ? { width: containerWidth as string }
      : { width: containerWidth as number }

  // Dinamikus marker méret (szélesség ~12%-a), korlátokkal
  const dynamicMarker = (() => {
    const w = layoutSize.w || 0
    if (markerSize === 'auto') {
      const px = w * 0.12 // 12% a konténer szélességéből
      return Math.max(40, Math.min(px, 88)) // min 40, max 88
    }
    return markerSize
  })()

  const effectiveShowLabels = showLabels && layoutSize.w >= autoHideLabelsBelowWidth

  return (
    <View
      style={[
        styles.wrapper,
        containerStyle,
        containerDimStyle,
        { maxWidth: containerMaxWidth },
      ]}
    >
      <View
        ref={containerRef as any}
        style={{ width: '100%', aspectRatio, position: 'relative' }}
        onLayout={handleLayout}
        {...(Platform.OS === 'web'
          ? {
              onMouseDown: handleDebugTapWeb,
              style: {
                width: '100%',
                aspectRatio,
                position: 'relative',
                cursor: debug ? 'crosshair' : 'default',
              } as any,
            }
          : {})}
      >
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="contain"
          onLoad={(evt) => {
            if (Platform.OS === 'web' && aspectRatio === 1) {
              try {
                const { naturalWidth, naturalHeight } = (evt?.nativeEvent?.target as any) || {}
                if (naturalWidth && naturalHeight) {
                  setAspectRatio(naturalWidth / naturalHeight)
                }
              } catch {}
            }
          }}
        />

        {debug && Platform.OS !== 'web' && (
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleDebugTapNative}
            android_ripple={{ color: 'transparent' }}
          />
        )}

        {(spots ?? []).map((s) => {
          const leftPct = `${s.x * 100}%`
          const topPct = `${s.y * 100}%`

          const markerPos = {
            width: dynamicMarker,
            height: dynamicMarker,
            left: leftPct,
            top: topPct,
            marginLeft: -dynamicMarker / 2,
            marginTop: -dynamicMarker / 2,
          } as const

          const baseLabelPos = {
            left: leftPct,
            top: topPct,
          } as const

          return (
            <React.Fragment key={s.id}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={s.label}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})
                  onSpotPress?.(s.id)
                }}
                hitSlop={14}
                style={({ pressed }) => [
                  styles.marker,
                  markerPos,
                  pressed && { transform: [{ scale: 0.9 }] },
                ]}
              >
                <View style={styles.dot} />
              </Pressable>

              {effectiveShowLabels && (
                <View
                  style={[
                    styles.label,
                    { pointerEvents: 'none' } as any,
                    baseLabelPos,
                    labelStyleFor(s.align, dynamicMarker, labelOffset),
                  ]}
                >
                  <Text style={styles.labelText}>{s.label}</Text>
                </View>
              )}
            </React.Fragment>
          )
        })}

        {debug && lastTap && (
          <View style={styles.debugPanel}>
            <Text style={styles.debugText}>{`x=${lastTap.x}  y=${lastTap.y}`}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { alignSelf: 'center' },
  image: { position: 'absolute', inset: 0, width: '100%', height: '100%' },
  marker: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#E10600',
    borderWidth: 3,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  dot: { width: 12, height: 12, borderRadius: 999, backgroundColor: '#fff' },
  label: {
    position: 'absolute',
    backgroundColor: 'rgba(2,6,23,0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.18)',
    maxWidth: 160,
  },
  labelText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    flexWrap: 'wrap',
  },
  debugPanel: {
    position: 'absolute',
    left: 8,
    top: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(2,6,23,0.7)',
    borderRadius: 6,
  },
  debugText: { color: '#E2E8F0', fontSize: 12 },
})
