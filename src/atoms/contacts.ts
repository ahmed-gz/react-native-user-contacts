import * as Contacts from "expo-contacts";
import { atom } from "jotai";
import { atomEffect } from "jotai-effect";

import { MAX_CONTACTS } from "../constants";
import { Contact } from "../types";

export const contactsAtom = atom<Contact[]>([]);
export const loadingAtom = atom(true);

export const contactsEffect = atomEffect((_, set) => {
  let mounted = true;

  (async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status !== "granted") {
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
          Contacts.Fields.PhoneNumbers,
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
