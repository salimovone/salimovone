"use client"
import { IoLogoGameControllerB } from "react-icons/io"; 
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavigationBar = () => {
  const pathname = usePathname()
  return (
    <div className='w-full fixed right-0 h-fit top-0 px-4 md:hidden text-white pt-4'>
        <div className="w-full h-full flex items-center justify-end roboto-slab text-base">
            <div className="flex gap-2 flex-wrap max-sm:w-[400px] justify-end">
                <Link href="/me" className={`${pathname === '/me' && 'border border-[var(--main-color)]'} navLink active:border border-[var(--main-color)]`}>ME</Link>
                <Link href="/skills" className={`${pathname === '/skills' && 'border border-[var(--main-color)]'} navLink active:border border-[var(--main-color)] col-span-2`}>SKILLS</Link>
                <Link href="/experience" className={`${pathname === '/experience' && 'border border-[var(--main-color)]'} navLink active:border border-[var(--main-color)] col-span-2`}>EXPERIENCE</Link>
                <Link href="/qmark" className={`${pathname === '/qmark' && 'border border-[var(--main-color)]'} navLink active:border border-[var(--main-color)]`}>?</Link>
                <Link href="/" className={`${pathname === '/' && 'border border-[var(--main-color)]'} navLink active:border border-[var(--main-color)]`}><IoLogoGameControllerB /></Link>
                <Link href="/contact" className={`${pathname === '/contact' && 'border border-[var(--main-color)]'} navLink active:border border-[var(--main-color)] col-span-2`}>CONTACT</Link>
            </div>
        </div>
    </div>
  )
}

export default NavigationBar