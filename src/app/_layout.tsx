import { Stack } from "expo-router";
import { Provider } from "jotai";
import React from "react";
import {
  SafeAreaView,
  StatusBar as StatusBarRN,
  StyleSheet,
} from "react-native";

export { ErrorBoundary } from "@components/error-boundary";

export default function RootLayout() {
  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Stack />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBarRN.currentHeight,
    backgroundColor: "#fff",
  },
});
