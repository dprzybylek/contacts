import type { Contact } from "../App.tsx";

export const getSortedData = (
  data: Contact[],
  selected: Set<string>
): Contact[] => {
  const selectedContacts: Contact[] = [];
  const unselectedContacts: Contact[] = [];

  // Create a map for quick lookup
  const dataMap = new Map<string, Contact>();
  data.forEach((contact) => {
    dataMap.set(contact.id, contact);
  });

  // Add selected contacts in the order they appear in the Set
  selected.forEach((id) => {
    const contact = dataMap.get(id);
    if (contact) {
      selectedContacts.push(contact);
    }
  });

  // Add unselected contacts in their original order
  data.forEach((contact) => {
    if (!selected.has(contact.id)) {
      unselectedContacts.push(contact);
    }
  });

  return [...selectedContacts, ...unselectedContacts];
};
