import React from 'react'
import PicItem from './PicItem'

function PicList({listOfPics}) {
    console.log(listOfPics);
  return (
    <div className='mt-7 px-2 md:px-5
    columns-2 md:columns-3
    lg:columns-4 mb-4
    xl:columns-5 space-y-6 mx-auto'>
        {listOfPics.map((item, index)=>(
            <div key={index}>
                <PicItem pic={item}/>
            </div>
        ))}
    </div>
  )
}

export default PicList