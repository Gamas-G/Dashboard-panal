import React, { useEffect, useState, Suspense }  from "react";
import { Link, NavLink } from 'react-router-dom';

import { useDivision } from "../../hooks/useDivision";
import { Region } from '../Region/region-component';
import  hex  from '../../assets/hex2.gif';


import './dashboard-component.css'
import { DashboardView } from "./dashboardView-component";


//DASHBOARD PRINCIPAL MONITOREO DE TIENDAS
export const Dashboard = () => {

  //Uso de CustomHook, consumo de la API, onformacióin de las diviciones y totales de issues por color
  const { division, 
          regionNorteNaranja, regionNorteGris, regionNorteVerde, regionNorteRojo,
          regionCentroNaranja, regionCentroGris, regionCentroVerde, regionCentroRojo,
          regionSurNaranja, regionSurGris, regionSurVerde, regionSurRojo } = useDivision([]);

  const [ opcionDivision, setOptionDivision ] = useState('Divisiones');

if(division === undefined || division.length === 0){
  console.log('cargando..');
  return ( <div>CARGANDO...</div> );
}


  return(
    <div key={1} className='contenedor-pais'>

      <DashboardView 
        respuesta={division.respuesta}
        regionNorteNaranja = { regionNorteNaranja }
        regionNorteGris    = { regionNorteGris }
        regionNorteVerde   = { regionNorteVerde }
        regionNorteRojo    = { regionNorteRojo }
        regionCentroNaranja= { regionCentroNaranja }
        regionCentroGris   = { regionCentroGris }
        regionCentroVerde  = { regionCentroVerde }
        regionCentroRojo   = { regionCentroRojo }
        regionSurNaranja   = { regionSurNaranja }
        regionSurGris      = { regionSurGris }
        regionSurVerde     = { regionSurVerde }
        regionSurRojo      = { regionSurRojo }
      />
    </div>
  );
}

//Componente Header
function HeaderPais(props){
  return(
  <header className='contenedor-pais-header'>
    <div className='header-info'>
      <p className="header-canal">{ props.pais }</p>
      
      <div className="header-info-monitoreo">
        <p>Total Tiendas: { props.total }</p>
        <p>Total Incidencias:   { props.error }</p>
        <p>Total Exitosa: { props.exitosas }</p>
      </div>
    </div>

    <form className="barra-busqueda">
      <input className="barra-input" type="search" placeholder="Buscar..." aria-label="Search" />
    </form>

    <div>
      <CatalogoApps />
    </div>

    <div className="contenedor-opciones">
      {/* <Link className="btn-mapa" to="map">Ir al mapa</Link> */}
      <a href="http://localhost:3000/FrontMonit/map" className="btn-mapa" type="button">Ir al mapa</a>
      <Divisiones 
        setDivision = {props.setDivision}/>
      <img src={require(`../../assets/log_elek.png`)} alt="icono-Elektra" />
    </div>
      </header>
  )
}

function Divisiones(props){
  return(
    <form>
      <select id="division" className="opciones-filtro" /*onChange={(e) => props.setOptionDivision(e.target.value)}*/>
        <option value='1'>Divisiones</option>
        <option value='2'>Regiones</option>
        <option value='3'>Territorios</option>
      </select>
    </form>
  );

  /*
  function handleChange(e) {
    console.log(e);
    // let division: HTMLInputElement = document.getElementById('division') as HTMLInputElement;
    let division = document.getElementById('division');
    let _INDEX = division.selectedIndex;
    console.log(division.selectedIndex);
    console.log('la información es ' + division[_INDEX].value);
    setDivision(
      division.value
      );
      // let hijo = division; 
    // console.log(hijo);
  }
  */

}

function Contenedor(propDivision){
  //Colocación de totales por división
  const secciones = [];
  propDivision.divisiones.map( (ele) =>{
    switch (ele.fiDivisionId) {
      case 1:
        secciones.push(
          <Region 
            key        = {ele.fiDivisionId}
            regionName = {ele.fcDivision}
            exitosas   = {ele.tdasExito}
            error      = {ele.tdasError}
            tiendas    = {ele.fcDetMonitoreo} 
            naranja    = {propDivision.NorteNaranja}
            gris       = {propDivision.NorteGris}
            verde      = {propDivision.NorteVerde}
            rojo       = {propDivision.NorteRojo}
          />
        );
        break;
      case 2:
        secciones.push(
          <Region 
            key        = {ele.fiDivisionId}
            regionName = {ele.fcDivision}
            exitosas   = {ele.tdasExito}
            error      = {ele.tdasError}
            tiendas    = {ele.fcDetMonitoreo} 
            naranja    = {propDivision.CentroNaranja}
            gris       = {propDivision.CentroGris}
            verde      = {propDivision.CentroVerde}
            rojo       = {propDivision.CentroRojo}
          />
        );
        break;
      case 3:
        secciones.push(
          <Region 
            key        = {ele.fiDivisionId}
            regionName = {ele.fcDivision}
            exitosas   = {ele.tdasExito}
            error      = {ele.tdasError}
            tiendas    = {ele.fcDetMonitoreo} 
            naranja    = {propDivision.SurNaranja}
            gris       = {propDivision.surGris}
            verde      = {propDivision.surVerde}
            rojo       = {propDivision.surRojo}
          />
        );
        break;
    
      default:
        secciones.push(
          <>
          <p>Ocurrio un error, en la seccion de Contenedor</p>
          </>
        );
        break;
    }
  });



  return(
    <div className='contenedor'>
      {
        secciones
      }
      </div>
  )
}

function CatalogoApps(){

  const itemInfo = [];

  const colores = {
    'ColorNaranja' : 'Sin logueo',
    'ColorVerde'   : 'Correcto',
    'ColorGris'    : 'Sin transacciones',
    'ColorRojoC'   : 'Con errores'
  }

  Object.entries(colores).forEach(([key, value]) =>{
    itemInfo.push(
      <div key={key} className="share-catalogo-item">
        <div className={key}></div>
        <p>{value}</p>
      </div>
    );
  });


  return(
    <div className="catalogo-container">
      <div className="catalogo">
        <div className="catalogo-grid">
          {
            itemInfo
          }
        </div>
      </div>
    </div>
  );
}