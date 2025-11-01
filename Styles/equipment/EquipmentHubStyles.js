import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 16, alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#bd9e4b",
  },
  tabText: {
    color: "#777",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#bd9e4b",
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});
