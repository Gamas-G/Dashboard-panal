import React, {useState, useEffect } from "react";
import { centralApi } from "../api/centralApi";


export const useEstacion = (tiendaId) =>{
    const[detWS, setDetWS] = useState([]);

    const _url = `/Tiendas/Detalle?fcTiendas=${tiendaId}&fcApliaciones=1,2,3,4`;

    useEffect( () =>{
      _getInfoSucursal(_url, setDetWS);
    },[])

    return { detWS }
}

const _getInfoSucursal = async(url, setDetWS) => 
{
  try {
    const resp = await centralApi.get(url);
    if(resp.status == 200){
      setDetWS(resp.data.respuesta);
    }
  } catch (error) {
    console.log('Error crack, en el detalle de la estacion');
  }
}