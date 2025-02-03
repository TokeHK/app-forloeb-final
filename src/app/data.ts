export const allData = async () => {

  const res = await fetch("http://localhost:3001/getAllData");
  
  if(!res.ok) throw new Error("failed to fetch data");

  return res.json();
}