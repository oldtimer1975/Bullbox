import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Nunito_700Bold, Nunito_400Regular, useFonts } from "@expo-google-fonts/nunito";

export default function AboutScreen() {
  let [fontsLoaded] = useFonts({ Nunito_700Bold, Nunito_400Regular });
  if (!fontsLoaded) return null;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rólunk</Text>
      <Text style={styles.text}>
        A BullBox egy barátságos, lendületes csomagküldő applikáció, amelyet a modern technológia, energia és ügyfélközpontú szemlélet ihletett.
      </Text>
      <Text style={styles.text}>
        - Pénzügyi partnerünk: Revolut {"\n"}
        - Energiát ad: Red Bull {"\n"}
        - Programozás és menedzsment: AI (GitHub Copilot, ChatGPT) {"\n"}
        - Ötletgazda: Nágel Zolika {"\n"}
      </Text>
      <Text style={styles.text}>
        Célunk, hogy minden csomagküldés könnyed, gyors és élvezetes legyen – bika tempóval, stressz nélkül!
      </Text>
      <Text style={styles.signature}>Köszönjük, hogy minket választasz! 😊</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fafdff", alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontFamily: "Nunito_700Bold", fontSize: 28, color: "#233", marginBottom: 18 },
  text: { fontFamily: "Nunito_400Regular", fontSize: 17, color: "#354", marginVertical: 7, textAlign: "center" },
  signature: { fontFamily: "Nunito_700Bold", fontSize: 18, color: "#3a7", marginTop: 24, textAlign: "center" }
});

