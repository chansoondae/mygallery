import React, { useState } from 'react'
import { HiArrowUpCircle } from "react-icons/hi2";
function UploadImage({setFile}) {
   const [selectedFile,setSelectedFile]=useState();


  return (
    <div className='sm:h-48 md:h-64 lg:h-96 w-full bg-red-50
    rounded-lg'>
        
        <label className='flex flex-col justify-center items-center
        cursor-pointer h-[100%]
        border-[2px] border-gray-300 border-dashed rounded-lg text-gray-600 '>
           
          {!selectedFile?
          <div className='flex items-center flex-col'>
           <HiArrowUpCircle className='text-[22px]'/>   
            <h2 className=' font-semibold'>Click to Upload</h2>
            </div>
            :null}
            {selectedFile?
            <img src={window.URL.createObjectURL(selectedFile)}
            alt='selected-image'
            width={500}
            height={800}
            className='object-contain h-[90%]'
            />:null}
            <input id="dropzone-file" type="file"
             accept="image/*" data-type='image'
             className="hidden"  
             onChange={(e)=>{setFile(e.target.files[0]);
             setSelectedFile(e.target.files[0])}} />
        
        </label>
    </div>
  )
}

export default UploadImage