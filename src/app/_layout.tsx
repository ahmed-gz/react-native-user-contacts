import { SplashScreen, Stack } from "expo-router";
import { Provider } from "jotai";
import React from "react";

export { ErrorBoundary } from "@components/error-boundary";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider>
      <Stack />
    </Provider>
  );
}
