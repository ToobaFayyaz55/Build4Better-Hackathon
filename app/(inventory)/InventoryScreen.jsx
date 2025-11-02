import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState, useEffect } from "react";
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
import { supabase } from "../../lib/supabase";
import uuid from "react-native-uuid";

import FilterBar from "../../component/inventory/FilterBar";

const PRIMARY = "#bd9e4b";
const defaultUserId = "00000000-0000-0000-0000-000000000000";

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
  const [cropsList, setCropsList] = useState([]); // make crops editable
  const [batchesList, setBatchesList] = useState([]);
  const [showModal, setShowModal] = useState(false); // add batch modal
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

  useEffect(() => {
    fetchCropsAndBatches();
  }, []);

  async function fetchCropsAndBatches() {
    // Fetch crops
    const { data: cropsData, error: cropsError } = await supabase
      .from("crops")
      .select("*");

    if (cropsError) console.error(cropsError);

    // Fetch batches
    const { data: batchesData, error: batchesError } = await supabase
      .from("crop_batches")
      .select("*");

    if (batchesError) console.error(batchesError);

    setCropsList(cropsData || []);
    setBatchesList(batchesData || []);
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header + Filter */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>Fasal Watch</Text>
          <Text style={styles.countText}>
            {cropsList.length} crops • {batchesList.length} batches
          </Text>
        </View>

        <TouchableOpacity
          style={{ borderRadius: 12 }}
          onPress={() => setShowModal(true)}
        >
          <LinearGradient
            colors={["#bd9e4b", "#fde68a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addBtnGradient}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </LinearGradient>
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

      {/* Add batch modal (your existing component) */}
      {/* <AddItemModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAddItem={(newCrop, newBatch) => {
          // Add new crop if it doesn't exist yet
          let cropId = cropsList.find(
            (c) => c.crop_name === newCrop.crop_name
          )?.id;
          if (!cropId) {
            cropId = cropsList.length + 1; // simple ID
            setCropsList([...cropsList, { ...newCrop, id: cropId }]);
          }

          // Add new batch
          const batchId = batchesList.length + 1;
          setBatchesList([
            ...batchesList,
            { id: batchId, crop_id: cropId, ...newBatch },
          ]);
        }}
      /> */}

      <AddItemModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAddItem={async (newCrop, newBatch) => {
          try {
            // 1️⃣ Check if crop already exists
            let crop = cropsList.find(
              (c) =>
                c.crop_name.toLowerCase() === newCrop.crop_name.toLowerCase()
            );

            if (!crop) {
              // Prepare crop data (no 'id', let DB generate)
              const cropToInsert = {
                crop_name: newCrop.crop_name,
                unit_type: newCrop.unit_type,
                category: newCrop.category || null, // optional
              };

              console.log("Inserting crop:", cropToInsert);

              // Insert crop into Supabase
              const { data: insertedCropArray, error: cropError } =
                await supabase.from("crops").insert([cropToInsert]).select(); // select returns the inserted row

              if (cropError) throw cropError;

              crop = insertedCropArray[0]; // use the inserted crop
              setCropsList([...cropsList, crop]);
            }

            // 2️⃣ Insert batch linked to this crop
            const batchToInsert = {
              crop_id: crop.id, // BIGINT from DB
              qty: newBatch.qty,
              harvest_date: newBatch.harvest_date,
              expiry_date: newBatch.expiry_date,
              sold_qty: newBatch.sold_qty || 0,
              status: newBatch.status || "Available",
            };

            console.log("Inserting batch:", batchToInsert);

            const { data: insertedBatchArray, error: batchError } =
              await supabase
                .from("crop_batches")
                .insert([batchToInsert])
                .select();

            if (batchError) throw batchError;


            const insertedBatch = insertedBatchArray[0]; 
            setBatchesList([...batchesList, insertedBatch]);

            console.log(
              "Inserted crop and batch successfully:",
              crop,
              insertedBatch
            );
          } catch (error) {
            console.error("Error adding crop/batch:", error);
            alert("Failed to add item. Check console for details.");
          }
        }}
      />

      {/* <BatchListModal
        visible={batchModalVisible}
        onClose={() => setBatchModalVisible(false)}
        crop={selectedCrop || { crop_name: "" }}
        batches={selectedBatches}
        onUpdateBatch={(updatedBatch) => {
          setBatchesList((prev) =>
            prev.map((b) => (b.id === updatedBatch.id ? updatedBatch : b))
          );
        }}
      /> */}

      <BatchListModal
        visible={batchModalVisible}
        onClose={() => setBatchModalVisible(false)}
        crop={selectedCrop || { crop_name: "" }}
        batches={selectedBatches}
        onUpdateBatch={async (updatedBatch) => {
          try {
            const { data, error } = await supabase
              .from("crop_batches")
              .update({
                sold_qty: updatedBatch.sold_qty,
                status: updatedBatch.status,
              })
              .eq("id", updatedBatch.id);

            const updated = data?.[0]; // <- get the first updated row safely
            if (!updated) return;

            if (error) throw error;

            setBatchesList((prev) =>
              prev.map((b) => (b.id === updated.id ? updated : b))
            );
          } catch (err) {
            console.error("Failed to update batch:", err.message);
          }
        }}
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
  addBtnGradient: {
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  empty: { padding: 20, alignItems: "center" },
  emptyText: { color: "#6B7280" },
});
