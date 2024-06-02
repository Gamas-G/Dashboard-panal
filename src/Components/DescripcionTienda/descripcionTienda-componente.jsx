import React, {useEffect, useState} from "react";
import './descripcionTienda-component.css'
import { useEstacion } from "../../hooks/useEstacion";



export const DetalleTienda = (props) => {
    const { detWS } = useEstacion(props.TiendaId);
    const currentHeader = [];
    useEffect( () => {
      },[detWS])

      if(detWS[0] !== undefined ){
        currentHeader.push( 
        <>
          <table id="customers">
            <tr>
              <th>
                <div className="info-sucursal-header">
                <h2>{detWS[0].tiendaId} - {detWS[0].tienda}</h2> / <strong>{detWS[0].ip}</strong>
                </div>
              </th>
            </tr>
            <tr>
              <table>
                <tr>
                <td>
                <h3>Hora de apertura: {detWS[0].horaApertura}</h3>
              </td>
              <td>
                <h3>
                  <h3>Ultimo acceso: {detWS[0].ultimoAcceso}</h3>
                </h3>
              </td>
                </tr>
              </table>
            </tr>
            <tr>
              <td>
                {detWS[0].resumen}
              </td>
            </tr>
            <tr>
              <DetalleApps 
                Apps = {detWS[0].detalleEstatus}
                Errores = {detWS[0].numErrores}
              />
            </tr>
          </table>
        </>
        )
      }else{
        currentHeader.push(<h2>Cargando, espere por favor...</h2>);
      }

    return(
        <div className="modal">
            {
              currentHeader
            }
        </div>
    );
}

export const DetalleApps = (prop) => {
  let appsTabla;
  const detalleApps = [];


  if(prop.Errores > 0 && prop.Apps !== null){
    prop.Apps.forEach(element => {
      detalleApps.push(
        <tr>
          <td>{element.app}</td>
          <td>{`${element.spOrigen}: ${element.resApp}`}</td>
          <td>{element.ultimaSincExito}</td>
          </tr>
      );
    });

    appsTabla = 
    <>
      <table>
        <tr>
          <th>Aplicación</th>
          <th>Detalle</th>
          <th>Ultima Sincronización con exito</th>
        </tr>
          {detalleApps}
      </table>
    </>
  }else{
    appsTabla = <></>
  }

  return(
    appsTabla
  );
}