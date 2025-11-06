import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebaseConfig";
import { BrandLogo } from "@/components/BrandLogo";
import { colors, spacing, borderRadius, fontSize } from "@/constants/tokens";

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
        <BrandLogo variant="courier" width={200} height={200} style={styles.logo} />
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
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: colors.background, 
    padding: spacing.lg 
  },
  logo: {
    marginBottom: spacing.lg,
  },
  title: { 
    fontSize: fontSize.xl, 
    fontWeight: "bold", 
    marginBottom: spacing.xl, 
    color: colors.text 
  },
  input: { 
    width: "100%", 
    marginBottom: spacing.md, 
    padding: spacing.md, 
    borderRadius: borderRadius.md, 
    backgroundColor: colors.surface, 
    borderColor: colors.border, 
    borderWidth: 1, 
    fontSize: fontSize.md 
  },
  button: { 
    width: "100%", 
    backgroundColor: colors.accent, 
    borderRadius: borderRadius.xl, 
    paddingVertical: spacing.md, 
    alignItems: "center", 
    marginTop: spacing.md 
  },
  buttonText: { 
    color: colors.surface, 
    fontWeight: "bold", 
    fontSize: fontSize.lg 
  },
  link: { 
    color: colors.accent, 
    marginTop: spacing.lg, 
    fontSize: fontSize.sm 
  },
});
