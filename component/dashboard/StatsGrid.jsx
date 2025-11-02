import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const StatsGrid = ({ stats, onStatPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {stats.map((stat) => (
          <TouchableOpacity
            key={stat.id}
            onPress={() => onStatPress(stat.id)}
            style={[styles.card, { width: "48%" }]}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${stat.color}20` },
              ]}
            >
              <Feather name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.title}>{stat.title}</Text>
            <Text style={styles.description}>{stat.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#4b5563",
  },
});

export default StatsGrid;
