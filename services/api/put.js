import axios from "axios";

export async function archiveList(url) {
  await axios.put(url, { value: true });
}

export async function updateChecklistItem(url, newState) {
  await axios.put(url, {
    state: newState,
  });
}
