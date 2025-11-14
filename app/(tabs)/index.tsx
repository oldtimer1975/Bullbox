import React from "react";
import { ScrollView, View, Alert, useWindowDimensions, Platform } from "react-native";
import { useRouter } from "expo-router";
import BullHeadHotspots from "../../components/BullHeadHotspots";
import { BULL_IMAGE, BULL_SPOTS, SPOT_TO_ROUTE } from "../../constants/bull-spots";

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const maxW = Math.min(width * 0.95, Platform.OS === "web" ? 1100 : 420);

  return (
    <ScrollView contentContainerStyle={{ padding: 16, alignItems: "center" }}>
      <View style={{ gap: 24, width: "100%", alignItems: "center" }}>
        <BullHeadHotspots
          imageSource={BULL_IMAGE}
          spots={BULL_SPOTS}
          debug={false}
          showLabels={true}
          markerSize="auto"
          containerWidth={maxW}
          containerMaxWidth={1100}
          autoHideLabelsBelowWidth={500}
          onSpotPress={(id) => {
            const route = SPOT_TO_ROUTE[id];
            if (route) {
              router.push(route as any);
            } else {
              Alert.alert("Info", `Nincs útvonal hozzárendelve ehhez: ${id}`);
            }
          }}
          aspectRatio={1.35}
          showCard={false}
        />
      </View>
    </ScrollView>
  );
}
