import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAtomValue } from "jotai";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { favoriteAtom } from "@atoms/favorite";
import { useContacts } from "@hooks/useContacts";

export default function Home() {
  const { contacts, loading } = useContacts();
  const favorite = useAtomValue(favoriteAtom);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Stack.Screen options={{ headerShown: false }} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {favorite && (
            <>
              <FontAwesome name="star" size={30} color="grey" />
              <Text key={favorite.id}>{favorite.name}</Text>
            </>
          )}
          {contacts.map(({ id, name }) => (
            <Link key={id} href={{ pathname: "details", params: { id } }}>
              <View style={styles.row}>
                <Text>{name}</Text>
              </View>
            </Link>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    gap: 10,
    flexDirection: "row",
  },
});
