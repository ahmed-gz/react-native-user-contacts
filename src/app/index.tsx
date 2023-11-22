import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAtomValue } from "jotai";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { favoriteAtom } from "@atoms/favorite";
import { useContacts } from "@hooks/useContacts";

import { mapContactsToSections } from "utils";

export default function Home() {
  const { contacts, loading } = useContacts();
  const favorite = useAtomValue(favoriteAtom);

  const sections = useMemo(() => {
    return [
      ...(favorite ? [{ title: "star", data: [favorite] }] : []),
      ...mapContactsToSections(contacts),
    ];
  }, [contacts, favorite]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Stack.Screen options={{ headerShown: false }} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          style={styles.sectionList}
          sections={sections}
          renderItem={({ item: { id, firstName, middleName, lastName } }) => (
            <Link
              style={styles.item}
              href={{ pathname: "details", params: { id } }}
            >
              <Text>
                {[firstName, middleName, lastName].filter(Boolean).join(" ")}
              </Text>
            </Link>
          )}
          renderSectionHeader={({ section: { title } }) =>
            title === "star" ? (
              <FontAwesome
                style={styles.sectionHeader}
                name="star"
                size={30}
                color="grey"
              />
            ) : (
              <Text style={styles.sectionHeader}>{title}</Text>
            )
          }
          keyExtractor={({ id }) => `basicListEntry-${id}`}
        />
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
  sectionList: {
    gap: 10,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
