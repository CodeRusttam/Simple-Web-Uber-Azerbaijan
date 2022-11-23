import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoicnVzdGFtMSIsImEiOiJjbGFudnN4cjQwdWV6M3JvYnVleGVvZ3c2In0.oqlPyHoGcX9fgei1eoKQHw";
const Map = (props) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: [49.29011, 33.39635],
      zoom: 3,
    });
    if(props.pickUpCoordinates){
      addToMap(map, props.pickUpCoordinates);
  }
  if(props.dropoffCoordinates){
      addToMap(map, props.dropoffCoordinates);
  }
  if(props.pickUpCoordinates && props.dropoffCoordinates){
      map.fitBounds([
          props.pickUpCoordinates,
          props.dropoffCoordinates
      ], {
          padding: 60
      })
  }
}, [props.pickUpCoordinates, props.dropoffCoordinates])
const addToMap = (map, coordinates) => {
  const marker = new mapboxgl.Marker()
  .setLngLat(coordinates)
  .addTo(map)
}
return (
  <Wrapper id="map">
      
  </Wrapper>
)
}
export default Map
const Wrapper = tw.div`
flex-1 h-1/2
`