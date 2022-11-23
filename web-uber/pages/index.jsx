import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { useEffect } from "react";
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
export default function Home() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL
        })
      }else {
        setUser(null)
        router.push('/login')
      }
    });
    return () => unsubscribe()
  }, [])
  return (
    <Wrapper>
      <Map />
      <ActionItems>
        <Header>
          <UberLogo src="https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg" />
          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage src={user && user.photoUrl} onClick={() => signOut(auth)} />
          </Profile>
        </Header>
        <ActionButtons>
          <ActionButton>
            <Link style={{ height: '100%', display: 'flex' , flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} href='/search'>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberX.png" />
                Yolculuğlar
            </Link>
          </ActionButton>
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
            Alternativ yolculuğlar
          </ActionButton>
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
            Reservlər
          </ActionButton>
        </ActionButtons>
         <InputButton>Hara gedirik?</InputButton>
      </ActionItems>
    </Wrapper>
  );
}
const Wrapper = tw.div`
flex flex-col h-screen
`

const ActionItems = tw.div`
flex-1 p-4
`

const Header = tw.div`
flex justify-between items-center
`
const UberLogo = tw.img`
  h-28
`;
const Profile = tw.div`
  flex items-center
`;
const Name = tw.div`
  mr-4 w-20 text-sm
`;
const UserImage = tw.img`
  h-12 w-12 rounded-full border border-gray-200 p-px cursor-pointer
`;
const ActionButtons = tw.div`
  flex
`;
const ActionButton = tw.div`
h-32 bg-gray-200 m-1 flex-1 flex flex-col items-center rounded-lg justify-center text-xl transform hover:scale-105 transition
`
const ActionButtonImage = tw.img`
h-3/5
`
const InputButton = tw.div`
  h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8
`;
