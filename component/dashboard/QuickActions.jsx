import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QuickActions = ({ onAddProducePress, onFindMarketsPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quick Actions</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={onAddProducePress}
          style={styles.button}
        >
          <Feather name="package" size={24} color="#22c55e" />
          <Text style={styles.buttonText}>Add Produce</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onFindMarketsPress}
          style={styles.button}
        >
          <Feather name="trending-up" size={24} color="#3b82f6" />
          <Text style={styles.buttonText}>Find Markets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginTop: 8,
  },
});

export default QuickActions;
