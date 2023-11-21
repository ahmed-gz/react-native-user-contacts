import { atom } from "jotai";

import { FavoriteContact } from "../types";

export const favoriteAtom = atom<FavoriteContact>(null);
