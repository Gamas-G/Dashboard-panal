import Popup from 'reactjs-popup';
import { Modal } from "../Modal/Modal-component";


export const Tooltip = (prop) =>{
  return(
  <Popup
    trigger={<li key={prop.Detalle.tiendaId}><Modal Detalle = {prop.Detalle}/></li>}
    position={'top center'}
    on={'hover'}
  >
  <p className='cont-tooltip'>{prop.Detalle.tiendaId} - {prop.Detalle.nombre} </p>
  </Popup>
  );
}