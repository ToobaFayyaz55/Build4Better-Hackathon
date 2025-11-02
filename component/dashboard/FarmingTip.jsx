import { StyleSheet, Text, View } from "react-native";

const FarmingTip = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>💡 Farming Tip</Text>
        <Text style={styles.text}>
          Store tomatoes at room temperature to maintain their flavor and
          texture. Refrigeration can make them mealy.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#f0fdf4",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
});

export default FarmingTip;
