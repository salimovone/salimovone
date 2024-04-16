import React from 'react'

const Logo = () => {
  return (
    <div className='absolute -top-5 -left-5 w-32 h-32 max-md:w-20 max-md:h-20 -z-50'>
        <div className="rounded-full border border-white w-full h-full relative flex justify-center items-center">
            <div className="w-5 h-5 max-md:w-3 max-md:h-3 rounded-full absolute top-8 -right-2 max-md:-right-1 bg-white">
            </div>
                <div className='text-white text-3xl font-bold flex'>
                    <div>S</div>
                    <div className='pt-2 text-violet-800'>S</div>
                </div>
        </div>
    </div>
  )
}

export default Logo