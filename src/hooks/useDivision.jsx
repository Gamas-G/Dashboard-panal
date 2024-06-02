import React, {useState, useEffect } from "react";
import { centralApi } from "../api/centralApi";

import { data } from '../assets/data';

//10 minutos => 600000
const timeInfo = process.env.REACT_APP_MINUTOS_REFRESH;

const url = 'Tiendas?tipoClasificacion=1&fiNegocio=80&fcApliaciones=1,2,3,4';

export const useDivision = () =>{

    const[division, setDivision] = useState([]);
    
    //Regions Norte
    const[regionNorteNaranja, setColorNaranja] = useState(0);
    const[regionNorteGris, setColorGris]       = useState(0);
    const[regionNorteVerde, setColorVerde]     = useState(0);
    const[regionNorteRojo, setColorRojo]       = useState(0);

    //Region Centro
    const[regionCentroNaranja, setColorCentroNaranja] = useState(0);
    const[regionCentroGris, setColorCentroGris]       = useState(0);
    const[regionCentroVerde, setColorCentroVerde]     = useState(0);
    const[regionCentroRojo, setColorCentroRojo]       = useState(0);

    //Region Sur
    const[regionSurNaranja, setColorSurNaranja] = useState(0);
    const[regionSurGris, setColorSurGris]       = useState(0);
    const[regionSurVerde, setColorSurVerde]     = useState(0);
    const[regionSurRojo, setColorSurRojo]       = useState(0);

    useEffect( () =>{

        _getDivision( setDivision, 
          setColorNaranja, setColorGris, setColorVerde, setColorRojo, 
          setColorCentroNaranja, setColorCentroGris, setColorCentroVerde, setColorCentroRojo, 
          setColorSurNaranja, setColorSurGris, setColorSurVerde, setColorSurRojo );

        const intervalId = setInterval( () => {
          _getDivision( setDivision, 
            setColorNaranja, setColorGris, setColorVerde, setColorRojo, 
            setColorCentroNaranja, setColorCentroGris, setColorCentroVerde, setColorCentroRojo, 
            setColorSurNaranja, setColorSurGris, setColorSurVerde, setColorSurRojo );
        }, timeInfo );
  
        return () =>{
          clearInterval(intervalId);
        }

    },[])

    return { division,
             regionNorteNaranja, regionNorteGris, regionNorteVerde, regionNorteRojo,
             regionCentroNaranja, regionCentroGris, regionCentroVerde, regionCentroRojo,
             regionSurNaranja, regionSurGris, regionSurVerde, regionSurRojo
            }
}

const _getDivision = async( setDivision, 
  setColorNaranja, setColorGris, setColorVerde, setColorRojo, 
  setColorCentroNaranja, setColorCentroGris, setColorCentroVerde, setColorCentroRojo, 
  setColorSurNaranja, setColorSurGris, setColorSurVerde, setColorSurRojo ) => 
{
  try {
    // const resp = await centralApi.get(url);
    const resp = data;

    setDivision(resp);
    //Region Norte
    setColorNaranja(resp.respuesta.detalle[0].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorNaranja').length);
    setColorGris(resp.respuesta.detalle[0].fcDetMonitoreo.filter(itemGr => itemGr.colorStyle === 'ColorGris').length);
    setColorVerde(resp.respuesta.detalle[0].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorVerde').length);
    setColorRojo(resp.respuesta.detalle[0].fcDetMonitoreo.filter(item => item.colorStyle  === 'ColorRojo').length);

    //Region Centro
    setColorCentroNaranja(resp.respuesta.detalle[1].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorNaranja').length);
    setColorCentroGris(resp.respuesta.detalle[1].fcDetMonitoreo.filter(itemGr => itemGr.colorStyle === 'ColorGris').length);
    setColorCentroVerde(resp.respuesta.detalle[1].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorVerde').length);
    setColorCentroRojo(resp.respuesta.detalle[1].fcDetMonitoreo.filter(item => item.colorStyle  === 'ColorRojo').length);

    //Region Sur
    setColorSurNaranja(resp.respuesta.detalle[2].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorNaranja').length);
    setColorSurGris(resp.respuesta.detalle[2].fcDetMonitoreo.filter(itemGr => itemGr.colorStyle === 'ColorGris').length);
    setColorSurVerde(resp.respuesta.detalle[2].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorVerde').length);
    setColorSurRojo(resp.respuesta.detalle[2].fcDetMonitoreo.filter(item => item.colorStyle  === 'ColorRojo').length);


    /*
    if(resp.status == 200){
      setDivision(resp.data);
      //Region Norte
      setColorNaranja(resp.data.respuesta.detalle[0].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorNaranja').length);
      setColorGris(resp.data.respuesta.detalle[0].fcDetMonitoreo.filter(itemGr => itemGr.colorStyle === 'ColorGris').length);
      setColorVerde(resp.data.respuesta.detalle[0].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorVerde').length);
      setColorRojo(resp.data.respuesta.detalle[0].fcDetMonitoreo.filter(item => item.colorStyle  === 'ColorRojo').length);

      //Region Centro
      setColorCentroNaranja(resp.data.respuesta.detalle[1].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorNaranja').length);
      setColorCentroGris(resp.data.respuesta.detalle[1].fcDetMonitoreo.filter(itemGr => itemGr.colorStyle === 'ColorGris').length);
      setColorCentroVerde(resp.data.respuesta.detalle[1].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorVerde').length);
      setColorCentroRojo(resp.data.respuesta.detalle[1].fcDetMonitoreo.filter(item => item.colorStyle  === 'ColorRojo').length);

      //Region Sur
      setColorSurNaranja(resp.data.respuesta.detalle[2].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorNaranja').length);
      setColorSurGris(resp.data.respuesta.detalle[2].fcDetMonitoreo.filter(itemGr => itemGr.colorStyle === 'ColorGris').length);
      setColorSurVerde(resp.data.respuesta.detalle[2].fcDetMonitoreo.filter(item => item.colorStyle === 'ColorVerde').length);
      setColorSurRojo(resp.data.respuesta.detalle[2].fcDetMonitoreo.filter(item => item.colorStyle  === 'ColorRojo').length);
    }
    */
  } catch (error) {
    console.log('Error en la peticion principal');
  }
}
