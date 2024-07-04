"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { HiSearch, HiBell, HiChat } from "react-icons/hi";
import { useSession, signIn } from "next-auth/react";
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import app from './../Shared/firebaseConfig';
import { useRouter } from 'next/navigation';

function Header() {
    const { data: session } = useSession()

    const router=useRouter();
    const db = getFirestore(app);


    useEffect(()=>{
        saveUserInfo();         
    },[session])
    
    const  saveUserInfo=async()=>{
        if(session?.user)
            {
                await setDoc(doc(db, "user", session.user.email as string), {
                    userName: session.user.name,
                    email: session.user.email,
                    userImage: session.user.image
                  });
            }
    }

    const onCreateClick=()=>{
      router.push('/art-builder')
      // if(session)
      // {
      //   router.push('/art-builder')
      // }
      // else{
      //   signIn()
      // }
    }



  return (
    <div className='flex justify-between gap-3 md:gap-2 items-center p-6'>
      <Image src='/artfriends_icon.png' loading="eager" priority={true} alt='logo' width={60} height={60} onClick={()=>router.push('/')} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' />
      <button className='bg-[#ff7170] text-white p-1 px-6 rounded-full text-[22px] hidden md:block' onClick={()=>router.push('/')} >Home</button>
      <button className='font-semibold p-2 px-4 rounded-full' onClick={()=>onCreateClick()} >Create</button>
      <div className='bg-[#e9e9e9] p-3 gap-3 items-center rounded-full w-full hidden md:flex'>
      <HiSearch className='text-[25px] text-gray-500'/>
      <input type='text' placeholder='Search' className='bg-transparent outline-none'/>
      </div>
      <HiSearch className='text-[25px] text-gray-500 md:hidden'/>
      <HiBell className='text-[25px] md:text-[40px] text-gray-500 cursor-pointer' />
      <HiChat className='text-[25px] md:text-[40px] text-gray-500 cursor-pointer' />
      {session?.user? 
        <Image src={session?.user?.image as string} 
        onClick={()=>router.push('/users/'+session.user?.email)}
        alt='user-image' width={50} height={50} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' />
      :  <button className='font-semibold p-2 px-4 rounded-full' onClick={() => signIn()} >Login</button>
      }
     
    </div>
  )
}

export default Header
