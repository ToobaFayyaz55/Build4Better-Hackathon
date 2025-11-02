import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import MarketMapModal from "../../component/market/MarketMapModal";
import { addMarket, deleteMarket, getMarkets } from "../../lib/marketService";

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import AddMarketFormModal from "../../component/market/AddMarketFormModal";
import AddMarketModal from "../../component/market/AddMarketModal";
import MarketCard from "../../component/market/MarketCard";
import MarketDetailModal from "../../component/market/MarketDetailModal";
import MarketHeader from "../../component/market/MarketHeader";

const SahoolatBazaar = () => {
  const router = useRouter();

  // State Management
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recently");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMarketDetailModal, setShowMarketDetailModal] = useState(false);
  const [showAddMarketForm, setShowAddMarketForm] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    market_name: "",
    tags: [],
    notes: "",
    latitude: null,
    longitude: null,
  });
  const [tagInput, setTagInput] = useState("");
  const [latInput, setLatInput] = useState("");
  const [lonInput, setLonInput] = useState("");

  const availableTags = ["Wholesale", "Retail", "Cold Storage", "Produce", "Livestock"];

  // Fetch markets from Supabase on component mount
  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    setLoading(true);
    const result = await getMarkets();
    if (result.success) {
      setMarkets(result.data);
    } else {
      alert("Error loading markets: " + result.error);
    }
    setLoading(false);
  };

  // Get sorted and filtered markets
  const getFilteredAndSortedMarkets = () => {
    let filtered = markets;

    if (selectedFilters.length > 0) {
      filtered = markets.filter((market) =>
        market.tags && selectedFilters.some((filter) => market.tags.includes(filter))
      );
    }

    const sorted = [...filtered];
    if (sortBy === "recently") {
      sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    return sorted;
  };

  // Handle Add Current Location
  const handleAddCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setFormData({
        ...formData,
        latitude,
        longitude,
      });

      setShowAddModal(false);
      setShowAddMarketForm(true);
    } catch (error) {
      alert("Could not fetch current location. Please enter coordinates manually.");
      setShowAddModal(false);
      setShowAddMarketForm(true);
    }
  };

  // Handle Add from Map
  const handleAddFromMap = () => {
    setShowAddModal(false);  // Close the main add modal
    setShowMapModal(true);   // Open the map picker
  };


    // Add tag to form
    const handleAddTag = () => {
      if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()],
        });
        setTagInput("");
      }
    };

  // Remove tag from form
  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  // Save new market
  const handleSaveMarket = async () => {
    if (!formData.name.trim()) {
      alert("Please enter a market name");
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      alert("Please enter valid latitude and longitude coordinates");
      return;
    }

    const newMarket = {
      market_name: formData.name, // <-- map name to market_name
      tags: formData.tags || [],
      notes: formData.notes || "",
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      // you can add dateAdded if your table has it
    };

    const result = await addMarket(newMarket);
    if (result.success) {
      await fetchMarkets(); // refresh the list
      closeForm();
    } else {
      alert("Error saving market: " + result.error);
    }
  };

  // Delete market
  const handleDeleteMarket = async (marketId) => {
    const result = await deleteMarket(marketId);
    if (result.success) {
      setMarkets(markets.filter((m) => m.id !== marketId));
      setShowMarketDetailModal(false);
      setSelectedMarket(null);
    } else {
      alert("Error deleting market: " + result.error);
    }
  };

  // Close form and reset
  const closeForm = () => {
    setShowAddMarketForm(false);
    setFormData({
      name: "",
      tags: [],
      notes: "",
      latitude: null,
      longitude: null,
    });
    setTagInput("");
    setLatInput("");
    setLonInput("");
  };

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Feather name="map-pin" size={48} color="#bd9e4b" />
      <Text style={styles.emptyText}>No markets added yet.</Text>
      <Text style={styles.emptySubtext}>
        Tap the + button to add your first market!
      </Text>
    </View>
  );

  const filteredMarkets = getFilteredAndSortedMarkets();

  return (
    <View style={styles.container}>
      {/* Market Header */}
      <MarketHeader />

      {/* Sort & Filter Bar */}
      <View style={styles.filterBar}>
        <View style={styles.sortSection}>
          <Text style={styles.filterLabel}>Sort by:</Text>
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortBy === "recently" && styles.filterButtonActive,
            ]}
            onPress={() => setSortBy("recently")}
          >
            <Text
              style={[
                styles.filterButtonText,
                sortBy === "recently" && styles.filterButtonTextActive,
              ]}
            >
              Recently Added
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Market List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#bd9e4b" />
          <Text style={styles.loadingText}>Loading markets...</Text>
        </View>
      ) : filteredMarkets.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredMarkets}
          renderItem={({ item }) => (
            <MarketCard
              market={item}
              onPress={() => {
                setSelectedMarket(item);
                setShowMarketDetailModal(true);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>

      {/* Modals */}
      <AddMarketModal
        visible={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
        onAddCurrentLocation={handleAddCurrentLocation}
        onAddFromMap={handleAddFromMap}
      />

      <AddMarketFormModal
        visible={showAddMarketForm}
        onRequestClose={closeForm}
        formData={formData}
        onFormDataChange={setFormData}
        latInput={latInput}
        setLatInput={setLatInput}
        lonInput={lonInput}
        setLonInput={setLonInput}
        tagInput={tagInput}
        setTagInput={setTagInput}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onSaveMarket={handleSaveMarket}
        availableTags={availableTags}
      />

      <MarketDetailModal
        visible={showMarketDetailModal}
        onRequestClose={() => setShowMarketDetailModal(false)}
        market={selectedMarket}
        onDelete={handleDeleteMarket}
      />
      <MarketMapModal
        visible={showMapModal}
        onRequestClose={() => setShowMapModal(false)}
        onLocationSelect={(coords) => {
          setFormData({
            ...formData,
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
          setLatInput(coords.latitude.toString());
          setLonInput(coords.longitude.toString());
          setShowMapModal(false);
          setShowAddMarketForm(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
  filterBar: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  sortSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginRight: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#bd9e4b",
    borderColor: "#bd9e4b",
  },
  filterButtonText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "white",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#bd9e4b",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default SahoolatBazaar;
