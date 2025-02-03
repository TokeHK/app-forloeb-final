"use client";

import { Enemies } from "@/types/type";
import { useState, FormEvent, useEffect } from "react";

interface Props {
  data:Enemies
}

interface FormData {
  name: string;
  img: string;
  strength: number;
  lives: number;
  text: string;
}

const Forms = (props:Props) => {

  const [formData, setFormData] = useState<FormData>({
    name: "",
    img: "",
    strength: 0,
    lives: 0,
    text: ""
  });

  useEffect(()=>{

    const newData: FormData = {
      name: props.data.name,
      img: props.data.img,
      strength: props.data.information.strength,
      lives: props.data.information.lives,
      text: props.data.text
    }

    setFormData(newData)

  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;// Trækker 'name' og 'value' fra event target
      setFormData((prevData: FormData) => ({ // Opdaterer form data ved hjælp afen callback-funktion
        ...prevData, // Beholder alle eksisterende form data
        [name]: value // Opdaterer den specifikke felt med det nye input value
      }));
    };
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitData = {
      name: formData.name,
      img: formData.img,
      information: {
        strength: formData.strength,
        lives: formData.lives,
      },
      text: formData.text,
    };

    try {
      const res = await fetch(`http://localhost:3001/update/${props.data._id}`, {
        cache: "no-store",//data bliver sendt til server, de skal ikke caches/gemmes i browseren
        method: "PUT",
        body: JSON.stringify(submitData),
        headers: {
          "Content-type": "application/json"
        }
      })

      res.ok ? console.log("Ok, post blev opdateret") : console.log("der var en API eller Server fejl")
    } catch(error){
      console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-between items-center gap-2 w-full">
          <label htmlFor="name" className="">Name: </label>
          <input className={"border border-black rounded-lg p-2"}
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="mb-4 flex justify-between items-center gap-2 w-full">
          <label htmlFor="img" className="">Img URL: </label>
          <input className={"border border-black rounded-lg p-2"}
            id="img"
            name="img"
            type="text"
            onChange={handleChange}
            value={formData.img}
          />
        </div>
        <div className="mb-4 flex justify-between items-center gap-2 w-full">
          <label htmlFor="strength" className="">Strength: </label>
          <input className={"border border-black rounded-lg p-2"}
            id="strength"
            name="strength"
            type="number"
            onChange={handleChange}
            value={formData.strength}
          />
        </div>
        <div className="mb-4 flex justify-between items-center gap-2 w-full">
          <label htmlFor="lives" className="">Lives: </label>
          <input className={"border border-black rounded-lg p-2"}
            id="lives"
            name="lives"
            type="number"
            onChange={handleChange}
            value={formData.lives}
          />
        </div>
        <div className="mb-6 flex justify-between items-center gap-2 w-full">
          <label htmlFor="text" className="">Comment: </label><br />
          <textarea className={"border border-black rounded-lg p-2 resize-none"}
            id="text"
            name="text"
            rows={4}
            cols={30}
            onChange={handleChange}
            value={formData.text}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Opdater
          </button>
        </div>
      </form>
    </>
  );
}

export default Forms;