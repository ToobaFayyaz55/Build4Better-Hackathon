import { StyleSheet, Text, View } from "react-native";
import NotificationBell from "./NotificationBell";

const DashboardHeader = ({ unreadNotifications, onNotificationPress }) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Sabz Souch</Text>
        <Text style={styles.subtitle}>Your Smart Farming Companion</Text>
      </View>
      <NotificationBell
        unreadCount={unreadNotifications}
        onPress={onNotificationPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#bd9e4b",
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#d1fae5",
  },
});

export default DashboardHeader;
