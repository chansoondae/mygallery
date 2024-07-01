"use client"
import React,{useState} from 'react'
import UploadImage from './UploadImage'
import { useSession} from "next-auth/react"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import UserTag from './UserTag'
import app from '../Shared/firebaseConfig'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { GoogleGenerativeAI } from "@google/generative-ai"


function Form() {
    const {data:session}=useSession();
    const [title,setTitle]=useState('');
    const [artist,setArtist]=useState('');
    const [museum,setMuseum]=useState('');
    const [review,setReview]=useState('');
    const [link,setLink]=useState('');
    const [file,setFile]=useState();
    const [loading,setLoading]=useState(false);
    const [loadingAI,setLoadingAI]=useState(false);
    const router=useRouter();
    const storage=getStorage(app)
    const db=getFirestore(app);
    const postId=Date.now().toString();

    //google gemini
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        // Set the `responseMimeType` to output JSON
        generationConfig: { responseMimeType: "application/json" }
      });
      
    // Converts a File object to a GoogleGenerativeAI.Part object.
    async function fileToGenerativePart(img_file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(img_file);
        });
        return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: img_file.type },
        };
    }

    const onSave=()=>{
       setLoading(true)
       uploadFile();
    }
    const onAI=async()=>{
        setLoadingAI(true);
        const prompt = "I'm going to ask for the name of the work, the name of the artist, the museum, and the review of the painting. Please tell me in Korean. Answer should follow this JSON schema: Art_Info = {'name': Artist name, 'title': The title of the art work,'musuem': the museum where it has, 'review': a commentary on a work of art} "

        const imageParts = await fileToGenerativePart(file);
        let result = await model.generateContent([prompt,imageParts]);
        const response = await result.response;
        console.log(response.text());
        const contents= JSON.parse(response.text());
        setTitle(contents.title);
        setArtist(contents.name);
        setMuseum(contents.musuem);
        setReview(contents.review);
        setLoadingAI(false);
     }

    const uploadFile=()=>{
        const storageRef=ref(storage,'1day1pic/'+file.name);
        uploadBytes(storageRef,file).then((snapshot)=>{
            console.log("File Uploaded")
        }).then(resp=>{
            getDownloadURL(storageRef).then(async(url)=>{
                console.log("DownloadUrl",url);
                const postData={
                    title:title,
                    artist:artist,
                    museum:museum,
                    review:review,
                    link:link,
                    image:url,
                    userName:session.user.name,
                    email:session.user.email,
                    userImage:session.user.image,
                    id:postId
                }

                await setDoc(doc(db,'1day1pic-post',postId),
                postData).then(resp=>{
                    console.log("Saved")
                    setLoading(true);
                    router.push("/users/"+session.user.email)
                })
                
            })
        })
    }

   
   
  return (
    <div className=' bg-white p-16 rounded-2xl '>
        {session?        <div className='flex justify-end mb-6'>
            <button onClick={()=>onSave()}
             className='bg-red-500 p-2
            text-white font-semibold px-3 
            rounded-lg'>
              {loading?  <Image src="/loading-indicator.png" 
                width={30} 
                height={30} 
                alt='loading'
                className='animate-spin'  />:
                <span>Save</span>}</button> 
        </div>:null}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
           
            <UploadImage setFile={(file)=>setFile(file)} />
          
       <div className="col-span-2">
       <div className='w-[100%]'>
        <div className='flex justify-between'>
            <UserTag user={session?.user} />

            <button onClick={()=>onAI()}
                className='bg-yellow-500 p-2
                text-white font-semibold px-3 
                rounded-lg'>
                {
                    loadingAI?  <Image src="/loading-indicator.png" 
                    width={30} 
                    height={30} 
                    alt='loadingAI'
                    className='animate-spin'  />:<span>AI</span>
                }
            </button> 
        </div>
        <input type="text" placeholder='작품 제목' value={title}
            onChange={(e)=>setTitle(e.target.value)} 
        className='text-[35px] outline-none font-bold w-full
        border-b-[2px] mt-4 border-gray-400 placeholder-gray-400'/>
        <input type="text" placeholder='작가 이름'  value={artist}
            onChange={(e)=>setArtist(e.target.value)} 
        className='text-[35px] outline-none font-bold w-full
        border-b-[2px] mt-4  border-gray-400 placeholder-gray-400'/>
        <input type="text" placeholder='미술관'  value={museum}
            onChange={(e)=>setMuseum(e.target.value)} 
        className='text-[35px] outline-none font-bold w-full
        border-b-[2px] mt-4 border-gray-400 placeholder-gray-400'/>
        <textarea type="text"
          onChange={(e)=>setReview(e.target.value)}
            placeholder='감상평'   value={review}
        className=' outline-none min-h-44 w-full mt-2 pb-4 text-[16px]
        border-b-[2px] border-gray-400 placeholder-gray-400'/>
          {/* <input type="text"
          onChange={(e)=>setLink(e.target.value)}
           placeholder='Add a Destination Link' 
        className=' outline-none  w-full  pb-4 mt-2
        border-b-[2px] border-gray-400 placeholder-gray-400'/> */}
    </div>
       </div>
        
        </div>
    </div>
  )
}

export default Form