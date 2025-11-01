import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";

export default function FilterBar({ searchTerm, onSearchChange, filters, onToggleFilter, sortLabel, onSortPress }) {
  // filters: array of { key, label, active }
  return (
    <View style={styles.container}>
      <TextInput
        value={searchTerm}
        onChangeText={onSearchChange}
        placeholder="Search crop..."
        style={styles.search}
        placeholderTextColor="#9CA3AF"
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips} contentContainerStyle={{ paddingRight: 12 }}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => onToggleFilter(f.key)}
            style={[styles.chip, f.active ? styles.chipActive : styles.chipInactive]}
          >
            <Text style={f.active ? styles.chipTextActive : styles.chipTextInactive}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 12, backgroundColor: "#fff" },
  search: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
  chips: { marginTop: 10 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8, borderWidth: 1 },
  chipActive: { backgroundColor: "#fff", borderColor: "#bd9e4b" },
  chipInactive: { backgroundColor: "#fff", borderColor: "#E5E7EB" },
  chipTextActive: { color: "#bd9e4b", fontWeight: "600" },
  chipTextInactive: { color: "#6B7280" },

  sortBtn: { position: "absolute", right: 16, top: 12 },
  sortText: { color: "#6B7280", fontWeight: "600" },
});
