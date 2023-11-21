import * as Contacts from "expo-contacts";
import { useAtom, useAtomValue } from "jotai";
import { atomEffect } from "jotai-effect";

import { contactsAtom } from "@atoms/contacts";

import { MAX_CONTACTS } from "../constants";

export const useContacts = () => {
  // TODO: memoize this
  useAtom(contactsEffect);
  const contacts = useAtomValue(contactsAtom);
  // TODO: handle loading state
  const loading = contacts.length === 0;

  return { contacts, loading };
};

const contactsEffect = atomEffect((_, set) => {
  let mounted = true;

  (async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status !== "granted") {
        // TODO: handle permission not granted
        console.log("Permission not granted");
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.ID,
          Contacts.Fields.ContactType,
          Contacts.Fields.Name,
          Contacts.Fields.JobTitle,
          // Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Emails,
          Contacts.Fields.Addresses,
          Contacts.Fields.Company,
          Contacts.Fields.Note,
        ],
      });
      // TODO: handle sorting

      if (mounted) {
        set(contactsAtom, data.slice(0, MAX_CONTACTS));
      }
    } catch (error) {
      console.error(error);
    }
  })();

  return () => (mounted = false);
});
