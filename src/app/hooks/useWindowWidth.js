import { useState, useEffect } from "react";

const useWindowWidth = () => {

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(()=>{

    const handleResize = () => {
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
      {width < breakPoint ? <div>'Mobile'</div> : <div>'Desktop'<div>}
    </>
  ); 
};

*/