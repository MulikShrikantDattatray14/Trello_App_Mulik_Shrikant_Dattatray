import axios from "axios";

export async function getAllItems(url) {
  const data = await axios.get(url);
  return data.data;
}
