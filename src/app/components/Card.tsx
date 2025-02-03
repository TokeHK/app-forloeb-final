/* import { Enemies } from "@/types/type"; */
import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css"
import { DataType } from "../types/type";

interface Props {
  data: DataType
}

const Card = (props:Props) => {

  return (
    <>
      <div className={styles.card}>
        <Link href={{pathname: `/cardinfo/`, query: {id: props.data._id}}}
        >
          <Image priority src={`/${props.data.frontImg}`} alt={props.data.desc} width={100} height={100} />
        </Link>
      </div>
    </>
  );
};

export default Card;
