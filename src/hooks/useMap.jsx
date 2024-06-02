import React, {useState, useEffect } from "react";


export const useMapNew = () =>{
  const [ num,  setNum ] = useState(10);
    useEffect( () =>{
      console.log('ESTAMOS EN EL EFFECT');
      const mio = 100
      setNum(mio);
      console.log(num);

      return () =>{
        setNum(0);
      }

    },[]);

    return( num );
}