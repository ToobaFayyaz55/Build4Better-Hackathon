import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreatePostModal from "../../component/bulletin/CreatePostModal";
import PostCard from "../../component/bulletin/PostCard";
import ProductCard from "../../component/bulletin/ProductCard";
import TabBar from "../../component/TabBar";
import { sampleProducts } from "../../constants/bulletin";
import { supabase } from "../../lib/supabase";

export default function KisaanPost() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const currentUserPhone = "0321-7788990";

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bulletin")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching posts:", error.message);
    else setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, []);

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowModal(true);
  };

  const handleDeletePost = async (postId) => {
    const { error } = await supabase.from("bulletin").delete().eq("id", postId);
    if (error) console.error("Delete error:", error.message);
    else fetchPosts();
  };

  const renderAllPosts = () => (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    />
  );

  const renderMyPosts = () => (
    <FlatList
      data={posts.filter((item) => item.contact === currentUserPhone)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
          isMyPost={true}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
    if (loading)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#bd9e4b" />
        </View>
      );
    if (selectedTab === "all") return renderAllPosts();
    if (selectedTab === "my") return renderMyPosts();
    if (selectedTab === "products") return renderProducts();
  };

  const Header = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>کسان Post</Text>
      <TouchableOpacity
        style={{ borderRadius: 12 }}
        onPress={() => {
          setEditingPost(null);
          setShowModal(true);
        }}
      >
        <LinearGradient
          colors={["#bd9e4b", "#fde68a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.addBtnGradient}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TabBar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={[
          { key: "all", label: "All Posts" },
          { key: "my", label: "My Posts" },
          { key: "products", label: "Products" },
        ]}
      />
      <View style={{ flex: 1, padding: 10 }}>{renderContent()}</View>

      <CreatePostModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingPost(null);
          fetchPosts();
        }}
        postToEdit={editingPost}
        currentUserPhone={currentUserPhone}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 10 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerText: { fontSize: 22, fontWeight: "700", color: "#111827" },
  addBtnGradient: {
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
