import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import BrandLogo from '@/src/components/BrandLogo';
import { colors, spacing, radius, typography } from '@/src/theme/tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 768;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Split-screen layout */}
      <View style={[styles.content, isSmallScreen && styles.contentColumn]}>
        {/* Left: Hero section with courier illustration */}
        <View style={[styles.heroSection, isSmallScreen && styles.heroSectionSmall]}>
          <View style={styles.heroContent}>
            <BrandLogo variant="courier" size={isSmallScreen ? 200 : 280} />
            
            {/* Circle CTA buttons */}
            <View style={styles.circleCTAContainer}>
              <TouchableOpacity 
                style={styles.circleCTA}
                onPress={() => router.push('/(tabs)/courier-dashboard')}
              >
                <Text style={styles.circleCTAText}>Futár</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.circleCTA}
                onPress={() => router.push('/(tabs)/create-package')}
              >
                <Text style={styles.circleCTAText}>Ügyfél</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Right: Actions section */}
        <View style={[styles.actionsSection, isSmallScreen && styles.actionsSectionSmall]}>
          <View style={styles.actionsContent}>
            <Text style={styles.headline}>Üdvözöl a BullBox!</Text>
            <Text style={styles.subheadline}>
              Válassz a gyors kézbesítés és csomagfeladás között
            </Text>

            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => router.push('/(tabs)/courier-dashboard')}
            >
              <Text style={styles.primaryButtonText}>Futárként belépek</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => router.push('/(tabs)/create-package')}
            >
              <Text style={styles.secondaryButtonText}>Ügyfélként feladok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  contentColumn: {
    flexDirection: 'column',
  },
  heroSection: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  heroSectionSmall: {
    flex: 0,
    paddingVertical: spacing.xxl,
  },
  heroContent: {
    alignItems: 'center',
    gap: spacing.xl,
  },
  circleCTAContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  circleCTA: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  circleCTAText: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
  },
  actionsSection: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  actionsSectionSmall: {
    flex: 1,
  },
  actionsContent: {
    width: '100%',
    maxWidth: 400,
    gap: spacing.lg,
  },
  headline: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subheadline: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  secondaryButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  secondaryButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
});
