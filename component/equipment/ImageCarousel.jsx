import { Dimensions, FlatList, Image } from "react-native";

const { width } = Dimensions.get("window");

export default function ImageCarousel({ images }) {
  return (
    <FlatList
      data={images}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={{ width, height: width * 0.6 }}
          className="object-cover"
        />
      )}
    />
  );
}
