"use client"
import { doc, getDoc, collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import app from './../../Shared/firebaseConfig'
import UserInfo from './../../components/UserInfo'
import PicList from './../../components/Pics/PicList'

function Profile({params}) {
    const db = getFirestore(app);
    const[userInfo,setUserInfo]=useState();
    const[listOfPics, setListOfPics]=useState([]);
    useEffect(()=>{
        console.log(params.userId.replace('%40','@'))
        if(params){
            getUserInfo(params.userId.replace('%40','@'));
        }
    },[params]);

    const getUserInfo = async(email)=>{
        const docRef = doc(db, "user",email);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) { 
            setUserInfo(docSnap.data());
        } else {
            console.log("No such document");
        }         
    }

    useEffect(()=>{
        if(userInfo){
            getUserPins();
        }
      },[userInfo]);
    
      const getUserPins=async()=>{
    
        const q = query(collection(db, "1day1pic-post"), where("email", "==", userInfo.email));
    
        const querySnapshot = await getDocs(q);
    
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setListOfPics(listOfPics=>[...listOfPics,doc.data()]);
        });
    
      }

  return (
    <div>
        {userInfo?
            <div>
                <UserInfo userInfo={userInfo} />
                <PicList listOfPics={listOfPics}/> 
            </div>
            :null}
            
    </div>
  )
}

export default Profile