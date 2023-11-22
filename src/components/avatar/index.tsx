import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  variant?: "small" | "large";
};

export function Avatar({ name, variant = "large" }: Props) {
  const isLarge = variant === "large";
  const size = isLarge ? 70 : 30;

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size,
        },
      ]}
    >
      <Text
        style={[
          styles.avatarName,
          {
            fontSize: isLarge ? 45 : 16,
          },
        ]}
      >
        {name[0].toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  avatarName: {
    color: "#fff",
    fontWeight: "bold",
  },
});
