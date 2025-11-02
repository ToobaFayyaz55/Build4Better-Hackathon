import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const tabs = [
  { key: "all", label: "All Posts" },
  { key: "my", label: "My Posts" },
  { key: "products", label: "Products" },
];

export default function TabBar({ selectedTab, setSelectedTab }) {
  const [tabsReady, setTabsReady] = useState(false);
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const underlineWidthAnim = useRef(new Animated.Value(0)).current;
  const tabCenters = useRef({});
  const textWidths = useRef({});

  const handleTabLayout = (tabKey, layout) => {
    const { x, width } = layout;
    textWidths.current[tabKey] = width;
    tabCenters.current[tabKey] = x + width / 2;

    if (Object.keys(tabCenters.current).length === tabs.length) {
      setTabsReady(true);
      const center = tabCenters.current[selectedTab];
      const textWidth = textWidths.current[selectedTab];
      underlineAnim.setValue(center - textWidth / 2);
      underlineWidthAnim.setValue(textWidth);
    }
  };

  useEffect(() => {
    if (!tabsReady) return;
    const center = tabCenters.current[selectedTab];
    const textWidth = textWidths.current[selectedTab];
    Animated.parallel([
      Animated.spring(underlineAnim, {
        toValue: center - textWidth / 2,
        useNativeDriver: false,
      }),
      Animated.spring(underlineWidthAnim, {
        toValue: textWidth,
        useNativeDriver: false,
      }),
    ]).start();
  }, [selectedTab, tabsReady]);

  const renderTab = (tab) => {
    const isActive = tab.key === selectedTab;
    return (
      <TouchableOpacity
        key={tab.key}
        style={{ flex: 1, alignItems: "center", paddingVertical: 12 }}
        onPress={() => setSelectedTab(tab.key)}
        onLayout={(e) => handleTabLayout(tab.key, e.nativeEvent.layout)}
      >
        <Text
          style={[
            styles.tabText,
            { color: isActive ? "#bd9e4b" : "#888", fontSize: 14 },
          ]}
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tabContainer}>
      {tabs.map(renderTab)}
      {tabsReady && (
        <Animated.View
          style={[
            styles.underline,
            {
              width: underlineWidthAnim,
              transform: [{ translateX: underlineAnim }],
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: { flexDirection: "row", marginTop: 10, paddingHorizontal: 20 },
  tabText: { fontWeight: "medium" },
  underline: {
    height: 2.5,
    backgroundColor: "#bd9e4b",
    position: "absolute",
    bottom: 0,
  },
});
