import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const MarketHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Sahoolat Bazaar</Text>
      <Feather name="map-pin" size={28} color="#bd9e4b" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    top: 20,
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    top: 20,
  },
});

export default MarketHeader;
