import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useWindowDimensions } from "react-native";
import { HOTSPOTS, BullSpot } from "../constants/bull-spots";

type Props = {
  width?: number;
  height?: number;
  onPress?: (hotspot: BullSpot) => void;
};

const BullHeadHotspots: React.FC<Props> = ({ width, height, onPress }) => {
  const dims = useWindowDimensions();
  const viewW = width ?? dims.width;
  const viewH = height ?? Math.round(dims.width * 0.6);

  // base size scales with smaller dimension
  const baseMarker = Math.max(8, Math.round(Math.min(viewW, viewH) * 0.04));

  const handlePress = (h: BullSpot) => {
    if (onPress) onPress(h);
    else console.log("Hotspot press:", h.id);
  };

  return (
    <View style={[styles.container, { width: viewW, height: viewH }]}>
      <Svg width={viewW} height={viewH} style={StyleSheet.absoluteFill}>
        {HOTSPOTS.map((s) => {
          const cx = s.x * viewW;
          const cy = s.y * viewH;
          const size = s.size ? Math.round(baseMarker * s.size) : baseMarker;
          return (
            <Circle
              key={s.id}
              cx={cx}
              cy={cy}
              r={size}
              fill="#ff6b6b"
              stroke="#fff"
              strokeWidth={2}
              opacity={0.95}
            />
          );
        })}
      </Svg>

      {/* Overlay touchable buttons (absolute) because TouchableOpacity inside Svg is not cross-platform reliable */}
      {HOTSPOTS.map((s) => {
        const cx = s.x * viewW;
        const cy = s.y * viewH;
        const size = s.size ? Math.round(baseMarker * s.size) : baseMarker;
        const left = Math.max(0, cx - size);
        const top = Math.max(0, cy - size);
        return (
          <TouchableOpacity
            key={s.id}
            activeOpacity={0.8}
            onPress={() => handlePress(s)}
            style={[styles.touchArea, { left, top, width: size * 2, height: size * 2 }]}
            accessibilityLabel={s.title ?? s.id}
            accessibilityRole="button"
          />
        );
      })}

      <View style={styles.legend}>
        {HOTSPOTS.slice(0, 3).map((h) => (
          <TouchableOpacity key={h.id} style={styles.legendItem} onPress={() => handlePress(h)}>
            <View style={styles.dot} />
            <Text numberOfLines={1} style={styles.legendText}>
              {h.title ?? h.id}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "transparent",
  },
  touchArea: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "transparent",
  },
  legend: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#ff6b6b",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#fff",
  },
  legendText: {
    color: "#fff",
    fontSize: 12,
    maxWidth: 140,
  },
});

export default BullHeadHotspots;
