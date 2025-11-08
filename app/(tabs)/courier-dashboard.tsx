import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  Platform,
  RefreshControl,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import BrandLogo from '@/src/components/BrandLogo';
import { colors, spacing, radius, typography } from '@/src/theme/tokens';
import { fetchCourierMetrics, trafficLevel, CourierMetrics } from '@/src/services/metrics';

export default function CourierDashboard() {
  const [metrics, setMetrics] = useState<CourierMetrics | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushPermissionDenied, setPushPermissionDenied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Load metrics on mount
  useEffect(() => {
    loadMetrics();
    checkPushPermissions();
  }, []);

  async function loadMetrics() {
    try {
      const data = await fetchCourierMetrics();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to load metrics:', error);
    }
  }

  async function checkPushPermissions() {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      setPushPermissionDenied(status === 'denied');
      setPushEnabled(status === 'granted');
    } catch (error) {
      console.error('Failed to check push permissions:', error);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadMetrics();
    setRefreshing(false);
  }

  function handleOnlineToggle(value: boolean) {
    setIsOnline(value);
    if (value && !pushEnabled && !pushPermissionDenied) {
      Alert.alert(
        'Push értesítések',
        'Kapcsold be a push értesítéseket, hogy ne maradj le a megrendelésekről!'
      );
    }
  }

  async function handlePushToggle(value: boolean) {
    if (value && pushPermissionDenied) {
      Alert.alert(
        'Engedély megtagadva',
        'A push értesítések engedélyezve vannak a beállításokban. Kérlek, engedélyezd őket az eszköz beállításaiban.'
      );
      return;
    }

    if (value) {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
          setPushEnabled(true);
          setPushPermissionDenied(false);
        } else {
          setPushPermissionDenied(true);
        }
      } catch (error) {
        console.error('Failed to request push permissions:', error);
      }
    } else {
      setPushEnabled(false);
    }
  }

  const traffic = metrics
    ? trafficLevel(metrics.activeOrders, metrics.activeCouriers)
    : 'NORMAL';

  const trafficColors = {
    LOW: colors.success,
    NORMAL: colors.warning,
    HIGH: colors.error,
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {/* Hero section */}
      <View style={styles.heroSection}>
        <BrandLogo variant="courier" size={180} />
        <Text style={styles.heroTitle}>Futár Irányítópult</Text>
      </View>

      {/* Metrics cards */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>
            {metrics?.activeOrders ?? '—'}
          </Text>
          <Text style={styles.metricLabel}>Aktív megrendelések</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>
            {metrics?.activeCouriers ?? '—'}
          </Text>
          <Text style={styles.metricLabel}>Aktív futárok</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: trafficColors[traffic] + '20' }]}>
          <Text style={[styles.metricValue, { color: trafficColors[traffic] }]}>
            {traffic}
          </Text>
          <Text style={styles.metricLabel}>Forgalom</Text>
        </View>
      </View>

      {/* Toggles section */}
      <View style={styles.togglesContainer}>
        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleLabel}>
              Online státusz
            </Text>
            <Text style={styles.toggleDescription}>
              {isOnline ? 'Megrendeléseket fogadsz' : 'Nem fogadsz megrendeléseket'}
            </Text>
          </View>
          <Switch
            value={isOnline}
            onValueChange={handleOnlineToggle}
            trackColor={{ false: colors.gray, true: colors.success }}
            thumbColor={colors.white}
          />
        </View>

        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleLabel}>
              Push értesítések
            </Text>
            <Text style={styles.toggleDescription}>
              {pushEnabled ? 'Értesítések bekapcsolva' : 'Értesítések kikapcsolva'}
            </Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={handlePushToggle}
            trackColor={{ false: colors.gray, true: colors.accent }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      {/* Warning messages */}
      {pushPermissionDenied && (
        <View style={[styles.warning, { backgroundColor: colors.error + '20' }]}>
          <Text style={[styles.warningText, { color: colors.error }]}>
            ⚠️ Push értesítések engedélye megtagadva. Engedélyezd őket a beállításokban.
          </Text>
        </View>
      )}

      {isOnline && !pushEnabled && !pushPermissionDenied && (
        <View style={[styles.warning, { backgroundColor: colors.warning + '20' }]}>
          <Text style={[styles.warningText, { color: colors.warning }]}>
            ⚠️ Online vagy, de a push értesítések ki vannak kapcsolva. Kapcsold be őket, hogy ne maradj le a megrendelésekről!
          </Text>
        </View>
      )}

      {/* Last updated */}
      {metrics && (
        <Text style={styles.lastUpdated}>
          Utoljára frissítve: {metrics.lastUpdated.toLocaleTimeString('hu-HU')}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  heroTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  metricValue: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  metricLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  togglesContainer: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  toggleInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  toggleLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  toggleDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  warning: {
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
  },
  warningText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
