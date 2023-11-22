import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { favoriteAtom } from "@atoms/favorite";
import { useContacts } from "@hooks/useContacts";
import { Avatar } from "@components/avatar";

import { findContactById } from "../utils";

export default function Details() {
  const { id } = useLocalSearchParams();
  const { contacts, loading } = useContacts();
  const [favorite, setFavorite] = useAtom(favoriteAtom);

  const currentContact = useMemo(
    () => findContactById(contacts, id?.toString()),
    [contacts, id],
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Stack.Screen />
        <ActivityIndicator />
      </View>
    );
  }

  if (!currentContact) {
    return <Redirect href="/missing" />;
  }

  const { name, jobTitle, emails, phoneNumbers, company, note, addresses } =
    currentContact;
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
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={toggleFavorite}>
                <FontAwesome
                  name={isFavorite ? "star" : "star-o"}
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View style={styles.wrapper}>
        <View style={styles.nameWrapper}>
          <Avatar name={name} />
          <Text style={styles.name}>{name}</Text>
        </View>
        {jobTitle && (
          <View style={styles.section}>
            <Text style={styles.fieldName}>Job Title:</Text>
            <Text>{jobTitle}</Text>
          </View>
        )}
        {company && (
          <View style={styles.section}>
            <Text style={styles.fieldName}>Company:</Text>
            <Text>{company}</Text>
          </View>
        )}
        {note && (
          <View style={styles.section}>
            <Text style={styles.fieldName}>Note:</Text>
            <Text>{note}</Text>
          </View>
        )}
        {phoneNumbers?.length && (
          <View style={styles.section}>
            <Text style={styles.fieldName}>Phone Numbers:</Text>
            {phoneNumbers?.map(({ number, digits }, indx) => (
              <Text key={indx}>{number || digits}</Text>
            ))}
          </View>
        )}
        {emails?.length && (
          <View style={styles.section}>
            <Text style={styles.fieldName}>Emails:</Text>
            {emails?.map(({ email }, indx) => <Text key={indx}>{email}</Text>)}
          </View>
        )}
        {addresses?.length && (
          <View style={styles.section}>
            <Text style={styles.fieldName}>Addresses:</Text>
            {addresses?.map(({ street, city, postalCode, country }, indx) => (
              <Text key={indx}>
                {street}, {city}, {postalCode}, {country}
              </Text>
            ))}
          </View>
        )}
      </View>
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
  headerRight: {
    alignItems: "center",
    marginRight: 16,
  },
  wrapper: {
    flex: 1,
    width: "100%",
    gap: 30,
    paddingHorizontal: 16,
  },
  nameWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  fieldName: {
    fontWeight: "bold",
  },
  section: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    fontSize: 30,
  },
});
