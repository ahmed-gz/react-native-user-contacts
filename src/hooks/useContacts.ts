import * as Contacts from "expo-contacts";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomEffect } from "jotai-effect";

import { contactsAtom } from "@atoms/contacts";

import { MAX_CONTACTS } from "../constants";

const loadingAtom = atom(true);

export const useContacts = () => {
  useAtom(contactsEffect);

  const contacts = useAtomValue(contactsAtom);
  const loading = useAtomValue(loadingAtom);

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
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        sort: Contacts.SortTypes.FirstName,
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

      if (mounted) {
        set(contactsAtom, data.slice(0, MAX_CONTACTS));
      }
    } catch (error) {
      console.error(error);
    } finally {
      set(loadingAtom, false);
    }
  })();

  return () => {
    mounted = false;
  };
});
