import { Contact, Section } from "./types";

export const mapContactsToSections = (contacts: Contact[]) => {
  return contacts.reduce<Section[]>((acc, contact) => {
    const letter = contact.name[0].toUpperCase();
    const section = acc.find(({ title }) => title === letter);

    if (section) {
      section.data.push(contact);
    } else {
      acc.push({
        title: letter,
        data: [contact],
      });
    }

    return acc;
  }, []);
};

export const findContactById = (contacts: Contact[], id?: Contact["id"]) => {
  return contacts.find((contact) => contact.id === id);
};
