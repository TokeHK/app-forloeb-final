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
  return (
    <div className={styles.subpage}>
      {data && 
        <div className={styles.subpageCard}>
          <Image src={`/${data.subpageImg}`} alt={data.desc} width={100} height={100} />
          <div>
            <h1>{data.header}</h1>
            <p>{data.text}</p>
          </div>
        </div>
      }
    </div>
  )
}

export default Page