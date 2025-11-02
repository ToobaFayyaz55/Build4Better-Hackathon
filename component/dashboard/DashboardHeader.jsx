import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import NotificationBell from "./NotificationBell";

const DashboardHeader = ({ unreadNotifications, onNotificationPress }) => {
  return (
    <LinearGradient
      colors={["#8e793e", "#d4af37", "#bd9e4b"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <View>
        <Text style={styles.title}>سبز Umeed</Text>
      </View>
      <NotificationBell
        unreadCount={unreadNotifications}
        onPress={onNotificationPress}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    paddingTop: 70,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
});

export default DashboardHeader;
