import { Region } from '../Region/region-component';


export const ContenedorRegion = ({divisiones, regionNorteNaranja, regionNorteGris, regionNorteVerde, regionNorteRojo, regionCentroNaranja, regionCentroGris, regionCentroVerde, regionCentroRojo, regionSurNaranja, regionSurGris, regionSurVerde, regionSurRojo}) =>{

  return(
    divisiones.map((ele) => {
      console.log('En el map de divisiones');
      switch (ele.fiDivisionId) {
        case 1:
        return <Region 
          key        = {ele.fiDivisionId}
          regionName = {ele.fcDivision}
          exitosas   = {ele.tdasExito}
          error      = {ele.tdasError}
          tiendas    = {ele.fcDetMonitoreo} 
          naranja    = {regionNorteNaranja}
          gris       = {regionNorteGris}
          verde      = {regionNorteVerde}
          rojo       = {regionNorteRojo}
        />
          break;
        case 2:
          return <Region 
            key        = {ele.fiDivisionId}
            regionName = {ele.fcDivision}
            exitosas   = {ele.tdasExito}
            error      = {ele.tdasError}
            tiendas    = {ele.fcDetMonitoreo} 
            naranja    = {regionCentroNaranja}
            gris       = {regionCentroGris}
            verde      = {regionCentroVerde}
            rojo       = {regionCentroRojo}
          />
          break;
        case 3:
          return <Region 
                    key        = {ele.fiDivisionId}
                    regionName = {ele.fcDivision}
                    exitosas   = {ele.tdasExito}
                    error      = {ele.tdasError}
                    tiendas    = {ele.fcDetMonitoreo} 
                    naranja    = {regionSurNaranja}
                    gris       = {regionSurGris}
                    verde      = {regionSurVerde}
                    rojo       = {regionSurRojo}
                />
        break;
      
        default:
          break;
      }
    })
  );

}