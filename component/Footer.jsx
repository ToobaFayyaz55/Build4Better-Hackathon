import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Footer = ({ active, onNavigate }) => {
  const navItems = [
    { key: "inventory", icon: "package" },
    { key: "markets", icon: "map-pin" },
    { key: "home", icon: "home" },
    { key: "equipment", icon: "tool" },
    { key: "community", icon: "message-circle" },
  ];

  const scaleAnim = useRef(navItems.map(() => new Animated.Value(1))).current;
  const translateYAnim = useRef(
    navItems.map(() => new Animated.Value(0))
  ).current;

  const animateTabs = (activeKey) => {
    navItems.forEach((item, index) => {
      const isActive = item.key === activeKey;

      Animated.parallel([
        Animated.timing(scaleAnim[index], {
          toValue: isActive ? 1.5 : 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim[index], {
          toValue: isActive ? -20 : 0, // negative to pop out
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  useEffect(() => {
    animateTabs(active);
  }, [active]);

  const handlePress = (key) => {
    onNavigate && onNavigate(key);
  };

  return (
    <View style={styles.container}>
      {navItems.map((item, index) => {
        const isActive = active === item.key;

        return (
          <TouchableWithoutFeedback
            key={item.key}
            onPress={() => handlePress(item.key)}
          >
            <Animated.View
              style={[
                styles.iconWrapper,
                {
                  transform: [
                    { scale: scaleAnim[index] },
                    { translateY: translateYAnim[index] },
                  ],
                  zIndex: isActive ? 10 : 1, // active circle above others
                },
              ]}
            >
              {isActive ? (
                <LinearGradient
                  colors={["#bd9e4b", "#fde68a"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.gradientCircle, { marginBottom: -20 }]} // extend past footer
                >
                  <Feather name={item.icon} size={28} color="#fff" />
                </LinearGradient>
              ) : (
                <Feather name={item.icon} size={28} color="#9ca3af" />
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    // paddingBottom: 15,
    backgroundColor: "#fff",
  },
  iconWrapper: {
    width: 50,
    height: 30,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "center",
  },
  gradientCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#bd9e4b",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default Footer;
