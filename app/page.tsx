"use client"
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import app from './Shared/firebaseConfig';
import { useEffect, useState } from 'react';
import PicList from './components/Pics/PicList';

interface DocumentData { 
  // ... properties of DocumentData ...
}

export default function Home() {
  const db=getFirestore(app);
  const [listOfPics,setListOfPics]=useState<DocumentData[]>([]);

  console.log(listOfPics);
  
  useEffect(()=>{
    getAllPics();
  },[])
  const getAllPics=async()=>{
    setListOfPics([])
      const q=query(collection(db,
        '1day1pic-post'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setListOfPics(listOfPics=>[...listOfPics,doc.data()]);
      });
  }

  return (
    <>
    <div className='p-3'>
      <PicList listOfPics={listOfPics} />
      </div>
    </>
  )
}