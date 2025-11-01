import React from "react";
import { View, StyleSheet } from "react-native";

const PRIMARY = "#bd9e4b";

export default function ProgressBar({ percent = 50 }) {
  const safePercent = Math.max(0, Math.min(100, percent));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${safePercent}%`, backgroundColor: PRIMARY }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 8,
  },
});
