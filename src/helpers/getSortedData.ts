import type { Contact } from "../App.tsx";

export const getSortedData = (
  data: Contact[],
  selected: Set<string>
): Contact[] => {
  const selectedContacts: Contact[] = [];
  const unselectedContacts: Contact[] = [];

  data.forEach((contact) => {
    if (selected.has(contact.id)) {
      selectedContacts.push(contact);
    } else {
      unselectedContacts.push(contact);
    }
  });

  return [...selectedContacts, ...unselectedContacts];
};
