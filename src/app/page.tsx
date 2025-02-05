"use client"

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Card from "./components/Card";
import CardMobile from "./components/CardMobile";
import { allData } from "./data";
import { DataType } from "./types/type";
import useWindowWidth from "@/app/hooks/useWindowWidth"
import Link from "next/link";

  
export default function Home() {

  const width = useWindowWidth();
  const breakPoint = 768;

  const [myData, setMyData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect( ()=>{

    const fetchData = async () => {
      try {
        const jsonData = await allData();
        setMyData(jsonData);
      } catch (error) {
        console.log("Error fetching data: ", error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  if (loading === true) {
    return(
      <>Loading...</>
    )
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className={styles.fp}>
      <div>
        <div className={styles.centered}>
          <Link href={"/"}  className={styles.logo}>
            <Image priority src={"/logo/logo-final.png"} alt="" width={1000} height={1000}/>
          </Link>
          <section className={styles.cards}>
            {myData.length > 0 ? (
              myData.map((item: DataType) => (
                <div key={item._id}>
                  {width < breakPoint ? <CardMobile data={item} /> : <Card data={item} />}
                </div>
                ))
              ) : (
                <p>No data available</p>
              )}
          </section>
          <span>And yet... more to come</span>
        </div>
      </div>
    
    </section>
  );
}
