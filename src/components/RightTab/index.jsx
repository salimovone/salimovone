import { IoLogoGameControllerB } from "react-icons/io"; 
import React from 'react'
import styles from "./dots.module.css"

const RightTab = () => {
  return (
    <div className='w-1/2 fixed right-0 border-l h-full border-[#fff3] top-0 max-md:hidden'>
        <div className="w-full h-full flex items-center justify-center roboto-slab text-white text-2xl max-lg:text-xl">
            <div className="w-[calc(var(--screen-width)/4)] h-[calc(var(--screen-width)/4)] border border-[#fff3] grid grid-cols-3">
                <div className={'border rightBox border-[#fff3] ' + styles.me}>ME</div>
                <div className='border rightBox border-[#fff3] col-span-2'>SKILLS</div>
                <div className={'border rightBox border-[#fff3] col-span-2 ' + styles.exp}>EXPERIENCE</div>
                <div className='border rightBox border-[#fff3]'>?</div>
                <div className={'border rightBox border-[#fff3] ' + styles.game}><IoLogoGameControllerB /></div>
                <div className='border rightBox border-[#fff3] col-span-2'>CONTACT</div>
            </div>
        </div>
    </div>
  )
}

export default RightTab