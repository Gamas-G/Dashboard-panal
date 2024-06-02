import { useEffect, useRef, useState } from 'react';

import { useDivisionMap } from "../../hooks/useDivisionMap";
import './Mapa-component.css';
import hex from '../../assets/hex1.gif';


import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Source, Vector as VectorSource } from 'ol/source.js';
import { Feature, Overlay } from 'ol/index.js';
import {Icon, Style, Stroke, Circle as CircleStyle, Fill} from 'ol/style.js';
import { Circle, Point } from 'ol/geom.js';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM.js';
import { useGeographic } from 'ol/proj.js';
import * as ol from 'ol/proj';

import {getVectorContext} from 'ol/render.js';
import {unByKey} from 'ol/Observable.js';
import {easeOut} from 'ol/easing.js';


export const Mapa = () =>{

  //Consumo de informacion de sucursale
  const { vectorSourcesVerde, vectorSourcesRojo, vectorSourcesNaranja, vectorSourcesGris } = useDivisionMap([]);


  //**************************REFERENCIAS A RECURSOS**************************
  const mapTargetElement = useRef(null);
  const mapRef = useRef(null);
  
  const vectorSourceVerdeRef   = useRef(null);
  const vectorSourceRojoRef    = useRef(null);
  const vectorSourceNaranjaRef = useRef(null);
  const vectorSourceGrisRef    = useRef(null);
  
  const vectorLayerVerdeRef   = useRef(null);
  const vectorLayerRojoRef    = useRef(null);
  const vectorLayerNaranjaRef = useRef(null);
  const vectorLayerGrisRef    = useRef(null);
  
  const _tileLayerRef = useRef(null);
  
  
  //**************************CONFIGURACIÓN POR DEFAULT PARA EL MAPA**************************
  //Cordenadas para centrar en México
  const _center = ol.transform([-100.552784, 23.634501], 'EPSG:4326', 'EPSG:3857');
  //Propiedad de Zoom para el mapa
  const _view = new View({ center: _center, zoom: 6, multiWorld:true});

  //RENDERIZADO DEL MAPA
  useEffect( () =>{
    if(!mapRef.current){
      _tileLayerRef.current = new TileLayer({ source: new OSM({ wrapX:false }) });

      //Iniciando las capas
      //********** SUCURSALES VERDES **********/
      //Source
      vectorSourceVerdeRef.current = new VectorSource({ wrapX: false })
      //Layer
      vectorLayerVerdeRef.current = new VectorLayer({ 
        zIndex:0,
        source: vectorSourceVerdeRef.current,
        style:{
          'circle-radius': 5,
          'circle-fill-color': 'green',
        }
      });

      //********** SUCURSALES ROJAS **********/
      //Source
      vectorSourceRojoRef.current = new VectorSource({ wrapX: false })
      //Layer
      vectorLayerRojoRef.current = new VectorLayer({ 
        zIndex:3,
        source: vectorSourceRojoRef.current,
        style:{
          'circle-radius': 7,
          'circle-fill-color': 'rgba(255,0,0,1)',
        }
      });

      //********** SUCURSALES NARANJAS **********/
      //Source
      vectorSourceNaranjaRef.current = new VectorSource({ wrapX: false })
      //Layer
      vectorLayerNaranjaRef.current = new VectorLayer({ 
        zIndex: 1,
        source: vectorSourceNaranjaRef.current,
        style:{
          'circle-radius': 5,
          'circle-fill-color': 'orange',
        }
      });

      //********** SUCURSALES GRISES **********/
      //Source
      vectorSourceGrisRef.current = new VectorSource({ wrapX: false })
      //Layer
      vectorLayerGrisRef.current = new VectorLayer({ 
        zIndex:2,
        source: vectorSourceGrisRef.current,
        style:{
          'circle-radius': 5,
          'circle-fill-color': 'gray',
        }
      });

      //Instancia del Mapa
      mapRef.current = new Map({
        view: _view,
        layers: [ 
          _tileLayerRef.current, 
          vectorLayerVerdeRef.current, 
          vectorLayerRojoRef.current, 
          // vectorLayerNaranjaRef.current, 
          vectorLayerGrisRef.current
        ]
      });
    }
    mapRef.current.setTarget( mapTargetElement.current || "" );

    return () => {
      mapRef.current.setTarget("");
    } 
  },[]);

  useEffect(() =>{
    vectorSourceVerdeRef.current.addFeatures(vectorSourcesVerde);
    vectorSourceRojoRef.current.addFeatures(vectorSourcesRojo);
    vectorSourceNaranjaRef.current.addFeatures(vectorSourcesNaranja);
    vectorSourceGrisRef.current.addFeatures(vectorSourcesGris);

    // vectorSourcesRojo.forEach(element => {
    //   flash(element);
    // });

    // const intervalId = setInterval( () => {
    //   vectorSourcesRojo.forEach(element => {
    //     flash(element);
    //   });
    // }, 3000 );

    return () =>{
      // clearInterval(intervalId);
      vectorSourceNaranjaRef.current.clear();
      vectorSourceVerdeRef.current.clear();
      vectorSourceRojoRef.current.clear();
      vectorSourceGrisRef.current.clear();
    }
  },[vectorSourcesVerde, vectorSourcesRojo, vectorSourcesNaranja, vectorSourcesGris]);



  const duration = 3000;
function flash(feature) {
  const start = Date.now();
  const flashGeom = feature.getGeometry().clone();
  var listenerKey = _tileLayerRef.current.on('postrender', animate);

  function animate(event) {
    const frameState = event.frameState;
    const elapsed = frameState.time - start;
    
    if (elapsed >= duration) {
      unByKey(listenerKey);
      return;
    }
    
    const vectorContext = getVectorContext(event);
    const elapsedRatio = elapsed / duration;
    // radius will be 5 at start and 30 at end.
    const radius  = easeOut(elapsedRatio) * 25 + 5;
    const opacity = easeOut(1 - elapsedRatio);

    const style = new Style({
      image: new CircleStyle({
        radius: radius,
        scale: .9,
        snapToPixel: false,
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, ' + opacity + ')',
          width: 0.25 + opacity,
        }),
      })
    });
    vectorContext.setStyle(style);
    vectorContext.drawGeometry(flashGeom);
    // mantiene la animacion despues del postrender
    mapRef.current.render();
  }
}

  
  return(
    <div ref={mapTargetElement} className='map'>
    </div>
  );
}