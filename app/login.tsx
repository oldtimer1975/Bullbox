import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hiba", "Töltsd ki az összes mezőt!");
      return;
    }
    setLoading(true);
    try {
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/");
    } catch (err: any) {
      Alert.alert("Hiba", err.message || "Ismeretlen hiba történt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>Bejelentkezés</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Jelszó"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Belépés..." : "Belépés"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/register")}>
          <Text style={styles.link}>Nincs fiókod? Regisztrálj!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f6f7fb", padding: 24 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 36, color: "#222" },
  input: { width: "100%", marginBottom: 16, padding: 12, borderRadius: 8, backgroundColor: "#fff", borderColor: "#ddd", borderWidth: 1, fontSize: 16 },
  button: { width: "100%", backgroundColor: "#5a63ff", borderRadius: 24, paddingVertical: 16, alignItems: "center", marginTop: 12 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 17 },
  link: { color: "#5a63ff", marginTop: 20, fontSize: 15 },
});
