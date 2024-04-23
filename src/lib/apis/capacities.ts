import { getData } from "./fetch";
import { Capacity } from "@/types/type";

export async function fetchCapacities(): Promise<Capacity[]> {
  try {
    const responseData = await getData<Capacity[]>("/data/mock.json");
    if (responseData && Array.isArray(responseData)) {
      const Capacities: Capacity[] = responseData;
      return Capacities;
    } else {
      throw new Error("Invalid data format received from the server");
    }
  } catch (error) {
    console.error("Error fetching capacities:", error);
    throw error;
  }
}
