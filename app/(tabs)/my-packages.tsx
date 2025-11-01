import { View, Text, StyleSheet } from "react-native";

export default function MyPackages() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Csomagjaim</Text>
      <Text style={styles.info}>Itt fogod látni a feladott csomagjaidat (hamarosan).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f6f7fb" },
  title: { fontSize: 24, fontWeight: "bold", color: "#222", marginBottom: 16 },
  info: { fontSize: 16, color: "#888", textAlign: "center" },
});
