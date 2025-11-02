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
    images: ["data:image/jpeg;base64,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"],
    status: "Available",
    owner: { name: "John", phone: "+923001234567", verified: true },
  },
  {
    id: 2,
    owner_id: 2,
    name: "Harvester 3000",
    category: "Harvester",
    condition: "Recently serviced, 3000kg capacity",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJlWXEI33UJeW_vZrF-r7ocfCKtU4Lc7s39w&s"],
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
    right: -4, 
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
