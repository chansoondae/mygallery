"use client"
import React, { useEffect, useState } from 'react'
import PicImage from './../../components/PicDetail/PicImage'
import PicInfo from './../../components/PicDetail/PicInfo'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import app from '@/app/Shared/firebaseConfig'
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from 'next/navigation'

function PicDetail({params}) {
  const router=useRouter();
  const db=getFirestore(app);
  const [picDetail,setPicDetail]=useState([]);
  useEffect(()=>{
    getPicDetail();
  },[])
 const getPicDetail=async()=>{
      const docRef = doc(db, '1day1pic-post',params.picId );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
       
        setPicDetail(docSnap.data())
      } else {
       
        console.log("No such document!");
      }
  }
  return (
    <>
   {picDetail? 
   <div className=' bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36'>
       <HiArrowSmallLeft className='text-[60px] font-bold ml-[-50px] 
       cursor-pointer hover:bg-gray-200 rounded-full p-2 '
       onClick={()=>router.back()}/>
      <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg
      rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 ' 
      >
     
        <PicImage picDetail={picDetail} />
        <div className="">
        <PicInfo picDetail={picDetail}/>
        </div>
        </div>
    </div>:null}
    </>
  )
}

export default PicDetail