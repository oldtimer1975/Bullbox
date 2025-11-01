import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch, KeyboardAvoidingView, Platform, Alert } from "react-native";

export default function CreatePackage() {
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [address, setAddress] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [insurance, setInsurance] = useState(false);

  function handleSubmit() {
    if (!description || !recipient || !address) {
      Alert.alert("Hiba", "Kérlek, tölts ki minden kötelező mezőt!");
      return;
    }
    Alert.alert("Siker!", "Csomag feladva (DEMO üzenet).");
    setDescription(""); setRecipient(""); setAddress(""); setWeight(""); setSize(""); setInsurance(false);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Csomag feladása</Text>
        <Input label="Leírás*" value={description} setValue={setDescription} placeholder="Mi ez a csomag?" />
        <Input label="Címzett neve*" value={recipient} setValue={setRecipient} placeholder="Kinek küldöd?" />
        <Input label="Cím*" value={address} setValue={setAddress} placeholder="Hova küldöd?" />
        <View style={styles.row}>
          <Input label="Súly (kg)" value={weight} setValue={setWeight} placeholder="Pl. 1.5" keyboardType="numeric" half />
          <Input label="Méret" value={size} setValue={setSize} placeholder="Pl. 30x20x15cm" half />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Biztosítást kérek</Text>
          <Switch value={insurance} onValueChange={setInsurance} thumbColor={insurance ? "#5a63ff" : "#bbb"} trackColor={{ true: "#bfc5ff", false: "#e0e0e0" }} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Feladás</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Input({ label, value, setValue, placeholder, keyboardType, half }) {
  return (
    <View style={[styles.inputBox, half && { flex: 1, marginRight: 8 }]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        keyboardType={keyboardType || "default"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 48, backgroundColor: "#f6f7fb" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#222", textAlign: "center" },
  inputBox: { marginBottom: 14 },
  label: { marginBottom: 4, color: "#333", fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#dbe1ee", borderRadius: 8, backgroundColor: "#fff", padding: 10, fontSize: 16, color: "#222" },
  row: { flexDirection: "row", gap: 8, marginBottom: 0 },
  switchRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 12 },
  switchLabel: { fontSize: 15, color: "#333" },
  button: { backgroundColor: "#5a63ff", borderRadius: 24, paddingVertical: 14, alignItems: "center", marginTop: 28 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 17 },
});
