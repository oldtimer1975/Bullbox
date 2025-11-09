import React from 'react'
import { View, StyleSheet, Text, Pressable, Image, Dimensions } from 'react-native'
import { router } from 'expo-router'

const BG = require('../../assets/branding/bull-courier.png')

// Képernyő méretek
const { width: screenW, height: screenH } = Dimensions.get('window')

// Kerék gomb méret: szélesség arány + felső limit
const wheelSize = Math.max(108, Math.min(170, Math.floor(screenW * 0.24)))

// POZÍCIÓ FINOMHANGOLÁS (százalékban) – ha elcsúszott, mondd mennyit állítsunk
const leftWheel = { xPct: 30, yPct: 73 }    // Futár
const rightWheel = { xPct: 70, yPct: 73 }   // Ügyfél

// A kép skálázása: a magasság ne menjen a teljes képernyő fölé
// A “cover” helyett használunk dinamikus szélességet és contain-t
export default function HomeFullScreen() {
  const goCourier = () => router.push('/courier-dashboard')
  const goCustomer = () => router.push('/create-package') // Ügyfél gomb célja

  return (
    <View style={styles.root}>

      {/* Kép keret – így nem lesz túl nagy, és megtartja az arányt */}
      <View style={styles.heroWrapper}>
        <Image
          source={BG}
            // Ha túlnyúlik, maxHeight korlátozza
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      {/* Futár kerék */}
      <Pressable
        onPress={goCourier}
        style={({ pressed }) => [
          styles.wheel,
          wheelPos(leftWheel.xPct, leftWheel.yPct),
          {
            width: wheelSize,
            height: wheelSize,
            backgroundColor: '#2563EB',
            opacity: pressed ? 0.85 : 1
          }
        ]}
      >
        <Text style={styles.wheelText}>Futár</Text>
      </Pressable>

      {/* Ügyfél kerék */}
      <Pressable
        onPress={goCustomer}
        style={({ pressed }) => [
          styles.wheel,
          wheelPos(rightWheel.xPct, rightWheel.yPct),
          {
            width: wheelSize,
            height: wheelSize,
            backgroundColor: '#E10600',
            opacity: pressed ? 0.85 : 1
          }
        ]}
      >
        <Text style={styles.wheelText}>Ügyfél</Text>
      </Pressable>
    </View>
  )
}

function wheelPos(xPct: number, yPct: number) {
  return {
    position: 'absolute',
    left: (xPct / 100) * screenW - wheelSize / 2,
    top: (yPct / 100) * screenH - wheelSize / 2
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0F172A'
  },
  heroWrapper: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  heroImage: {
    width: screenW * 0.92,
    maxHeight: screenH * 0.92
  },
  wheel: {
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10
  },
  wheelText: {
    color: '#F8FAFC',
    fontWeight: '800',
    letterSpacing: 0.6,
    fontSize: 18,
    textTransform: 'uppercase'
  }
})
