import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { notifs } from "../../constants/dashboard";

const NotificationsScreen = ({ setActiveTab, onClose }) => {
  const [notifications, setNotifications] = useState(notifs);

  const handleNotificationTap = (notification) => {
    // Switch tab based on notification type
    switch (notification.type) {
      case "freshness":
        setActiveTab("inventory");
        break;
      case "equipment":
        setActiveTab("equipment");
        break;
      case "market":
        setActiveTab("markets");
        break;
      case "community":
        setActiveTab("community");
        break;
      default:
        break;
    }

    // Close notifications panel
    onClose && onClose();

    // Mark the tapped notification as read
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Notifications</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          {unreadCount > 0 && (
            <Text style={styles.unreadText}>
              {unreadCount} unread notifications
            </Text>
          )}
        </View>

        {/* Notifications List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {notifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Feather name="check-circle" size={48} color="#bd9e4b" />
              <Text style={styles.emptyTitle}>All caught up!</Text>
              <Text style={styles.emptySubtitle}>
                You have no new notifications
              </Text>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  onPress={() => handleNotificationTap(notification)}
                  style={[
                    styles.notificationCard,
                    notification.read
                      ? styles.notificationCardRead
                      : styles.notificationCardUnread,
                  ]}
                >
                  <View style={styles.cardContent}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: `${notification.color}20` },
                      ]}
                    >
                      <Feather
                        name={notification.icon}
                        size={20}
                        color={notification.color}
                      />
                    </View>
                    <View style={styles.textContent}>
                      <View style={styles.titleRow}>
                        <Text style={styles.notificationTitle}>
                          {notification.title}
                        </Text>
                        {!notification.read && (
                          <View style={styles.unreadDot} />
                        )}
                      </View>
                      <Text style={styles.description}>
                        {notification.description}
                      </Text>
                      <Text style={styles.timestamp}>
                        {notification.timestamp}
                      </Text>
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actions}>
                    <TouchableOpacity
                      onPress={() => handleMarkAsRead(notification.id)}
                      style={styles.actionButton}
                    >
                      <Feather name="check-circle" size={18} color="#bd9e4b" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(notification.id)}
                      style={styles.actionButton}
                    >
                      <Feather name="trash-2" size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#111827" },
  closeButton: { fontSize: 22, color: "#111827" },
  unreadText: { fontSize: 14, color: "#4b5563" },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 12,
  },
  emptySubtitle: { fontSize: 14, color: "#4b5563", marginTop: 4 },
  listContainer: { padding: 16, gap: 12 },
  notificationCard: {
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  notificationCardRead: { backgroundColor: "#fffffa", borderColor: "#e5e7eb" },
  notificationCardUnread: {
    backgroundColor: "#bd9f4b21",
    borderColor: "#bfdbfe",
  },
  cardContent: { flexDirection: "row", flex: 1, alignItems: "flex-start" },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContent: { flex: 1, paddingRight: 8 },
  titleRow: { flexDirection: "row", alignItems: "center" },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1e40af",
    marginLeft: 8,
  },
  description: { fontSize: 12, color: "#4b5563", marginTop: 4, lineHeight: 16 },
  timestamp: { fontSize: 12, color: "#6b7280", marginTop: 8 },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
  },
  actionButton: { padding: 8 },
});

export default NotificationsScreen;
