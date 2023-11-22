import { useAtom, useAtomValue } from "jotai";

import { contactsAtom, contactsEffect, loadingAtom } from "@atoms/contacts";

export const useContacts = () => {
  useAtom(contactsEffect);

  const contacts = useAtomValue(contactsAtom);
  const loading = useAtomValue(loadingAtom);

  return { contacts, loading };
};
