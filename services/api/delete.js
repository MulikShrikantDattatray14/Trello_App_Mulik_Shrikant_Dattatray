import axios from "axios";

export async function deleteItem(url) {
  await axios.delete(url);
}
