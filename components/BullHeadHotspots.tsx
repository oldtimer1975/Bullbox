import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  useWindowDimensions,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import type { BullSpot } from "../constants/bull-spots";

type Props = {
  imageSource: any;
  spots: BullSpot[];
  debug?: boolean;
  showLabels?: boolean;
  markerSize?: "auto" | number;
  containerWidth?: number;
  containerMaxWidth?: number;
  autoHideLabelsBelowWidth?: number;
  onSpotPress?: (id: string) => void;
  aspectRatio?: number;
};

const BullHeadHotspots: React.FC<Props> = ({
  imageSource,
  spots,
  debug = false,
  showLabels = true,
  markerSize = "auto",
  containerWidth,
  containerMaxWidth = 1200,
  autoHideLabelsBelowWidth = 480,
  onSpotPress,
  aspectRatio = 1.6,
}) => {
  const dims = useWindowDimensions();
  // nagyobb webes kitöltés: 95% viewport, plafon containerMaxWidth
  const vw = containerWidth ?? Math.min(dims.width * 0.95, Platform.OS === "web" ? containerMaxWidth : 420);
  const vh = Math.round(vw / aspectRatio);

  // marker méretezés: weben nagyobb arány, de plafonnal; mobilon kisebb arány
  const baseRatio = Platform.OS === "web" ? 0.035 : 0.045; // web: 3.5% ; mobil: 4.5%
  const baseMarker = Math.max(8, Math.round(Math.min(vw, vh) * baseRatio));
  const maxRadius = Platform.OS === "web" ? Math.max(28, Math.round(vw * 0.04)) : 32; // web: dinamikus plafon, mobil: 32px
  const resolvedBase = Math.min(baseMarker, maxRadius);

  const resolvedMarkerSize = typeof markerSize === "number" ? markerSize : resolvedBase;

  const shouldShowLabels = showLabels && vw >= (autoHideLabelsBelowWidth ?? 0);

  const handlePress = (id: string) => {
    if (onSpotPress) onSpotPress(id);
    else console.log("spot press:", id);
  };

  return (
    <View style={[styles.wrapper, { width: vw, height: vh }]}>
      <ImageBackground
        source={imageSource}
        style={[styles.image, { width: vw, height: vh }]}
        imageStyle={{ resizeMode: "cover" }}
      >
        <Svg width={vw} height={vh} style={StyleSheet.absoluteFill}>
          {spots.map((s) => {
            const cx = s.x * vw;
            const cy = s.y * vh;
            const r = s.size ? Math.round(resolvedMarkerSize * s.size) : resolvedMarkerSize;
            return (
              <Circle
                key={s.id}
                cx={cx}
                cy={cy}
                r={r}
                fill={s.meta?.color ?? "#ff6b6b"}
                stroke="#fff"
                strokeWidth={2}
                opacity={0.95}
              />
            );
          })}
        </Svg>

        {/* nagyobb overlay touch terület: multiplier-rel növelve */}
        {spots.map((s) => {
          const cx = s.x * vw;
          const cy = s.y * vh;
          const r = s.size ? Math.round(resolvedMarkerSize * s.size) : resolvedMarkerSize;
          // touch multiplier: weben 2.6, mobilon 2.2
          const touchMult = Platform.OS === "web" ? 2.6 : 2.2;
          const touchW = Math.round(r * 2 * touchMult);
          const left = Math.max(0, Math.round(cx - touchW / 2));
          const top = Math.max(0, Math.round(cy - touchW / 2));
          return (
            <TouchableOpacity
              key={s.id}
              onPress={() => handlePress(s.id)}
              activeOpacity={0.8}
              style={[styles.touchArea, { left, top, width: touchW, height: touchW, borderRadius: touchW / 2 }]}
              accessibilityLabel={s.title ?? s.id}
              accessibilityRole="button"
            />
          );
        })}

        {shouldShowLabels && (
          <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
            {spots.map((s) => {
              if (!s.title) return null;
              const cx = s.x * vw;
              const cy = s.y * vh;
              const labelLeft = Math.min(Math.max(8, cx + 8), vw - 140);
              const labelTop = Math.max(8, cy - 14);
              return (
                <TouchableOpacity
                  key={s.id + "-label"}
                  onPress={() => handlePress(s.id)}
                  activeOpacity={0.85}
                  style={[styles.label, { left: labelLeft, top: labelTop }]}
                >
                  <Text numberOfLines={1} style={styles.labelText}>
                    {s.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {debug && (
          <View style={styles.debug}>
            <Text style={{ color: "#fff", fontSize: 11 }}>{`W:${Math.round(vw)} H:${Math.round(vh)}`}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    position: "relative",
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 18,
    // shadow for web
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    position: "relative",
  },
  touchArea: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  label: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.72)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    maxWidth: 140,
  },
  labelText: {
    color: "#fff",
    fontSize: 12,
  },
  debug: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 6,
    borderRadius: 6,
  },
});

export default BullHeadHotspots;
