import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../data/carList";
const RideSelector = ({ pickUpCoordinates, dropoffCoordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);
  const [distance, setDistance] = useState([])
  useEffect(() => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpCoordinates[0]},${pickUpCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoicnVzdGFtMSIsImEiOiJjbGFudnN4cjQwdWV6M3JvYnVleGVvZ3c2In0.oqlPyHoGcX9fgei1eoKQHw`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setRideDuration(data?.routes[0]?.duration / 200);
        setDistance(data?.routes[0]?.distance)
      });
  }, [pickUpCoordinates, dropoffCoordinates]);
  return (
    <Wrapper>
      <Title>
        Yolcugulardan birin seçin yada aşagı sürüşdürərək daha çox yolculuqla
        tanış olun
      </Title>
      <CarList>
        {carList.map((car, index) => (
          <Car key={index}>
            <CardImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>3 dəqiqə əvvəl</Time>
            </CarDetails>
            <Distance>{(distance / 1000).toFixed(0) + ' Km'}</Distance>
            <Price>{(rideDuration * car.multiplier).toFixed(2) +  "AZN"}</Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
};

export default RideSelector;
const Wrapper = tw.div`
  flex-1 overflow-y-scroll flex flex-col
`;
const Title = tw.div`
  text-gray-500 text-center text-xs py-2 border-b
`;
const Car = tw.div`
  flex p-4 items-center
`;
const CarList = tw.div`
  overflow-y-scroll
`;
const CardImage = tw.img`
  h-14 mr-2
`;
const CarDetails = tw.div`
  flex-1
`;
const Time = tw.div`
  text-xs text-blue-500
`;
const Service = tw.div`
  font-medium
`;
const Price = tw.div`
  text-sm
`;
const Distance = tw.div`
  flex-1
`