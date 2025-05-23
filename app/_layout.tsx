import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { Platform, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

function BottomInsetBackground() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        height: insets.bottom,
        backgroundColor: "#513eb8",
      }}
    />
  );
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
  });

  // Prevent auto-hide safely once, inside a useEffect (important for web)
  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(() => {});
  }, []);

  // When fonts loaded, hide splash screen
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#f0f0f0" },
          gestureEnabled: false,
        }}
      />
      {Platform.OS === "ios" && <BottomInsetBackground />}
    </SafeAreaProvider>
  );
}
