import { Feather } from "@expo/vector-icons";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const MarketDetailModal = ({
  visible,
  onRequestClose,
  market,
  onDelete,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View style={styles.detailModalContainer}>
        <View style={styles.detailModalContent}>
          <View style={styles.detailHeader}>
            <Text style={styles.detailTitle}>{market?.name}</Text>
            <TouchableOpacity onPress={onRequestClose}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Tags */}
            {market?.tags && market?.tags.length > 0 && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Tags</Text>
                <View style={styles.detailTagsContainer}>
                  {market?.tags.map((tag, idx) => (
                    <View key={idx} style={styles.detailTagBadge}>
                      <Text style={styles.detailTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Notes */}
            {market?.notes && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Notes</Text>
                <Text style={styles.detailNotesText}>{market?.notes}</Text>
              </View>
            )}

            {/* Coordinates */}
            {market?.latitude && market?.longitude && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Coordinates</Text>
                <Text style={styles.detailCoordsText}>
                  {market?.latitude.toFixed(4)}, {market?.longitude.toFixed(4)}
                </Text>
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.detailActions}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  if (!market) return;
                  Alert.alert(
                    "Delete Market",
                    "Are you sure you want to delete this market?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => {},
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: () => onDelete(market?.id),
                        style: "destructive",
                      },
                    ]
                  );
                }}
              >
                <Feather name="trash-2" size={20} color="white" />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeDetailButton}
              onPress={onRequestClose}
            >
              <Text style={styles.closeDetailButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  detailModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  detailModalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingTop: 20,
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  detailTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  detailTagBadge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  detailTagText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  detailNotesText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  detailCoordsText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "monospace",
  },
  detailActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 16,
  },
  deleteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  closeDetailButton: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    alignItems: "center",
  },
  closeDetailButtonText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600",
  },
});

export default MarketDetailModal;
