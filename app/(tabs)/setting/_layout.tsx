import React from "react";

import { Route, Stack } from "expo-router";

export default function stackNav() {
    return (
        <Stack
            screenOptions={{
                title: "Settings",
                headerStyle: {
                    backgroundColor: "#004643",
                },
                headerTintColor: "#fff"
            }}>
            <Stack.Screen name="settings" />
            <Stack.Screen name="about" />
            <Stack.Screen name="privacy" />
            <Stack.Screen name="quiz" />

        </Stack>
    )
}