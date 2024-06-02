import Popup from 'reactjs-popup';
import { useEstacion } from "../../hooks/useEstacion";
import { DetalleTienda } from '../DescripcionTienda/descripcionTienda-componente';


export const Modal = (prop) =>{
    return(
        <Popup
            // trigger={currentHeader}
            trigger={<span id='contHex' className={prop.Detalle.colorStyle}><label className='numberWS'>{prop.Detalle.tiendaId}</label></span>}
            modal
            nested
            position={'center center'}
        >
            <DetalleTienda 
                TiendaId = {prop.Detalle.tiendaId}
            />
        </Popup>
    );
}