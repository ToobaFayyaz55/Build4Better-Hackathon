import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const _layout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Home (Sign Up/ LogIn)",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(dashboard)"
          options={{
            title: "Dashoard",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(inventory)"
          options={{
            title: "Inventory",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(equipment)"
          options={{
            title: "Equipment",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(market)"
          options={{
            title: "Market",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(bulletin)"
          options={{
            title: "Bulletin",
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default _layout;
