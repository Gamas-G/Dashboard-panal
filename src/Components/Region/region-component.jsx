import React, { useState, useEffect } from "react";
import './region-component.css'
import { Sucursales } from "./regionSucursales-component";

import { Tooltip } from "../Tooltip/Tooltip-component";


const hexaItems   = [];
const hexbtnTotal = [];


export const Region = ({tiendas, key, naranja, gris, verde, rojo, regionName}) => {

  if(naranja > 0){
    hexbtnTotal.push(
      <button id="btnError" className="btnHex ColorNaranja" /*onClick={filtroEstaciones}*/>{naranja}</button>
    );
  }
  if(gris > 0){
    hexbtnTotal.push(
      <button id="btnError" className="btnHex ColorGris" /*onClick={filtroEstaciones}*/>{gris}</button>
    );
  }
  if(verde > 0){
    hexbtnTotal.push(
      <button id="btnError" className="btnHex ColorVerde" /*onClick={filtroEstaciones}*/>{verde}</button>
    );
  }
  if(rojo > 0){
    hexbtnTotal.push(
      <button id="btnError" className="btnHex ColorRojo" /*onClick={filtroEstaciones}*/>{rojo}</button>
    );
  }

  HexTotales(key);

  return(
    <div className="contenedor-region">
      <div className="contenedor-region-name">
        <p>{regionName}</p>
        <div className="contenedor-btnHex">
          {/* { hexbtnTotal } */}
        </div>
      </div>
      <div>
        <Sucursales tiendas={tiendas} />
        {/* <ul>
          {
            tiendas.map( ( tiendaHex) =>{
              return(
                <Tooltip 
                  Detalle = {tiendaHex}
                />
              )
            } )
          }
        </ul> */}
      </div>
    </div>
  );
}

function HexTotales(key){
  console.log('Logs totales');
  console.log(key);

}

function filtroEstaciones(event){
  document.querySelectorAll("li span:not(.btnHexError)").forEach((ws)=>{
    if( ws.style.display === 'none' ){
      ws.style.display = 'block'
    }
    else{
      ws.style.display = 'none'
    }
  });
}
