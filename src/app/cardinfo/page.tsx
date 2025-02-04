"use client";

import React, { useEffect, useState } from 'react';
import styles from "@/app/page.module.css";
import Image from "next/image";
import { getById } from './data';
import { TextArray } from '../types/type';
import { useSearchParams } from 'next/navigation';
import useWindowWidth from "@/app/hooks/useWindowWidth";
import Link from 'next/link';


const Page: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const searchParams = useSearchParams();//ser på URL parameters
  const id = searchParams.get('id');

  const width = useWindowWidth();
  const breakPoint = 768;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await getById(id);
        setData(result);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.subpage} style={{ backgroundColor: `${data.bg}` }}>


      <div className={styles.subpageCard}>
        {width < breakPoint ? 
          //¤MOBILE - se i CSS
          <Image priority className={styles.mobileImg} src={`/${data.frontMobileImg}`} alt={data.desc} width={100} height={100} />
        : //¤DESKTOP
          <Image priority src={`/${data.subpageImg}`} alt={data.desc} width={100} height={100} />
        } 
        <div>
          <h1>{data.header}</h1>
          <p>{data.text1}</p>
          <p>{data.text2}</p>

          {Array.isArray(data.text3) ? (
            <ul className={styles.subContact}>
              {data.text3.map((item: TextArray, index: number) => (
                <li key={data.name + index} id={`contact-${data._id}`}>
                  <Image src={`/${item.img}`} alt={item.email} width={200} height={200} />
                  <span>{item.email}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>{data.text3}</p>
          )}
          <span className={styles.subName}>{data.name}</span>
        </div>

        {width < breakPoint ? //logo til mobile
        <Link href={"/"} className={styles.mobileLogo}>
          <Image src={`/${data.logo}`} alt={data.desc} width={100} height={100} />
        </Link>
        : 
        <>{/* empty desktop */}</>
        }
      </div>
    </div>
  );
};

export default Page;