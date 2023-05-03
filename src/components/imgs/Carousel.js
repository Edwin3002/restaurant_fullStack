import Image from 'next/image'
import React, { useState } from 'react'

const Carousel = ({ data }) => {

  const [showImg, setShowImg] = useState(0);

  const handleNextShowImg = () => {
    if (data[showImg + 1]) setShowImg(showImg + 1);
  }
  const handlePreviousShowImg = () => {
    if (data[showImg - 1]) setShowImg(showImg - 1);
  }

  return (
    <div id="default-carousel" className="relative m-auto w-4/5 h-4/5" data-carousel="slide">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {
          data[showImg] ?
            <div key={data[showImg].name} className="duration-200 ease-in-out" data-carousel-item>
              <Image src={data[showImg].img} width={1000} height={1000} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={data[showImg].name} />
            </div>
            : null
        }
      </div>
      <button onClick={() => handlePreviousShowImg()} type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button onClick={() => handleNextShowImg()} type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  )
}

export default Carousel