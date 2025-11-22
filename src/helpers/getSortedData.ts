import type { Contact } from "../App.tsx";

export const getSortedData = (
  data: Contact[],
  selected: Set<string>
): Contact[] => {
  const selectedContacts: Contact[] = [];
  const unselectedContacts: Contact[] = [];

  const dataMap = new Map<string, Contact>();
  data.forEach((contact) => {
    dataMap.set(contact.id, contact);
  });

  selected.forEach((id) => {
    const contact = dataMap.get(id);
    if (contact) {
      selectedContacts.push(contact);
    }
  });

  data.forEach((contact) => {
    if (!selected.has(contact.id)) {
      unselectedContacts.push(contact);
    }
  });

  return [...selectedContacts, ...unselectedContacts];
};
