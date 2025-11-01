import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="EquipmentHub"
        options={{
          title: "My Equipment / میری مشینیں",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;