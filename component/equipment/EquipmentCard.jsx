import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EquipmentCard({ equipment, activeTab, onPress, onEdit, onDelete, statusColors }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: equipment.images[0] }} style={styles.cardImage} resizeMode="cover" />
      <View style={[styles.statusPill, { backgroundColor: statusColors[equipment.status] || "grey" }]}>
        <Text style={styles.statusText}>{equipment.status}</Text>
      </View>
      <View style={styles.overlay}>
        <Text style={styles.cardTitle} numberOfLines={1}>{equipment.name}</Text>
        <Text style={styles.cardCategory}>{equipment.category}</Text>
      </View>
      <Text style={styles.cardSpecs} numberOfLines={2}>{equipment.condition}</Text>
      <View style={styles.cardFooter}>
        {activeTab === "my" && (
          <>
            <TouchableOpacity onPress={onEdit} style={styles.footerIcon}><Ionicons name="pencil" size={20} color="#4B5563" /></TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.footerIcon}><Ionicons name="trash" size={20} color="#DC2626" /></TouchableOpacity>
          </>
        )}
        {activeTab === "others" && <View style={styles.footerOwner}><Text>{equipment.owner.name[0]}</Text></View>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", marginBottom: 16, borderRadius: 12, overflow: "hidden", paddingBottom: 8 },
  cardImage: { width: "100%", height: 180 },
  overlay: { position: "absolute", top: 8, left: 8 },
  cardTitle: { color: "#fff", fontWeight: "700", fontSize: 16 },
  cardCategory: { color: "#fff", fontSize: 12 },
  statusPill: { position: "absolute", top: 8, right: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  cardSpecs: { paddingHorizontal: 12, paddingTop: 8, color: "#374151" },
  cardFooter: { flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 12, paddingTop: 8 },
  footerIcon: { marginLeft: 12 },
  footerOwner: { backgroundColor: "#E5E7EB", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
});
