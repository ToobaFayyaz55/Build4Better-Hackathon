import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CreatePostModal from "../../component/bulletin/CreatePostModal";
import PostCard from "../../component/bulletin/PostCard";
import ProductCard from "../../component/bulletin/ProductCard";
import TabBar from "../../component/bulletin/TabBar";
import { samplePosts, sampleProducts } from "../../constants/bulletin";

export default function KisaanPost() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [posts, setPosts] = useState(samplePosts);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // --- Post handlers ---
  const createOrUpdatePost = (postData) => {
    if (editingPost) {
      setPosts(
        posts.map((p) => (p.id === editingPost.id ? { ...p, ...postData } : p))
      );
    } else {
      const newPost = { ...postData, id: (posts.length + 1).toString() };
      setPosts([newPost, ...posts]);
    }
    setEditingPost(null);
    setShowModal(false);
  };

  const deletePost = (postId) => setPosts(posts.filter((p) => p.id !== postId));

  const editPost = (post) => {
    setEditingPost(post);
    setShowModal(true);
  };

  // --- List renderers ---
  const renderPosts = () => (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PostCard post={item} onEdit={editPost} onDelete={deletePost} />
      )}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderProducts = () => (
    <FlatList
      data={sampleProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard brandData={item} />}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderContent = () => {
    if (selectedTab === "all" || selectedTab === "my") return renderPosts();
    if (selectedTab === "products") return renderProducts();
  };

  // --- Header ---
  const Header = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>KISAAN POST</Text>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          setEditingPost(null);
          setShowModal(true);
        }}
      >
        <Ionicons name="add" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <TabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <View style={{ flex: 1, padding: 10 }}>{renderContent()}</View>

      <CreatePostModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onPost={createOrUpdatePost}
        postToEdit={editingPost}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 10 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 10,
  },
  headerText: { fontSize: 22, fontWeight: "600", color: "#111827" },
  addBtn: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#bd9e4b",
  },
});
