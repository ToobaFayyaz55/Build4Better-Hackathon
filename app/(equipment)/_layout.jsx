import { Stack } from "expo-router";

export default function EquipmentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="EquipmentHub"
        options={{ title: "Equipment Hub", headerShown: false }}
      />
    </Stack>
  );
}
