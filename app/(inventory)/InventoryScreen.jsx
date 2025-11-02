import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddItemModal from "../../component/inventory/AddItemModal";
import BatchListModal from "../../component/inventory/BatchListModal";
import CropCard from "../../component/inventory/CropCard";
import FilterBar from "../../component/inventory/FilterBar";

const PRIMARY = "#bd9e4b";

/* MOCK DATA */
const crops = [
  { id: 1, user_id: 1, crop_name: "Tomatoes", unit_type: "crates" },
  { id: 2, user_id: 1, crop_name: "Potatoes", unit_type: "kg" },
  { id: 3, user_id: 1, crop_name: "Spinach", unit_type: "kg" },
];

const crop_batches = [
  {
    id: 1,
    crop_id: 1,
    qty: 20,
    harvest_date: "2025-10-15",
    expiry_date: "2025-11-05",
    sold_qty: 5,
    status: "Available",
  },
  {
    id: 2,
    crop_id: 1,
    qty: 10,
    harvest_date: "2025-10-20",
    expiry_date: "2025-11-07",
    sold_qty: 1,
    status: "Available",
  },
  {
    id: 3,
    crop_id: 2,
    qty: 100,
    harvest_date: "2025-10-10",
    expiry_date: "2025-11-20",
    sold_qty: 80,
    status: "Expiring Soon",
  },
  {
    id: 4,
    crop_id: 3,
    qty: 40,
    harvest_date: "2025-10-25",
    expiry_date: "2025-11-10",
    sold_qty: 40,
    status: "Sold Out",
  },
];

export default function InventoryScreen() {
  const [cropsList, setCropsList] = useState(crops);
  const [batchesList, setBatchesList] = useState(crop_batches);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([
    { key: "all", label: "All", active: true },
    { key: "fresh", label: "Fresh", active: false },
    { key: "near", label: "Near expiry", active: false },
    { key: "sold", label: "Sold out", active: false },
  ]);

  const [batchModalVisible, setBatchModalVisible] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState(null);

  const cropSummaries = useMemo(() => {
    const map = {};
    cropsList.forEach((c) => {
      const batches = batchesList.filter((b) => b.crop_id === c.id);
      const totalQty = batches.reduce((s, b) => s + b.qty, 0);
      const soldQty = batches.reduce((s, b) => s + b.sold_qty, 0);
      const remaining = totalQty - soldQty;
      const counts = { Available: 0, "Expiring Soon": 0, "Sold Out": 0 };
      batches.forEach((b) => (counts[b.status] = (counts[b.status] || 0) + 1));
      const overallPercentRemaining =
        totalQty === 0 ? 0 : (remaining / totalQty) * 100;
      map[c.id] = {
        totalQty,
        totalBatches: batches.length,
        counts,
        overallPercentRemaining,
        batches,
      };
    });
    return map;
  }, [cropsList, batchesList]);

  const activeFilterKey = filters.find((f) => f.active)?.key || "all";
  const displayedCrops = cropsList.filter((c) => {
    if (
      searchTerm &&
      !c.crop_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    if (activeFilterKey === "all") return true;
    const summary = cropSummaries[c.id] || { counts: {} };
    if (activeFilterKey === "fresh") return (summary.counts.Available || 0) > 0;
    if (activeFilterKey === "near")
      return (summary.counts["Expiring Soon"] || 0) > 0;
    if (activeFilterKey === "sold")
      return (summary.counts["Sold Out"] || 0) > 0;
    return true;
  });

  function toggleFilter(key) {
    setFilters((prev) => prev.map((f) => ({ ...f, active: f.key === key })));
  }

  function openBatchModal(cropId) {
    setSelectedCropId(cropId);
    setBatchModalVisible(true);
  }

  const selectedCrop = cropsList.find((c) => c.id === selectedCropId);
  const selectedBatches = selectedCropId
    ? cropSummaries[selectedCropId]?.batches || []
    : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header + Filter */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>Inventory Tracker</Text>
          <Text style={styles.countText}>
            {cropsList.length} crops • {batchesList.length} batches
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: PRIMARY }]}
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onToggleFilter={toggleFilter}
      />

      {/* Crop list scrolls fully */}
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {displayedCrops.map((c) => {
            const summary = cropSummaries[c.id] || {
              totalQty: 0,
              totalBatches: 0,
              counts: {},
              overallPercentRemaining: 0,
              batches: [],
            };
            return (
              <CropCard
                key={c.id}
                crop={c}
                batchesSummary={summary}
                onViewBatches={openBatchModal}
              />
            );
          })}

          {displayedCrops.length === 0 && (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                No crops found matching filters.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Add batch modal */}
      <AddItemModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAddItem={(newCrop, newBatch) => {
          let cropId = cropsList.find(
            (c) => c.crop_name === newCrop.crop_name
          )?.id;
          if (!cropId) {
            cropId = cropsList.length + 1;
            setCropsList([...cropsList, { ...newCrop, id: cropId }]);
          }
          const batchId = batchesList.length + 1;
          setBatchesList([
            ...batchesList,
            { id: batchId, crop_id: cropId, ...newBatch },
          ]);
        }}
      />

      {/* Batch list modal */}
      <BatchListModal
        visible={batchModalVisible}
        onClose={() => setBatchModalVisible(false)}
        crop={selectedCrop || { crop_name: "" }}
        batches={selectedBatches}
        onUpdateBatch={(updatedBatch) =>
          setBatchesList((prev) =>
            prev.map((b) => (b.id === updatedBatch.id ? updatedBatch : b))
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "700", color: "#111827" },
  countText: { color: "#6B7280", marginTop: 4 },
  addBtn: { padding: 10, borderRadius: 12 },
  empty: { padding: 20, alignItems: "center" },
  emptyText: { color: "#6B7280" },
});
