import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { favoriteAtom } from "@atoms/favorite";
import { useContacts } from "@hooks/useContacts";

export default function Details() {
  const { id } = useLocalSearchParams();
  const { contacts, loading } = useContacts();
  const [favorite, setFavorite] = useAtom(favoriteAtom);

  const currentContact = contacts.find((contact) => contact.id === id);

  if (!currentContact) {
    return <Redirect href="/missing" />;
  }

  const { name, jobTitle, emails, company, note, addresses } = currentContact;
  const isFavorite = favorite?.id === id;

  const toggleFavorite = () => {
    setFavorite(isFavorite ? null : currentContact);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleFavorite}>
              <FontAwesome
                name={isFavorite ? "star" : "star-o"}
                size={30}
                color="grey"
              />
            </TouchableOpacity>
          ),
        }}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>Name: {name}</Text>
          {/* <Text>
            Phone Numbers:{" "}
            {phoneNumbers?.map(({ number }) => number).join(", ")}
          </Text> */}
          <Text>Emails: {emails?.map(({ email }) => email).join(", ")}</Text>
          <Text>Job Title: {jobTitle}</Text>
          <Text>Company: {company}</Text>
          <Text>Note: {note}</Text>
          <Text>
            Addresses:{" "}
            {addresses
              ?.map(
                ({ street, city, postalCode, country }) =>
                  `${street}, ${city}, ${postalCode}, ${country}`,
              )
              .join(", ")}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
