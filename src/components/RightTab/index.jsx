"use client"
import { IoLogoGameControllerB } from "react-icons/io"; 
import React from 'react'
import styles from "./dots.module.css"
import Link from "next/link";
import { usePathname } from "next/navigation";
const RightTab = () => {
  const pathname = usePathname()
  return (
    <div className='w-1/2 fixed right-0 border-l h-full border-[#fff3] top-0 max-md:hidden'>
        <div className="w-full h-full flex items-center justify-center roboto-slab text-white text-2xl max-lg:text-xl">
            <div className="w-[calc(var(--screen-width)/4)] h-[calc(var(--screen-width)/4)] border border-[#fff3] grid grid-cols-3">
                <Link href="/me" className={`${pathname === '/me' && 'active'} border rightBox border-[#fff3] ${styles.me}`}>ME</Link>
                <Link href="/skills" className={`${pathname === '/skills' && 'active'} border rightBox border-[#fff3] col-span-2`}>SKILLS</Link>
                <Link href="/experience" className={`${pathname === '/experience' && 'active'} border rightBox border-[#fff3] col-span-2 ${styles.exp}`}>EXPERIENCE</Link>
                <Link href="/qmark" className={`${pathname === '/qmark' && 'active'} border rightBox border-[#fff3]`}>?</Link>
                <Link href="/" className={`${pathname === '/' && 'active'} border rightBox border-[#fff3] ${styles.game}`}><IoLogoGameControllerB /></Link>
                <Link href="/contact" className={`${pathname === '/contact' && 'active'} border rightBox border-[#fff3] col-span-2`}>CONTACT</Link>
            </div>
        </div>
    </div>
  )
}

export default RightTab