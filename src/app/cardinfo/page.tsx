import React from 'react'
import styles from "@/app/page.module.css"
import Image from "next/image"
import { getById } from './data'

type RouterParams = {
  searchParams : {
    id : string
  }
}

const Page = async (props:RouterParams) => {
  const id = props.searchParams.id;
  const data = await getById(id);

  const isText3Array = Array.isArray(data.text3);

  return (
    <div className={styles.subpage}>
      {data && 
        <div className={styles.subpageCard}>
          <Image src={`/${data.subpageImg}`} alt={data.desc} width={100} height={100} />
          <div>
            <h1>{data.header}</h1>
            <p>{data.text1}</p>
            <p>{data.text2}</p>

             {isText3Array ? (
              <ul>
                {data.text3.map((item:any, index:Number) => (
                  <li key={data.name + index}>
                    <Image src={`/${item.img}`} alt={item.email} width={200} height={200} />
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{data.text3}</p>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default Page