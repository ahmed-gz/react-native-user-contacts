import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAtomValue } from "jotai";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { favoriteAtom } from "@atoms/favorite";
import { useContacts } from "@hooks/useContacts";
import { Avatar } from "@components/avatar";

import { Contact } from "../types";
import { mapContactsToSections } from "../utils";

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
          sections={sections}
          renderSectionHeader={SectionHeader}
          renderItem={SectionItem}
          keyExtractor={({ id }) => `basicListEntry-${id}`}
        />
      )}
    </View>
  );
}

function SectionHeader({
  section: { title },
}: {
  section: SectionListData<Contact, { title: string }>;
}) {
  return title === "star" ? (
    <FontAwesome style={styles.sectionHeader} name="star" color="black" />
  ) : (
    <Text style={styles.sectionHeader}>{title}</Text>
  );
}

function SectionItem({
  item: { id, name, firstName, middleName, lastName },
}: SectionListRenderItemInfo<Contact>) {
  return (
    <Link href={{ pathname: "details", params: { id } }} asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.item, pressed && { backgroundColor: "#ccc" }]}>
            <Avatar name={name} variant="small" />
            <Text>
              {[firstName, middleName, lastName].filter(Boolean).join(" ")}
            </Text>
          </View>
        )}
      </Pressable>
    </Link>
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
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "rgb(225 225 225)",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
