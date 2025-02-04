"use client";
import { useState, useEffect } from "react";

const useWindowWidth = (): number => {

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {

    const handleResize = () => {
      setWidth(window.innerWidth);
    }

    if (typeof window !== "undefined") {//gør så window kan ikke køre på serveren!
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, []);

  return width;

}

export default useWindowWidth;


/* 
import useWindowWidth from "@/hooks/useWindowWidth";

 export default function Home() {
  
  const width = useWindowWidth();
  const breakPoint = 768;

  return (
    <>
      {width < breakPoint ? <div>'Mobile'</div> : <div>'Desktop'</div>}
    </>
  ); 
};

*/