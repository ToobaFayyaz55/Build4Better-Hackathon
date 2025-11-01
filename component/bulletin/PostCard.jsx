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

export default function PostCard({ post, onEdit, onDelete }) {
  const [modalVisible, setModalVisible] = useState(false);

  const renderTimestamp = () => {
    const postDate = new Date(post.timestampFull);
    const now = new Date();
    const isSameDay =
      postDate.getDate() === now.getDate() &&
      postDate.getMonth() === now.getMonth() &&
      postDate.getFullYear() === now.getFullYear();

    if (isSameDay) {
      return postDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return postDate.toLocaleDateString([], {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.topRow}>
          <Text style={styles.phone}>{post.phone}</Text>
          <View style={styles.tagsContainer}>
            {post.tags.map((tag, idx) => (
              <Text
                key={idx}
                style={[styles.tag, { backgroundColor: "#bd9f4b73" }]}
              >
                {tag}
              </Text>
            ))}
          </View>
        </View>

        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.timestamp}>{renderTimestamp()}</Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => onEdit(post)}>
            <Feather name="edit-2" size={18} color="#bd9e4b" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(post.id)}>
            <Ionicons
              name="trash"
              size={18}
              color="#bd9e4b"
              style={{ marginLeft: 16 }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Modal showing full description */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{post.title}</Text>
            <Text style={styles.modalDescription}>{post.description}</Text>
            <Text style={styles.modalTimestamp}>
              {new Date(post.timestampFull).toLocaleString([], {
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
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: "#0e0d0dff",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  phone: { fontSize: 12, color: "#bd9e4b" },
  title: { fontSize: 16, fontWeight: "600", marginVertical: 2 },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap" },
  tag: { padding: 4, marginLeft: 6, borderRadius: 4, fontSize: 12 },
  timestamp: { fontSize: 10, color: "#888", textAlign: "right", marginTop: 4 },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 6,
  },
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
  modalTimestamp: { fontSize: 12, color: "#888", marginBottom: 12 },
});
