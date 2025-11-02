import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PostCard({ post, onEdit, onDelete, isMyPost }) {
  const [modalVisible, setModalVisible] = useState(false);

  const renderTimestamp = () => {
    const postDate = new Date(post.created_at);
    const now = new Date();
    const isSameDay =
      postDate.getDate() === now.getDate() &&
      postDate.getMonth() === now.getMonth() &&
      postDate.getFullYear() === now.getFullYear();

    return isSameDay
      ? postDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : postDate.toLocaleDateString([], {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.9}
      >
        <View style={styles.topRow}>
          <Text style={styles.phone}>{post.contact}</Text>
          <View style={styles.tagsContainer}>
            <Text style={styles.tag}>{post.category}</Text>
          </View>
        </View>

        <Text style={styles.title}>{post.title}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.timestamp}>{renderTimestamp()}</Text>

          {isMyPost && (
            <View style={styles.actionsRow}>
              <TouchableOpacity onPress={() => onEdit(post)}>
                <Feather name="edit-2" size={18} color="#bd9e4b" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onDelete(post.id)}
                style={{ marginLeft: 12 }}
              >
                <Ionicons name="trash" size={18} color="#bd9e4b" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContainer}>
            <Text style={styles.modalCategory}>{post.category}</Text>
            <Text style={styles.modalTitle}>{post.title}</Text>
            <Text style={styles.modalDescription}>{post.description}</Text>
            <Text style={styles.modalTag}>Tag: {post.tags}</Text>
            <Text style={styles.modalTimestamp}>
              {new Date(post.created_at).toLocaleString([], {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fffffa",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  phone: { fontSize: 12, color: "#bd9e4b" },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap" },
  tag: {
    padding: 4,
    marginLeft: 6,
    borderRadius: 4,
    fontSize: 12,
    backgroundColor: "#bd9f4b73",
  },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timestamp: { fontSize: 10, color: "#888" },
  actionsRow: { flexDirection: "row", alignItems: "center" },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "85%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  modalDescription: { fontSize: 14, color: "#333", marginBottom: 12 },
  modalTimestamp: { fontSize: 12, color: "#888" },
});
