import { Feather } from "@expo/vector-icons";
import {
    Linking,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const AddMarketFormModal = ({
  visible,
  onRequestClose,
  formData,
  onFormDataChange,
  latInput,
  setLatInput,
  lonInput,
  setLonInput,
  tagInput,
  setTagInput,
  onAddTag,
  onRemoveTag,
  onSaveMarket,
  availableTags,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View style={styles.formModalContainer}>
        <View style={styles.formModalContent}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Add New Market</Text>
            <TouchableOpacity onPress={onRequestClose}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Market Name Input */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Market Name *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter market name"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={(text) =>
                  onFormDataChange({ ...formData, name: text })
                }
              />
            </View>

            {/* Tags Selection */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Tags</Text>
              <View style={styles.tagSelectionContainer}>
                {availableTags.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tagSelectionItem,
                      formData.tags.includes(tag) &&
                        styles.tagSelectionItemActive,
                    ]}
                    onPress={() => {
                      if (formData.tags.includes(tag)) {
                        onRemoveTag(tag);
                      } else {
                        onFormDataChange({
                          ...formData,
                          tags: [...formData.tags, tag],
                        });
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.tagSelectionText,
                        formData.tags.includes(tag) &&
                          styles.tagSelectionTextActive,
                      ]}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Custom Tag Input */}
              <View style={styles.customTagInputContainer}>
                <TextInput
                  style={styles.customTagInput}
                  placeholder="Add custom tag..."
                  placeholderTextColor="#999"
                  value={tagInput}
                  onChangeText={setTagInput}
                />
                <TouchableOpacity
                  style={styles.addTagButton}
                  onPress={onAddTag}
                >
                  <Feather name="plus" size={20} color="white" />
                </TouchableOpacity>
              </View>

              {/* Display Added Tags */}
              {formData.tags.length > 0 && (
                <View style={styles.addedTagsContainer}>
                  {formData.tags.map((tag, idx) => (
                    <View key={idx} style={styles.addedTag}>
                      <Text style={styles.addedTagText}>{tag}</Text>
                      <TouchableOpacity onPress={() => onRemoveTag(tag)}>
                        <Feather name="x" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Notes Input */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Notes (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.notesInput]}
                placeholder="Add any additional information..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={formData.notes}
                onChangeText={(text) =>
                  onFormDataChange({ ...formData, notes: text })
                }
                textAlignVertical="top"
              />
            </View>

            {/* Location Input - Latitude & Longitude */}
            <View style={styles.formSection}>
              <View style={styles.locationInputHeader}>
                <Text style={styles.formLabel}>Location Coordinates</Text>
                <TouchableOpacity
                  onPress={() => {
                    const mapsUrl = `https://www.google.com/maps`;
                    Linking.openURL(mapsUrl).catch(() => {
                      alert("Could not open Google Maps");
                    });
                  }}
                  style={styles.openMapsButton}
                >
                  <Feather name="map" size={16} color="#bd9e4b" />
                  <Text style={styles.openMapsText}>Open Google Maps</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.coordinateInputRow}>
                <View style={styles.coordinateInputField}>
                  <Text style={styles.coordinateLabel}>Latitude</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., 31.5497"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    value={latInput}
                    onChangeText={(text) => {
                      setLatInput(text);
                      if (text.trim()) {
                        onFormDataChange({
                          ...formData,
                          latitude: parseFloat(text) || null,
                        });
                      }
                    }}
                  />
                </View>

                <View style={styles.coordinateInputField}>
                  <Text style={styles.coordinateLabel}>Longitude</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., 74.3436"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    value={lonInput}
                    onChangeText={(text) => {
                      setLonInput(text);
                      if (text.trim()) {
                        onFormDataChange({
                          ...formData,
                          longitude: parseFloat(text) || null,
                        });
                      }
                    }}
                  />
                </View>
              </View>

              <Text style={styles.coordinateHint}>
                💡 Find coordinates by clicking on a location in Google Maps or searching. Copy the numbers from the address bar (e.g., @31.5497,74.3436)
              </Text>
            </View>

            {/* Display Location if Set */}
            {formData.latitude && formData.longitude && (
              <View style={styles.locationInfoBox}>
                <Feather name="check-circle" size={20} color="#22c55e" />
                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationTitle}>Location Set ✓</Text>
                  <Text style={styles.locationCoords}>
                    {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                  </Text>
                </View>
              </View>
            )}

            {/* Save Button */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={onSaveMarket}
            >
              <Text style={styles.saveButtonText}>Save Market</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelButtonAlt}
              onPress={onRequestClose}
            >
              <Text style={styles.cancelButtonAltText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  formModalContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 16,
  },
  formModalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  formSection: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  notesInput: {
    textAlignVertical: "top",
    paddingTop: 12,
  },
  tagSelectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  tagSelectionItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  tagSelectionItemActive: {
    backgroundColor: "#22c55e",
    borderColor: "#22c55e",
  },
  tagSelectionText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  tagSelectionTextActive: {
    color: "white",
  },
  customTagInputContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  customTagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  addTagButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#bd9e4b",
    justifyContent: "center",
    alignItems: "center",
  },
  addedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  addedTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#22c55e",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addedTagText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  locationInputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  openMapsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
  },
  openMapsText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#bd9e4b",
  },
  coordinateInputRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  coordinateInputField: {
    flex: 1,
  },
  coordinateLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  coordinateHint: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginTop: 8,
    lineHeight: 16,
  },
  locationInfoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f9ff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#22c55e",
  },
  locationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  locationTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#22c55e",
  },
  locationCoords: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
  saveButton: {
    backgroundColor: "#bd9e4b",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonAlt: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  cancelButtonAltText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddMarketFormModal;
