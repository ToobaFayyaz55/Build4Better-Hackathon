import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EquipmentCard from "../../component/equipment/EquipmentCard";
import AddEditEquipmentModal from "./AddEditEquipmentModal";
import EquipmentDetailModal from "./EquipmentDetailModal";

const PRIMARY = "#4B9CD3";

const mockEquipment = [
  {
    id: 1,
    owner_id: 1,
    name: "John Deere 5055",
    category: "Tractor",
    condition: "Well maintained, 55 HP engine",
    images: ["https://via.placeholder.com/400x225.png?text=Tractor+1"],
    status: "Available",
    owner: { name: "John", phone: "+923001234567", verified: true },
  },
  {
    id: 2,
    owner_id: 2,
    name: "Harvester 3000",
    category: "Harvester",
    condition: "Recently serviced, 3000kg capacity",
    images: ["https://via.placeholder.com/400x225.png?text=Harvester"],
    status: "Rented",
    owner: { name: "Ali", phone: "+923001112223", verified: false },
  },
];

const STATUS_COLORS = {
  Available: "#16A34A",
  Rented: "#DC2626",
  "Under Maintenance": "#F59E0B",
};

export default function EquipmentHub() {
  const [activeTab, setActiveTab] = useState("my"); // 'my' or 'others'
  const [equipmentList, setEquipmentList] = useState(mockEquipment);

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [addEditModalVisible, setAddEditModalVisible] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);

  const displayedEquipment = useMemo(() => {
    return equipmentList.filter((eq) => {
      if (activeTab === "my") return eq.owner_id === 1;
      if (activeTab === "others") return eq.owner_id !== 1;
      return true;
    });
  }, [equipmentList, activeTab]);

  const openDetail = (eq) => {
    setSelectedEquipment(eq);
    setDetailModalVisible(true);
  };

  const openAddEdit = (eq = null) => {
    setEditingEquipment(eq);
    setAddEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Equipment Hub</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#111827" />
          <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === "my" && styles.tabActive]} onPress={() => setActiveTab("my")}>
          <Text style={[styles.tabText, activeTab === "my" && { color: "#fff" }]}>My Equipment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === "others" && styles.tabActive]} onPress={() => setActiveTab("others")}>
          <Text style={[styles.tabText, activeTab === "others" && { color: "#fff" }]}>Others’ Equipment</Text>
        </TouchableOpacity>
      </View>

      {/* Equipment List */}
      <ScrollView style={styles.scroll} contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {displayedEquipment.map((eq) => (
          <EquipmentCard
            key={eq.id}
            equipment={eq}
            activeTab={activeTab}
            onPress={() => openDetail(eq)}
            onEdit={() => openAddEdit(eq)}
            onDelete={() => setEquipmentList((prev) => prev.filter((e) => e.id !== eq.id))}
            statusColors={STATUS_COLORS}
          />
        ))}
      </ScrollView>

      {/* Modals */}
      <AddEditEquipmentModal
        visible={addEditModalVisible}
        equipment={editingEquipment}
        onClose={() => setAddEditModalVisible(false)}
        onSave={(newData) => {
          if (editingEquipment) {
            setEquipmentList((prev) => prev.map((e) => (e.id === editingEquipment.id ? newData : e)));
          } else {
            setEquipmentList((prev) => [...prev, { ...newData, id: prev.length + 1, owner_id: 1 }]);
          }
          setAddEditModalVisible(false);
        }}
      />

      <EquipmentDetailModal
        visible={detailModalVisible}
        equipment={selectedEquipment}
        onClose={() => setDetailModalVisible(false)}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => openAddEdit(null)} 
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" }, // Set to pure white

  // ---- Header ----
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: 16, 
    backgroundColor: "#fff", 
    borderBottomWidth: 1, 
    borderBottomColor: "#E5E7EB", 
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#111827" },
  badge: { 
    position: "absolute", 
    top: -4, 
    right: -4, 
    // Using raw hex for Rented Status Color
    backgroundColor: "#DC2626", 
    borderRadius: 8, 
    paddingHorizontal: 4 
  },
  badgeText: { color: "#fff", fontSize: 10 },

  // ---- Tabs ----
  tabContainer: { 
    flexDirection: "row", 
    margin: 16, 
    borderRadius: 12, 
    backgroundColor: "#E5E7EB", 
    overflow: "hidden" 
  },
  tab: { flex: 1, padding: 10, alignItems: "center" },
  // Using raw hex for PRIMARY color
  tabActive: { backgroundColor: "#bd9e4b" }, 
  tabText: { color: "#374151", fontWeight: "600", fontSize: 14 },
  tabTextActive: { color: "#fff" },

  // ---- Scroll / List ----
  scroll: { flex: 1 },
  listContainer: { paddingHorizontal: 16, paddingBottom: 120 },

  // ---- Floating Add Button ----
  addBtn: {
    position: "absolute",
    bottom: 24,
    right: 24,
    // Using raw hex for PRIMARY color
    backgroundColor: "#bd9e4b",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  // ---- Equipment Card ----
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: { width: "100%", height: 180, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  cardCategory: { color: "#6B7280", fontSize: 14, marginBottom: 6 },
  cardCondition: { fontSize: 13, color: "#374151", marginBottom: 8 },
  cardStatusPill: { 
    alignSelf: "flex-start", 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 12, 
    marginBottom: 8,
  },
  cardStatusText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },

  // ---- Equipment Detail Modal ----
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  modalContainer: { margin: 16, backgroundColor: "#fff", borderRadius: 12, padding: 16, height: "90%" },
  modalCloseBtn: { position: "absolute", top: 12, right: 12, zIndex: 10 },
  modalImage: { width: 300, height: 180, borderRadius: 12, marginRight: 12 },
  modalName: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  modalCategory: { fontSize: 16, color: "#6B7280", marginBottom: 8 },
  modalStatusPill: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 12 },
  modalStatusText: { color: "#fff", fontWeight: "600" },
  modalCondition: { marginBottom: 16 },
  modalOwnerCard: { padding: 12, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, marginBottom: 16 },
  modalOwnerName: { fontWeight: "700" },
  modalOwnerPhone: { marginBottom: 4 },
  modalVerified: { flexDirection: "row", alignItems: "center" },
  modalVerifiedText: { marginLeft: 4, color: "#16A34A", fontWeight: "600" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center", backgroundColor: "#E5E7EB", marginHorizontal: 4 },
  // Using raw hex for PRIMARY color
  modalButtonPrimary: { backgroundColor: "#bd9e4b", }, 
  modalButtonPrimaryText: { color: "#fff", fontWeight: "600" },
});
