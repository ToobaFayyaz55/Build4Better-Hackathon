import { Stack } from "expo-router";

export default function EquipmentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="EquipmentHub"
        options={{ title: "Equipment Hub", headerShown: false }}
      />
      <Stack.Screen
        name="MyEquipment"
        options={{ title: "My Equipment / میری مشینیں", headerShown: true }}
      />
      <Stack.Screen
        name="OthersEquipment"
        options={{ title: "Available Equipment / دستیاب مشینری", headerShown: true }}
      />
      <Stack.Screen
        name="AddEditScreen"
        options={{ title: "Add or Edit Equipment / نئی یا پرانی مشین", headerShown: true }}
      />
    </Stack>
  );
}
