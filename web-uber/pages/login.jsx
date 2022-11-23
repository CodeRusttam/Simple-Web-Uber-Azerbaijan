import React from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);
  return (
    <Wrapper>
      <UberLogo src="https://i.ibb.co/ZMhy8ws/uber-logo.png" />
      <Title>Daxil Ol!</Title>
      <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />
      <SignInButton onClick={() => signInWithPopup(auth, provider)}>Google hesabın ilə qeydiyatdan keç!</SignInButton>
    </Wrapper>
  );
};

export default Login;
const Wrapper = tw.div`
  flex flex-col h-screen bg-gray-200 w-screen p-4 overflow-x-hidden
`;
const SignInButton = tw.div`
  bg-black text-white text-center py-4 mt-8 self-center w-full cursor-pointer
`;
const UberLogo = tw.img`
  h-20 w-auto object-contain self-start
`;
const Title = tw.div`
  text-5xl pt-4 text-gray-500
`;
const HeadImage = tw.img`
  object-contain w-full h-40
`;
