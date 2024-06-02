import React, {useState, useEffect } from "react";
import { centralApi } from "../api/centralApi";

import { Feature, Overlay } from 'ol/index.js';
import { Point } from 'ol/geom.js';
import * as ol from 'ol/proj';

import { data } from '../assets/data';

//10 minutos => 600000
// const timeInfo = 600000; //10 minutos
// const timeInfo = process.env.REACT_APP_MINUTOS_REFRESH;
const timeInfo = 5000;


const url = 'Tiendas?tipoClasificacion=1&fiNegocio=80&fcApliaciones=1,2,3,4';

export const useDivisionMap = () =>{

    const[vectorSourcesVerde  , setVectorSourcesVerde] = useState([]);
    const[vectorSourcesRojo   , setVectorSourcesRojo] = useState([]);
    const[vectorSourcesNaranja, setVectorSourcesNaranja] = useState([]);
    const[vectorSourcesGris   , setVectorSourcesGris] = useState([]);
    
    useEffect(() =>{
      getSucursalesLatLong( setVectorSourcesVerde, setVectorSourcesRojo, setVectorSourcesNaranja, setVectorSourcesGris );
  
      const intervalId = setInterval( () => {
        getSucursalesLatLong( setVectorSourcesVerde, setVectorSourcesRojo, setVectorSourcesNaranja, setVectorSourcesGris );
      }, timeInfo );
  
      return () =>{
        clearInterval(intervalId);
      }
    },[]);

    return { vectorSourcesVerde, vectorSourcesRojo, vectorSourcesNaranja, vectorSourcesGris }
  }
  

  const getSucursalesLatLong = async( setVectorSourcesVerde, setVectorSourcesRojo, setVectorSourcesNaranja, setVectorSourcesGris ) =>{
    try {
      const miArrayVerde = [];
      const miArrayRojo = [];
      const miArrayNaranja = [];
      const miArrayGris = [];
      
      const resp = data;

      resp.respuesta.detalle.map((ele)=>{
        miArrayVerde.push(ele.fcDetMonitoreo.filter(item => item.colorStyle === 'ColorVerde'));
        miArrayRojo.push(ele.fcDetMonitoreo.filter(item => item.colorStyle === 'ColorRojo'));
        miArrayNaranja.push(ele.fcDetMonitoreo.filter(item => item.colorStyle === 'ColorNaranja'));
        miArrayGris.push(ele.fcDetMonitoreo.filter(item => item.colorStyle === 'ColorGris'));
      });


      const { arrayPointsVerde, arrayPointsRojo, arrayPointsNaranja, arrayPointsGris } 
         = customVectorSources(miArrayVerde, miArrayRojo, miArrayNaranja, miArrayGris);

        setVectorSourcesVerde(arrayPointsVerde);
        setVectorSourcesRojo(arrayPointsRojo);
        setVectorSourcesNaranja(arrayPointsNaranja);
        setVectorSourcesGris(arrayPointsGris);
      

      /*
      const resp = await centralApi.get(url);
      if(resp.status == 200){
        resp.data.respuesta.detalle.map((ele)=>{
          miArrayVerde.push(ele.fcDetMonitoreo.filter(item => item.colorStyle === 'ColorVerde'));
          miArrayRojo.push(ele.fcDetMonitoreo.filter(item => item.colorStyle === 'ColorRojo'));
          miArrayNaranja.push(ele.fcDetMonitoreo.filter(item => item.colorStyle === 'ColorNaranja'));
          miArrayGris.push(ele.fcDetMonitoreo.filter(item => item.colorStyle === 'ColorGris'));
        });

        
         const { arrayPointsVerde, arrayPointsRojo, arrayPointsNaranja, arrayPointsGris } 
         = customVectorSources(miArrayVerde, miArrayRojo, miArrayNaranja, miArrayGris);

        setVectorSourcesVerde(arrayPointsVerde);
        setVectorSourcesRojo(arrayPointsRojo);
        setVectorSourcesNaranja(arrayPointsNaranja);
        setVectorSourcesGris(arrayPointsGris);
      }

      */

    } catch (error) {
      console.log('ERROR EN LA PETICIÓN CENTRAL, MAPA');
      console.log(error);
    }
  }


  const customVectorSources = ( arrayVectorSourceVerde, arrayVectorSourceRojo, arrayVectorSourceNaranja, arrayVectorSourceGris ) =>{

    const arrayPointsVerde   = [];
    const arrayPointsRojo    = [];
    const arrayPointsNaranja = [];
    const arrayPointsGris    = [];

    arrayVectorSourceVerde.forEach(item => {
      item.forEach(element => {
        const newFeature = new Feature({ geometry: new Point(ol.fromLonLat([element.longitud, element.latitud])) });
        arrayPointsVerde.push( newFeature );
      });
    });

    arrayVectorSourceRojo.forEach(item => {
      item.forEach(element => {
        const newFeature = new Feature({ geometry: new Point(ol.fromLonLat([element.longitud, element.latitud])), name: 'Rojo' });
        arrayPointsRojo.push( newFeature );
      });
    });

    arrayVectorSourceNaranja.forEach(item => {
      item.forEach(element => {
        const newFeature = new Feature({ geometry: new Point(ol.fromLonLat([element.longitud, element.latitud])) });
        arrayPointsNaranja.push( newFeature );
      });
    });

    arrayVectorSourceGris.forEach(item => {
      item.forEach(element => {
        const newFeature = new Feature({ geometry: new Point(ol.fromLonLat([element.longitud, element.latitud])) });
        arrayPointsGris.push( newFeature );
      });
    });

    return { arrayPointsVerde, arrayPointsRojo, arrayPointsNaranja, arrayPointsGris }
}


var mio3;
function useGetData() {
  const [mio2, setMio2] = useState();
  const[mio, setMio] = useState(0);

  useEffect( () =>{
    setMio(20)
    setMio2(30);
    mio3 = mio2;
  },[])
}
export const useGetInfo = () =>{
  const [ dios ] = useGetData();
  return dios;
}