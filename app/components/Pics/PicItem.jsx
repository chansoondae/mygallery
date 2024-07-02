import Image from 'next/image'
import React from 'react'
import UserTag from '../UserTag'
import { useRouter } from 'next/navigation'

function PicItem({pic}) {
    const router=useRouter();
    const user={
        name:pic?.userName,
        image:pic?.userImage,
    }

    return (
        <div className='grid gap-4'>
           <div className="relative 
            before:absolute
            before:h-full before:w-full
            before:rounded-3xl
            before:z-10
            hover:before:bg-gray-600 
            before:opacity-50
            cursor-pointer
            " onClick={()=>router.push("/pic/"+pic.id)}>
                
                    <Image src={pic.image}
                    alt={pic.title}
                    width={500}
                    height={500}
                    className='h-auto max-w-full rounded-3xl 
                    cursor-pointer relative z-0'
                    />
                    <h2 className='font-bold 
                    text-[18px] mb-1 mt-2 line-clamp-2'>{pic.title}</h2>
                    <UserTag user={user} />
           </div>
        </div>
      )
    }
    

export default PicItem