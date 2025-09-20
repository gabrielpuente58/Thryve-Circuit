import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* The (tabs) group renders inside this Stack */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Standalone screens (not in tabs) go at root, like workout-page */}
      <Stack.Screen name="workout-page" options={{ headerShown: false }} />
    </Stack>
  );
}
