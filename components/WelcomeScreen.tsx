import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

type Role = 'courier' | 'customer';

type Props = {
  onSelectRole: (role: Role) => void; // meghívódik, ha a user választ
  imageSource: any; // require(...)
  slogan?: string;
};

export default function WelcomeScreen({
  onSelectRole,
  imageSource,
  slogan = 'BullBox — Bikásan gyors csomagküldés',
}: Props) {
  const { width, height } = Dimensions.get('window');
  const isPortrait = height >= width;

  return (
    <View style={styles.full}>
      <ImageBackground source={imageSource} resizeMode="contain" style={styles.bg}>
        <View style={[styles.overlay, isPortrait ? styles.overlayPortrait : styles.overlayLandscape]}>
          <Text style={styles.title}>{slogan}</Text>

          <View style={styles.hintBox}>
            <Text style={styles.hintText}>Válaszd ki, hogy Futár vagy Ügyfél vagy — ez határozza meg a felületet.</Text>
          </View>

          <View style={styles.roleRow}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Futár választás"
              onPress={() => onSelectRole('courier')}
              activeOpacity={0.85}
              style={[styles.roleButton, styles.courierButton]}
            >
              <Text style={styles.roleLabel}>FUTÁR</Text>
              <Text style={styles.roleSub}>Azonnali futár nézet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Ügyfél választás"
              onPress={() => onSelectRole('customer')}
              activeOpacity={0.85}
              style={[styles.roleButton, styles.customerButton]}
            >
              <Text style={styles.roleLabel}>ÜGYFÉL</Text>
              <Text style={styles.roleSub}>Bika nézet, küldés és profil</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.controlsRow}>
            <Text style={styles.smallNote}>Kérlek válassz szerepet a folytatáshoz.</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  full: { flex: 1, backgroundColor: '#fff' },
  bg: { flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  overlayPortrait: { bottom: 60 },
  overlayLandscape: { bottom: 20 },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#B31515',
    marginBottom: 8,
    textAlign: 'center',
  },
  hintBox: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 14,
  },
  hintText: { color: '#333', fontSize: 14, textAlign: 'center' },
  roleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    width: 150,
    height: 120,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  courierButton: {
    backgroundColor: '#1E88E5',
    marginRight: 8,
  },
  customerButton: {
    backgroundColor: '#B31515',
    marginLeft: 8,
  },
  roleLabel: { color: '#fff', fontSize: 18, fontWeight: '900' },
  roleSub: { color: '#fff', fontSize: 12, marginTop: 6, textAlign: 'center' },
  controlsRow: { marginTop: 12, alignItems: 'center' },
  smallNote: { marginTop: 8, color: '#fff', fontSize: 12 },
});
