import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PRIMARY_GOLD = "#bd9e4b";

export default function EquipmentCard({
  equipment,
  activeTab,
  onPress,
  onEdit,
  onDelete,
  statusColors,
}) {
  const isMyEquipment = activeTab === "my";

  const handleContact = () => {
    if (!equipment.owner?.phone) {
      Alert.alert("No contact available");
      return;
    }
    const phoneNumber = equipment.owner.phone.replace(/[^0-9+]/g, "");
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const imagesToShow =
    equipment.images && equipment.images.length > 0
      ? equipment.images
      : [require("../../assets/placeholder.jpeg")];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.title}>{equipment.name}</Text>
          <Text style={styles.category}>{equipment.category}</Text>
        </View>
        <View
          style={[
            styles.statusPill,
            { backgroundColor: statusColors[equipment.status] || "grey" },
          ]}
        >
          <Text style={styles.statusText}>{equipment.status}</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {imagesToShow.map((img, i) => (
          <Image key={i} source={img} style={styles.image} />
        ))}
      </ScrollView>

      <Text style={styles.condition}>{equipment.condition}</Text>

      <View style={styles.footer}>
        {isMyEquipment ? (
          <View style={styles.actions}>
            <TouchableOpacity onPress={onEdit}>
              <Ionicons name="pencil-outline" size={22} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Ionicons name="trash-outline" size={22} color="#DC2626" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.othersFooter}>
            <Text style={styles.owner}>
              Owner:{" "}
              <Text style={{ fontWeight: "700" }}>
                {equipment.owner?.name || "N/A"}
              </Text>
            </Text>
            <TouchableOpacity onPress={handleContact} style={styles.contactBtn}>
              <Text style={styles.contactText}>Contact</Text>
              <Ionicons
                name="call-outline"
                size={16}
                color="#fff"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
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
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F9FAFB",
  },
  title: { fontSize: 18, fontWeight: "800", color: "#1F2937" },
  category: { fontSize: 13, color: "#6B7280" },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    alignItems: "center",
    minWidth: 90,
  },
  statusText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  image: { width: 300, height: 180, borderRadius: 10, margin: 6 },
  condition: {
    padding: 12,
    fontSize: 14,
    color: "#4B5563",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  footer: { padding: 12 },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 16 },
  othersFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  owner: { fontSize: 14, color: "#4B5563" },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PRIMARY_GOLD,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  contactText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
