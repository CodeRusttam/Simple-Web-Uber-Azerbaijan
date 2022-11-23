import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import { useRouter } from "next/router";
import RideSelector from "./components/RideSelector";
import Link from "next/link";
const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;
  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0]);
  const getPickUpCoordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoicnVzdGFtMSIsImEiOiJjbGFudnN4cjQwdWV6M3JvYnVleGVvZ3c2In0.oqlPyHoGcX9fgei1eoKQHw",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setPickupCoordinates(data.features[0].center);
      });
  };
  const getDropoffCoordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoicnVzdGFtMSIsImEiOiJjbGFudnN4cjQwdWV6M3JvYnVleGVvZ3c2In0.oqlPyHoGcX9fgei1eoKQHw",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setDropoffCoordinates(data.features[0].center);
      });
  };
  useEffect(() => {
    getPickUpCoordinates(pickup);
    getDropoffCoordinates(dropoff);
  }, [pickup, dropoff]);
  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <Map
        pickUpCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />
      <RideContainer>
        <RideSelector
          pickUpCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
        />
        <ConfirmButtonContainer>
          <ConfirmButton>Taksini təsdiqlə</ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;
const ConfirmButton = tw.div`
  bg-black text-white py-4 mx-4 my-4 text-center text-xl cursor-pointer
`;
const ConfirmButtonContainer = tw.div`
  border-t-2
`;
const Wrapper = tw.div`
  flex h-screen flex-col
`;
const RideContainer = tw.div`
  flex flex-1 flex-col h-1/2
`;
const ButtonContainer = tw.div`
  rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer
`;
const BackButton = tw.img`
  h-full object-contain
`;
