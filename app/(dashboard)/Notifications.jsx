import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

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
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-4 py-4">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-2xl font-bold text-gray-900">Notifications</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-gray-600 text-lg">✕</Text>
          </TouchableOpacity>
        </View>
        {unreadCount > 0 && (
          <Text className="text-sm text-gray-600">
            {unreadCount} unread notifications
          </Text>
        )}
      </View>

      {/* Notifications List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View className="flex-1 items-center justify-center py-12">
            <Feather name="check-circle" size={48} color="#bd9e4b" />
            <Text className="text-lg font-semibold text-gray-900 mt-3">
              All caught up!
            </Text>
            <Text className="text-sm text-gray-600 mt-1">
              You have no new notifications
            </Text>
          </View>
        ) : (
          <View className="p-4 space-y-3">
            {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  onPress={() => handleNotificationTap(notification)}
                  className={`rounded-lg p-4 flex-row items-start justify-between border ${
                    notification.read ? "bg-white border-gray-200" : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <View className="flex-row flex-1 items-start">
                    <View
                      className="w-10 h-10 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: `${notification.color}20` }}
                    >
                      <Feather name={notification.icon} size={20} color={notification.color} />
                    </View>
                    <View className="flex-1 pr-2">
                      <View className="flex-row items-center">
                        <Text className="text-sm font-semibold text-gray-900 flex-1">
                          {notification.title}
                        </Text>
                        {!notification.read && (
                          <View className="w-2 h-2 rounded-full bg-blue-600 ml-2" />
                        )}
                      </View>
                      <Text className="text-xs text-gray-600 mt-1 leading-4">
                        {notification.description}
                      </Text>
                      <Text className="text-xs text-gray-500 mt-2">
                        {notification.timestamp}
                      </Text>
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View className="flex-row items-center space-x-2 ml-2">
                    <TouchableOpacity
                      onPress={() => handleMarkAsRead(notification.id)}
                      className="p-2"
                    >
                      <Feather name="check-circle" size={18} color="#bd9e4b" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(notification.id)}
                      className="p-2"
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

export default NotificationsScreen;
