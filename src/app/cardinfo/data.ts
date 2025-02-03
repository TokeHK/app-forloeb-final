import { TextArray, DataType } from "../types/type";

export const getById = async (id: string): Promise<DataType> => {
  const res = await fetch(`http://localhost:3001/getById/${id}`);
  
  if (!res.ok) throw new Error("failed to fetch data");

  return res.json(); // This now returns a `Promise<Data>`, so TypeScript will know what to expect.
}
