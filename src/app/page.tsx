"use client"

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Card from "./components/Card";
import { allData } from "./data";
import { DataType } from "./types/type";

export default function Home() {

  const [myData, setMyData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect( ()=>{

    //self invoked async function
    ( async ()=>{
      
      try {
        
        const jsonData = await allData();
        setMyData(jsonData);
      } catch (error){
        console.log("Error fetching data: ", error);
      } finally {

        setLoading(false);
      }

    } )()
  },[])
  
  if (loading === true) {
    return(
      <>Loading...</>
    )
  }

  return (
    <section className={styles.fp}>
    
      <div className={styles.centered}>
        <Image priority src={"/logo/logo-final.png"} alt="" width={100} height={100} className={styles.logo}/>
          <section className={styles.cards}>
            {myData.length > 0 &&
            myData.map((item: DataType) => (
              <Card key={item._id} data={item} />
            ))}
          </section>
          <span>And yet... more to come</span>
      </div>
    </section>
  );
}
