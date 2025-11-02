import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        options={{
          title: "Notifications",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
