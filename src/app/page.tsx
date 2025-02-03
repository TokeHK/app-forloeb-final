"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { allData } from "./data";
import Card from "./components/Card";
import { useEffect, useState } from "react";

export default function Home() {

  const [enemies, setEnemies] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect( ()=>{

    //self invoked async function
    ( async ()=>{
      
      try {
        
        const enemiesData:[] = await allData();
        setEnemies(enemiesData);

      } catch (error){
        console.log("Error fetching data: ", error);
      } finally {

        setLoading(false);
      }

    } )()
  },[])


  return (
    <section className={styles.fp}>
      
    </section>
  );
}
