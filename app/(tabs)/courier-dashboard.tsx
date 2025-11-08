import React, { useEffect, useState, useCallback, useRef } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchCourierMetrics, trafficLevel, CourierMetrics } from '../../src/services/metrics'
import { colors, space, radius } from '../../src/theme/tokens'

export default function CourierDashboard() {
  const [metrics, setMetrics] = useState<CourierMetrics | null>(null)
  const [courierOnline, setCourierOnline] = useState(false)
  const [pushEnabled, setPushEnabled] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<'unknown' | 'granted' | 'denied'>('unknown')
  const pollRef = useRef<NodeJS.Timeout | null>(null)

  const load = useCallback(async () => {
    const m = await fetchCourierMetrics()
    setMetrics(m)
  }, [])

  useEffect(() => {
    if (courierOnline) {
      load()
      pollRef.current && clearInterval(pollRef.current)
      pollRef.current = setInterval(load, 8000)
    } else {
      pollRef.current && clearInterval(pollRef.current)
    }
    return () => { pollRef.current && clearInterval(pollRef.current) }
  }, [courierOnline, load])

  const toggleOnline = () => setCourierOnline(o => !o)

  const togglePush = async () => {
    try {
      if (!pushEnabled) {
        const Notifications = await import('expo-notifications')
        const settings = await Notifications.getPermissionsAsync()
        let finalStatus = settings.status
        if (settings.status !== 'granted') {
          const req = await Notifications.requestPermissionsAsync()
          finalStatus = req.status
        }
        if (finalStatus !== 'granted') { setPermissionStatus('denied'); return }
        setPermissionStatus('granted')
        // const token = await Notifications.getExpoPushTokenAsync(); console.log('Push token', token.data)
        setPushEnabled(true)
      } else {
        setPushEnabled(false)
      }
    } catch (e) {
      console.warn('Push toggle failed or expo-notifications not installed:', e)
      setPermissionStatus('denied')
      setPushEnabled(false)
    }
  }

  const level = metrics ? trafficLevel(metrics) : null

  return (
    <SafeAreaView style={[styles.page, { backgroundColor: colors.bg.base }]}>
      <View style={styles.scrollArea}>
        <View style={styles.hero}>
          {/* PNG fallback: place assets/branding/bull-courier.png to use Image; else keep a placeholder box */}
          <Image source={require('../../assets/branding/bull-courier.png')} style={styles.heroImage} resizeMode="contain" />
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>Futár Panel</Text>
            <Text style={styles.heroSubtitle}>{courierOnline ? 'ONLINE – figyelem a rendeléseket' : 'OFFLINE – nem kapsz új értesítést'}</Text>
          </View>
        </View>
        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Aktív rendelések</Text>
            <Text style={styles.cardValue}>{metrics?.activeOrders ?? '—'}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Aktív futárok</Text>
            <Text style={styles.cardValue}>{metrics?.activeCouriers ?? '—'}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Forgalom</Text>
            <Text style={[styles.cardValue, { color: level?.color || colors.fg.primary }]}>{level?.label ?? '—'}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <ToggleButton active={courierOnline} onPress={toggleOnline} activeLabel="Online" inactiveLabel="Offline" colorOn="#22C55E" colorOff={colors.border.subtle} />
          <ToggleButton active={pushEnabled} onPress={togglePush} activeLabel="Push ON" inactiveLabel="Push OFF" colorOn={colors.brand.accent} colorOff={colors.border.subtle} />
        </View>
        {permissionStatus === 'denied' && (<Text style={styles.warning}>Push engedély megtagadva – engedélyezd a rendszer beállításokban.</Text>)}
        {courierOnline && !pushEnabled && (<Text style={styles.warning}>Online vagy, de a push ki van kapcsolva – nem értesülhetsz új rendelésekről.</Text>)}
        <View style={styles.footerInfo}>
          <Text style={styles.meta}>Utolsó frissítés: {metrics ? metrics.updatedAt.toLocaleTimeString() : '—'}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

function ToggleButton({ active, onPress, activeLabel, inactiveLabel, colorOn, colorOff }: { active: boolean; onPress: () => void; activeLabel: string; inactiveLabel: string; colorOn: string; colorOff: string }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ paddingVertical: 14, paddingHorizontal: 22, borderRadius: radius.md, backgroundColor: active ? colorOn : colorOff, opacity: pressed ? 0.85 : 1, minWidth: 140, alignItems: 'center' }] }>
      <Text style={{ color: '#F8FAFC', fontWeight: '700' }}>{active ? activeLabel : inactiveLabel}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  scrollArea: { flex: 1, padding: space.lg, gap: space.lg },
  hero: { flexDirection: 'row', gap: space.lg, alignItems: 'center', backgroundColor: colors.bg.elev, padding: space.md, borderRadius: radius.lg },
  heroImage: { width: 140, height: 140 },
  heroTextWrap: { flex: 1 },
  heroTitle: { color: colors.fg.primary, fontSize: 24, fontWeight: '800' },
  heroSubtitle: { color: colors.fg.muted, fontSize: 13, marginTop: 4 },
  cardsRow: { flexDirection: 'row', gap: space.md, flexWrap: 'wrap' },
  card: { flexGrow: 1, minWidth: 120, backgroundColor: colors.bg.elev, padding: space.md, borderRadius: radius.md, gap: 4 },
  cardLabel: { color: colors.fg.muted, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  cardValue: { color: colors.fg.primary, fontSize: 20, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: space.md, flexWrap: 'wrap' },
  warning: { color: '#F59E0B', fontSize: 12, marginTop: 4 },
  footerInfo: { marginTop: space.lg },
  meta: { color: colors.fg.muted, fontSize: 12 }
})