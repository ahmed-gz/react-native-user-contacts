import { ErrorBoundaryProps } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  console.error(error);
  // TODO: Send error to Sentry or similar error tracking service.

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ gap: 50 }}>
        <Text role="heading" aria-level={1} style={styles.title}>
          Something went wrong
        </Text>

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
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
