import { Tooltip } from "../Tooltip/Tooltip-component";



export const Sucursales = ({tiendas}) => {
  
  return(
    <>
      <ul className="contenedor-sucursales">
      {
        tiendas.map( ( tiendaHex) =>{
          return(
          // <li onClick={() => handleModalClick()}><span id="contHex" className="ColorNaranja"><label></label></span></li>
          <Tooltip 
            Detalle = {tiendaHex}
          />
          )
        } )
      }
      </ul>
      
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span id="closeModal" class="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>

        </>
    );
    
}

function handleModalClick(){
  var modal = document.getElementById("myModal");
  var close = document.getElementById("closeModal");
  modal.style.display = "block";

  close.onclick = function() {
    modal.style.display = "none";
  }
}