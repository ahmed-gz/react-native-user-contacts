import { Contact as ExpoContact } from "expo-contacts";

export type Contact = ExpoContact;
export type FavoriteContact = Contact | null | undefined;

export type Section = {
  title: string;
  data: Contact[];
};
