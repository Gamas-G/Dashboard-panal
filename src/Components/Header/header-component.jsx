import React, { useRef, useState }  from "react";

import { CatalogoColors } from "../Catalogo/catalogo-component";

const infoHeader = {
  totales: Number,
  errores: Number,
  exitosas: Number
}

export const Header = ({respuesta}) => {

  const _fiSucursales = useRef(document.getElementsByClassName('numberWS'));
  const _fcSearchWS = useRef();
  const _fiCurrentWS = useRef();
  

  ValidarRender(respuesta);

  return(
    <header className='contenedor-pais-header'>
      <div className='header-info'>
        <p className="header-canal">México</p>
        
        <div className="header-info-monitoreo">
          <p>Total Tiendas: { infoHeader.totales }</p>
          <p>Total Incidencias: { infoHeader.errores }</p>
          <p>Total Exitosa: { infoHeader.exitosas }</p>
        </div>
      </div>
  
      <div className="barra-busqueda">
        <input className="barra-input" 
        onChange={ (e) => venga(e, _fcSearchWS) } 
        onKeyUp={ (key) => handleBuscarSucursales(key, _fiSucursales, _fcSearchWS, _fiCurrentWS) } 
        type="text" 
        placeholder="Buscar..." 
        aria-label="Search" />
      </div>
  
      <div>
        <CatalogoColors />
      </div>
  
      {/* <div className="contenedor-opciones"> */}
        {/* <Link className="btn-mapa" to="map">Ir al mapa</Link> */}
        {/* <a href="http://localhost:3000/FrontMonit/map" className="btn-mapa" type="button">Ir al mapa</a> */}
        {/* <Divisiones 
          setDivision = {props.setDivision}/>
        <img src={require(`../../assets/log_elek.png`)} alt="icono-Elektra" /> */}
      {/* </div> */}
        </header>
    );
}

function ValidarRender(respuesta){
  if(respuesta !== undefined){
    infoHeader.totales = respuesta.tdasTotal;
    infoHeader.errores = respuesta.tdasError;
    infoHeader.exitosas = respuesta.tdasExito;
   }else{
    infoHeader.totales  = 0;
    infoHeader.errores  = 0;
    infoHeader.exitosas = 0;
   }
}

function venga(event, _fcSearchWS){
  const _filterWord = event.target.value === null ? '' : event.target.value.trim()
  _fcSearchWS.current = _filterWord;
}

function handleBuscarSucursales(key, _fiSucursales, _fcSearchWS, _fiCurrentWS){
  
  if( key.code !== 'Enter') return;

  if( _fcSearchWS.current === undefined || _fcSearchWS.current === '' ){
    if( _fiCurrentWS.current !== null ){
      console.log('LA PALABRA ESTA EN BLANCO Y TENEMOS ESTACIONES, PROCEDEMOS A LIMPIAR LA BUSQUEDA');
      _fiCurrentWS.current.map( (_ws) =>{
        _ws.style.fontSize = '0rem'
      } )
      _fiCurrentWS.current = null;
    }
    console.log('la palabra esta en blanco pero no hay estaciones seleccionadas');
    return;
  }
  

  console.log('PROCEDEMOS A BUSCAR LAS ESTACIONES');
  //Convertimos el HTMLCollection a Array
  const newArray = Array.from(_fiSucursales.current);
  //Obtenemos las sucursales a buscar en arrays
  const _sucursalesFind = _fcSearchWS.current.split(',')

  _fiCurrentWS.current = newArray.filter( (ws, index, collection) =>{
    //Debemos de seleccionar
    const vali = _sucursalesFind.some( (w) =>{
      // return w === ws.innerText;
      return w === ws.innerText || ws.style.fontSize === '0.6rem';
    } )

    if(vali){
      ws.style.fontSize = '0.6rem'
    }

    return vali
  } )
}