import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="InventoryScreen"
        options={{
          title: "Page name",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;