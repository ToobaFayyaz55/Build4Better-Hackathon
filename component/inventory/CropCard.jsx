import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ProgressBar from "../ProgressBar";


const PRIMARY = "#bd9e4b";

export default function CropCard({ crop, batchesSummary, onViewBatches }) {
  
  return (
    <View style={styles.card}>
      {/* Top row: name and totals */}
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.name}>{crop.crop_name}</Text>
          <Text style={styles.sub}>{batchesSummary.totalQty} {crop.unit_type} • {batchesSummary.totalBatches} batches</Text>
        </View>

        <TouchableOpacity style={[styles.viewBtn, { backgroundColor: PRIMARY }]} onPress={() => onViewBatches(crop.id)}>
          <Text style={styles.viewBtnText}>View Batches</Text>
        </TouchableOpacity>
      </View>

      {/* Tag strip summary */}
      <View style={styles.tagStrip}>
        <View style={styles.tag}>
          <Text style={styles.tagCount}>{batchesSummary.counts.Available || 0}</Text>
          <Text style={styles.tagLabel}>Fresh</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagCount}>{batchesSummary.counts["Expiring Soon"] || 0}</Text>
          <Text style={styles.tagLabel}>Near expiry</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagCount}>{batchesSummary.counts["Sold Out"] || 0}</Text>
          <Text style={styles.tagLabel}>Sold out</Text>
        </View>
      </View>

      {/* Progress: overall remaining fraction */}
      <View style={{ marginTop: 12 }}>
        <ProgressBar percent={batchesSummary.overallPercentRemaining} />
        <Text style={styles.progressLabel}>
          {Math.round(batchesSummary.overallPercentRemaining)}% remaining across batches
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fffffa",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  left: {},
  name: { fontSize: 16, fontWeight: "700", color: "#1f2937" },
  sub: { color: "#6b7280", marginTop: 4, fontSize: 13 },

  viewBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  viewBtnText: { color: "#fff", fontWeight: "600", fontSize: 13 },

  tagStrip: { flexDirection: "row", marginTop: 10, justifyContent: "space-between" },
  tag: { alignItems: "center", flex: 1 },
  tagCount: { fontWeight: "700", color: "#111827" },
  tagLabel: { fontSize: 12, color: "#6b7280", marginTop: 4 },

  progressLabel: { fontSize: 12, color: "#6b7280", marginTop: 6, textAlign: "center" },
});
