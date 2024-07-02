import React from 'react'
import UserTag from '../UserTag'

function PicInfo({picDetail}) {
  const user={
    name:picDetail.userName,
    email:picDetail.email,
    image:picDetail.userImage
  }
  return (
    <div>
      <h2 className='text-[30px] font-bold mb-5'>🖼️ {picDetail.title}</h2>
      <h2 className='text-[30px] font-bold mb-5'>👤 {picDetail.artist}</h2>
      <h2 className='text-[30px] font-bold mb-5'>🏛️ {picDetail.museum}</h2>
      <UserTag user={user} />
      <h2 className='mt-10'>{picDetail.review}</h2>
      <button className='p-2 bg-[#e9e9e9] px-5 text-[23px]
      mt-10 rounded-full hover:scale-105 transition-all'
      onClick={()=>window.open(picDetail.link)}>Open Url</button>
    </div>
  )
}

export default PicInfo