import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  ActivityIndicator, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CreatePackageScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddPackage = async () => {
    if (!title || !destination || !date) {
      Alert.alert('Hiányzó adat', 'Tölts ki minden mezőt! 🚀 A bika nem hagy cserben 😉');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'packages'), {
        title,
        destination,
        date,
        details,
        createdAt: new Date(),
        status: 'feladva'
      });
      Alert.alert('Siker!', 'Csomagod szárnyakat kapott! 🐂💨');
      setTitle('');
      setDestination('');
      setDate('');
      setDetails('');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Hiba!', 'A bika megakadt, próbáld újra! 😅');
    }
    setLoading(false);
  };

  const PromoBanner = () => (
    <View style={styles.promoBanner}>
      {/* Ha van saját bika vagy Red Bull logód, cseréld ki az Image sort */}
      <Text style={styles.bullIcon}>🐂</Text>
      <Text style={styles.promoText}>
        <Text style={{ color: '#d32e2e', fontWeight: 'bold' }}>Red Bull</Text> szárnyakat ad a csomagodnak!
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#e3ecf8' }} // halvány kékszürke háttér
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <PromoBanner />
        <Text style={styles.title}>Csomagfeladás 🚀</Text>
        <Text style={styles.subtitle}>
          Add fel a csomagod és engedd, hogy a bika szárnyakat adjon neki!
        </Text>
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="package-variant-closed" size={36} color="#f7d000" />
          <TextInput
            style={styles.input}
            placeholder="Mi a csomag? (pl. Red Bull 4-pack)"
            value={title}
            onChangeText={setTitle}
            autoCapitalize="sentences"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="map-marker" size={36} color="#0051a8" />
          <TextInput
            style={styles.input}
            placeholder="Hova repüljön? (város/cím)"
            value={destination}
            onChangeText={setDestination}
            autoCapitalize="sentences"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="calendar" size={36} color="#d32e2e" />
          <TextInput
            style={styles.input}
            placeholder="Mikorra érjen oda? (pl. 2025-07-20)"
            value={date}
            onChangeText={setDate}
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="message-text" size={36} color="#f7d000" />
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Extra info a futárnak? (opcionális)"
            value={details}
            onChangeText={setDetails}
            multiline
            placeholderTextColor="#aaa"
          />
        </View>
        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: '#bbb' }]}
          onPress={handleAddPackage}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Szárnyakat adok a csomagnak!</Text>
          )}
        </TouchableOpacity>
        <View style={styles.funFooter}>
          <Text style={styles.funText}>
            Powered by <Text style={{ color: '#0051a8', fontWeight: 'bold' }}>Red Bull</Text> & <Text style={{ color: '#222c5c', fontWeight: 'bold' }}>Revolut</Text> – pénzed és csomagod is repülni fog!
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'flex-start' },
  title: { fontSize: 32, fontWeight: 'bold', marginVertical: 10, color: '#d32e2e', textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#0051a8', marginBottom: 16, textAlign: 'center', fontStyle: 'italic' },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, marginVertical: 8, paddingHorizontal: 14, elevation: 2 },
  input: { flex: 1, fontSize: 19, marginLeft: 12, paddingVertical: 12, color: '#222' },
  button: { backgroundColor: '#f7d000', paddingVertical: 18, borderRadius: 12, alignItems: 'center', marginTop: 22, elevation: 4 },
  buttonText: { color: '#d32e2e', fontSize: 21, fontWeight: 'bold', letterSpacing: 1 },
  promoBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff3e0', borderRadius: 18, marginBottom: 18, padding: 14, justifyContent: 'center' },
  promoLogo: { width: 42, height: 42, marginRight: 10 },
  bullIcon: { fontSize: 38, marginRight: 14 },
  promoText: { fontSize: 17, color: '#0051a8', fontWeight: 'bold' },
  funFooter: { marginTop: 24, alignItems: 'center' },
  funText: { color: '#888', fontSize: 16, textAlign: 'center' },
});
