import { DataType } from "./types/type";

export const allData = async (): Promise<DataType[]> => {
  try {
    const res = await fetch("http://localhost:3001/getAllData");

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in allData:", error);
    throw new Error("An error occurred while fetching data.");
  }
};
