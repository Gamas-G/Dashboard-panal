import React  from "react";

import { Header } from '../Header/header-component';
import { ContenedorRegion } from "../ContenedorRegion/contenedorRegion-component";


const regionNorte = {
  regionNorteNaranja: Number,
  regionNorteGris : Number,
  regionNorteVerde : Number,
  regionNorteRojo : Number
}

const regionCentro = {
  regionCentroNaranja : Number,
  regionCentroGris : Number,
  regionCentroVerde : Number,
  regionCentroRojo : Number,
}

const regionSur = {
  regionSurNaranja: Number,
  regionSurGris: Number,
  regionSurVerde: Number,
  regionSurRojo: Number,
}

function setRegiones( regionNorteNaranja, regionNorteGris, regionNorteVerde, regionNorteRojo, 
  regionCentroNaranja, regionCentroGris, regionCentroVerde, regionCentroRojo, 
  regionSurNaranja, regionSurGris, regionSurVerde, regionSurRojo ){
    
    regionNorte.regionNorteNaranja = regionNorteNaranja
    regionNorte.regionNorteGris = regionNorteGris
    regionNorte.regionNorteVerde = regionNorteVerde
    regionNorte.regionNorteRojo = regionNorteRojo
  
}


export const DashboardView = ( {respuesta, 
  regionNorteNaranja, regionNorteGris, regionNorteVerde, regionNorteRojo, 
  regionCentroNaranja, regionCentroGris, regionCentroVerde, regionCentroRojo, 
  regionSurNaranja, regionSurGris, regionSurVerde, regionSurRojo}) =>{
    
  return(
  <div key={1} className='contenedor-pais'>
      <>
      <Header 
        key={2}
        respuesta={respuesta}
      />

      <ContenedorRegion 
        divisiones={respuesta.detalle}
        regionNorteNaranja={regionNorteNaranja}
        regionNorteGris   ={regionNorteGris}
        regionNorteVerde  ={regionNorteVerde}
        regionNorteRojo   ={regionNorteRojo}

        regionCentroNaranja={regionCentroNaranja}
        regionCentroGris   ={regionCentroGris}
        regionCentroVerde  ={regionCentroVerde}
        regionCentroRojo   ={regionCentroRojo}

        regionSurNaranja ={regionSurNaranja}
        regionSurGris    ={regionSurGris}
        regionSurVerde   ={regionSurVerde}
        regionSurRojo    ={regionSurRojo}
      />
      </>
    </div>
  );
}
