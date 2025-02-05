"use client";

import React, { useEffect, useState } from 'react';
import styles from "@/app/page.module.css";
import Image from "next/image";
import { getById } from './data';
import { TextArray } from '../types/type';
import { useSearchParams } from 'next/navigation';
import useWindowWidth from "@/app/hooks/useWindowWidth";
import Link from 'next/link';
import Modal from '../components/Modal';

const Page: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const width = useWindowWidth();
  const breakPoint = 768;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const handleModalClose = () => {
    setIsModalOpen(false); 
  };
  const handleFormSubmit = (data: { name: string; email: string; topic: string; message: string }) => {
    setFormData(data); //Save data
    setIsModalOpen(false); //Close modal
    console.log("Data Submitted:", data);
  };

  const [selectedItem, setSelectedItem] = useState<{ email: string; img: string; bgColor: string } | undefined>(undefined);

  const handleOpenModal = (item: TextArray) => {
  const newSelectedItem = {
    email: item.email,
    img: item.img,
    bgColor: item.bgColor,
  };
  setSelectedItem(newSelectedItem);
  setIsModalOpen(true);
};

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
          <Image priority className={styles.mobileImg} src={`/${data.frontMobileImg}`} alt={data.desc} width={1000} height={1000} />
          :
          <Image priority src={`/${data.subpageImg}`} alt={data.desc} width={1000} height={1000} />
        }
        <div>
          <h1>{data.header}</h1>
          <p>{data.text1}</p>
          <p>{data.text2}</p>

          {Array.isArray(data.text3) ? (
            <ul className={styles.subContact}>
              {data.text3.map((item: TextArray, index: number) => (
                <li
                  key={data.name + index}
                  id={`contact-${data._id}`}
                  onClick={() => handleOpenModal(item)}
                >
                  <Image src={`/${item.img}`} alt={item.email} width={400} height={400} />
                  <span>{item.email}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>{data.text3}</p>
          )}
          <span className={styles.subName}>{data.name}</span>
        </div>

        {width < breakPoint ?
          <Link href={"/"} className={styles.mobileLogo}>
            <Image src={`/${data.logo}`} alt={data.desc} width={1000} height={1000} />
          </Link>
          :
          <>{/* empty desktop */}</>
        }
      </div>
      <Modal
        show={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
        initialData={formData}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default Page;
