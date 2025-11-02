// app/_layout.jsx
import { Stack } from "expo-router";
import "../global.css";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="(inventory)" options={{ headerShown: false }} />
      <Stack.Screen name="(equipment)" options={{ headerShown: false }} />
      <Stack.Screen name="(market)" options={{ headerShown: false }} />
      <Stack.Screen name="(bulletin)" options={{ headerShown: false }} />
      <Stack.Screen name="Layout" options={{ headerShown: false }} />
    </Stack>
  );
}
