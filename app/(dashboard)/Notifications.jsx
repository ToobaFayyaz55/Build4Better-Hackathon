import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NotificationsScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "freshness",
      title: "Tomatoes Expiring Soon",
      description: "3 tomatoes will expire in 2 days",
      timestamp: "2 hours ago",
      icon: "clock",
      color: "#eab308",
      read: false,
    },
    {
      id: 2,
      type: "equipment",
      title: "Equipment Booking Confirmed",
      description: "Your diesel pump booking is confirmed for tomorrow",
      timestamp: "5 hours ago",
      icon: "zap",
      color: "#22c55e",
      read: false,
    },
    {
      id: 3,
      type: "market",
      title: "New Market Added Nearby",
      description: "A new vegetable market opened 5km away",
      timestamp: "1 day ago",
      icon: "map-pin",
      color: "#3b82f6",
      read: false,
    },
    {
      id: 4,
      type: "community",
      title: "New Comment on Your Post",
      description: "Farmer Rajesh commented on your offer",
      timestamp: "2 days ago",
      icon: "message-circle",
      color: "#8b5cf6",
      read: true,
    },
    {
      id: 5,
      type: "freshness",
      title: "Expired Items Alert",
      description: "2 items have expired and should be removed",
      timestamp: "3 days ago",
      icon: "alert-circle",
      color: "#ef4444",
      read: true,
    },
  ]);

  const handleNotificationTap = (notification) => {
    // Route based on notification type
    switch (notification.type) {
      case "freshness":
        router.push({
          pathname: "/inventory",
          params: { filter: "expired" },
        });
        break;
      case "equipment":
        router.push("/equipment");
        break;
      case "market":
        router.push("/market");
        break;
      case "community":
        router.push("/bulletin");
        break;
      default:
        break;
    }
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity onPress={() => router.back()}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  closeButton: {
    fontSize: 24,
    color: "#4b5563",
  },
  unreadText: {
    fontSize: 14,
    color: "#4b5563",
  },
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
  emptySubtitle: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  notificationCard: {
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  notificationCardRead: {
    backgroundColor: "white",
    borderColor: "#e5e7eb",
  },
  notificationCardUnread: {
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
  },
  cardContent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContent: {
    flex: 1,
    paddingRight: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
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
  description: {
    fontSize: 12,
    color: "#4b5563",
    marginTop: 4,
    lineHeight: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 8,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
  },
});

export default NotificationsScreen;
