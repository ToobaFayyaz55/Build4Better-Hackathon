import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ExpiringAlert = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.alert}
      >
        <View style={styles.iconBox}>
          <Feather name="package" size={20} color="#f59e0b" />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Expiring Soon</Text>
          <Text style={styles.message}>
            3 items need attention within the next 3 days
          </Text>
          <Text style={styles.link}>View Details →</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  alert: {
    backgroundColor: "#fffbeb",
    borderRadius: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: "#fcd34d",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconBox: {
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },
  link: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ca8a04",
  },
});

export default ExpiringAlert;
