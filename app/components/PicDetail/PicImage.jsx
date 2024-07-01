import Image from 'next/image'
import React from 'react'

function PicImage({picDetail}) {

  return (
    <div>
      <Image src={picDetail.image}
      alt={picDetail.title}
      width={1000}
      height={1000}
    
      className='rounded-2xl'
      />

    </div>
  )
}

export default PicImage