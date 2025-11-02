import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Market"
        options={{
          headerShown: true,
          title: "Sahoolat Bazaar",
          headerStyle: {
            backgroundColor: "#bd9e4b",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
    </Stack>
  );
};

export default _layout;