import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebaseConfig";
import { BrandLogo } from "@/components/BrandLogo";
import { colors, spacing, borderRadius, fontSize } from "@/constants/tokens";

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
        <BrandLogo variant="head" width={80} height={100} style={styles.logo} />
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
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: colors.background, 
    padding: spacing.lg 
  },
  logo: {
    marginBottom: spacing.md,
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
