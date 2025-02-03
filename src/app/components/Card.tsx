import { Enemies } from "@/types/type";
import { useState } from "react";
import Modal from "./Modal";
import useTabPrevention from "@/hooks/useTabPrevention";
import ModalConfirmDelete from "./ModalConfirmDelete";

interface Props {
  data:Enemies
}

const Card = (props:Props) => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  useTabPrevention(showModal);//stop user from using tab movement on page when modal is open
  useTabPrevention(showConfirmDelete);

  const openModal = (mbool:boolean) => {
    setShowModal(mbool);
  }
  const openConfirmDelete = (mbool:boolean)=>{
    setShowConfirmDelete(mbool)
  }

  return (
    <>
    <article className="shadow-[0px_0px_5px_0px] rounded-lg bg-white">
      <header className="bg-black text-white p-1 rounded-t-lg grid grid-cols-2">
        <h2 className="p-1 font-bold">{props.data.name}</h2>
        <div className="flex justify-end">
          <button className="w-5 close bg-red-500 rounded-md"
          onClick={()=>{openConfirmDelete(true)}}
          >X</button>
        </div>
      </header>
      <section className="grid grid-cols-2 h-[250px]">
        <figure className="bg-gray-200 overflow-hidden m-2">
          {/* Image goes here */}
        </figure>
        <div className="mt-1 mr-2 mb-2 flex flex-col justify-between">
          <h3 className="font-bold">{props.data.text}</h3>
          <h3 className="font-bold">Information:</h3>
          <p>Strength: <span className="text-[#666666]">{props.data.information.strength}</span></p>
          <p>Lives: {props.data.information.lives}</p>
          <div className="text-left">
            <button 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={()=>{openModal(true)}}
              >Update
            </button>
          </div>
        </div>
      </section>
    </article>
    <Modal 
      show={showModal}
      data={props.data}
      open={openModal}
    />
    <ModalConfirmDelete
      show={showConfirmDelete}
      data={props.data}
      open={openConfirmDelete}
    /> 
    </>
  );
};

export default Card;
