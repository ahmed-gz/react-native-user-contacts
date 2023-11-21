import { atom } from "jotai";

import { Contact } from "../types";

export const contactsAtom = atom<Contact[]>([]);
