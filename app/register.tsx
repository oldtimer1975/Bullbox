import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebaseConfig";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Hiba", "Minden mező kitöltése kötelező!");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Hiba", "A jelszavak nem egyeznek!");
      return;
    }
    setLoading(true);
    try {
      const auth = getAuth(firebaseApp);
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Siker", "Sikeres regisztráció!");
      router.replace("/login");
    } catch (err: any) {
      Alert.alert("Hiba", err.message || "Ismeretlen hiba történt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>Regisztráció</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Jelszó újra"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Feldolgozás..." : "Regisztráció"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.link}>Van már fiókod? Jelentkezz be!</Text>
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
