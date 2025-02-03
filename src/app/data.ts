import { DataType } from "./types/type";

export const allData = async (): Promise<DataType[]> =>  {
  const res = await fetch("http://localhost:3001/getAllData");
  
  if(!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
