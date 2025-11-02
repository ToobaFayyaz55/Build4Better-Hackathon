import { Feather } from "@expo/vector-icons";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const AddMarketModal = ({
  visible,
  onRequestClose,
  onAddCurrentLocation,
  onAddFromMap,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Market</Text>
            <TouchableOpacity onPress={onRequestClose}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.modalOption}
            onPress={onAddCurrentLocation}
          >
            <Feather name="navigation" size={24} color="#bd9e4b" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Add Current Location</Text>
              <Text style={styles.optionSubtitle}>Use your device's GPS</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalOption} onPress={onAddFromMap}>
            <Feather name="map" size={24} color="#bd9e4b" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Add from Map</Text>
              <Text style={styles.optionSubtitle}>Choose location on map</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onRequestClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 12,
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  optionSubtitle: {
    fontSize: 13,
    color: "#999",
    marginTop: 4,
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "600",
  },
});

export default AddMarketModal;
