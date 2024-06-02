
import { useEffect, useRef } from 'react';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { useMapNew } from '../../hooks/useMap';
console.log('YO VIVO FUERA DEL COMPONENTE');


export const MapaNew = () =>{
    const map = new Map();

    const mapRef = useRef(null);

    const { num } = useMapNew(0);
    
    useEffect( () =>{
        
        console.log(`LLEGAMOS ${num}`);
    },[num] )

    // console.log(mapRef.current);

    /*
    useEffect( ()=>{
        if(!mapRef.current){
            console.log('NO TIENE NADA');
            console.log(mapRef.current);
        }
        // if(map === undefined){
            map.setView( new View({ center: [0,0], zoom:1 }) );
        map.setLayers([new TileLayer( { source: new OSM() } )]);
        map.setTarget('map');

        // }
        return () => {
            console.log('FINAL DEL HOOK');
        }
    },[])
    */
    return(
        <p>PUTA MADRE {num}</p>
        // <div id="map" 
        // style={{
        //     width:'500px',
        //     height:'500px'
        // }}></div>
    );
}