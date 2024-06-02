

export const CatalogoColors = () => {
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