import { TrickingObjType } from "types/tricking-obj.types";

export async function getAllTricks() {
  const res = await fetch(process.env.TRICKTIONARY_API_URL)
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data as TrickingObjType
}
