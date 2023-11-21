import { ErrorBoundaryProps } from "expo-router";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  console.log("ErrorBoundary error", error);
  // TODO: Send error to Sentry or similar error tracking service.

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, gap: 8, maxWidth: 720, marginHorizontal: "auto" }}
      >
        <View
          style={{
            marginBottom: 12,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text role="heading" aria-level={1} style={styles.title}>
            Something went wrong
          </Text>
        </View>

        <Pressable onPress={retry}>
          {({ pressed }) => (
            <View
              style={[
                styles.buttonInner,
                pressed && { backgroundColor: "white" },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: pressed ? "black" : "white",
                  },
                ]}
              >
                Retry
              </Text>
            </View>
          )}
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 24,
    alignItems: "stretch",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: Platform.select({ web: 32, default: 24 }),
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  buttonInner: {
    transitionDuration: "100ms",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderColor: "white",
    borderWidth: 2,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
