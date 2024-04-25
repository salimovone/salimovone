"use client";
import { AiOutlineMenu } from "react-icons/ai"; 
import { IoLogoGameControllerB } from "react-icons/io";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="w-full sticky right-0 h-fit top-0 px-5 md:hidden text-white pt-2">
      <div className="w-full h-full flex items-center justify-between roboto-slab text-base">
        <div className="text-white text-2xl font-bold flex">
          <div>S</div>
          <div className="pt-2 text-[var(--main-color)]">S</div>
        </div>

        <div className="">
          <div onClick={()=>setOpen(!open)} className="p-2 relative bg-[var(--main-color)] rounded border border-[var(--main-color)]"><AiOutlineMenu /></div>
          {open && (
            <div className="absolute right-0 px-4 rounded-md top-16 w-full">
              <Link
                onClick={()=>setOpen(false)}
                href="/me"
                className={`mb-2 ${
                  pathname === "/me" && "border border-[var(--main-color)]"
                } navLink active:border border-[var(--main-color)]`}
              >
                ME
              </Link>
              <Link
                onClick={()=>setOpen(false)}
                href="/skills"
                className={`mb-2 ${
                  pathname === "/skills" && "border border-[var(--main-color)]"
                } navLink active:border border-[var(--main-color)] col-span-2`}
              >
                SKILLS
              </Link>
              <Link
                onClick={()=>setOpen(false)}
                href="/experience"
                className={`mb-2 ${
                  pathname === "/experience" &&
                  "border border-[var(--main-color)]"
                } navLink active:border border-[var(--main-color)] col-span-2`}
              >
                EXPERIENCE
              </Link>
              <Link
                onClick={()=>setOpen(false)}
                href="/qmark"
                className={`mb-2 ${
                  pathname === "/qmark" && "border border-[var(--main-color)]"
                } navLink active:border border-[var(--main-color)]`}
              >
                ?
              </Link>
              <Link
                onClick={()=>setOpen(false)}
                href="/"
                className={`mb-2 ${
                  pathname === "/" && "border border-[var(--main-color)]"
                } navLink active:border border-[var(--main-color)]`}
              >
                <IoLogoGameControllerB />
              </Link>
              <Link
                onClick={()=>setOpen(false)}
                href="/contact"
                className={`mb-2 ${
                  pathname === "/contact" && "border border-[var(--main-color)]"
                } navLink active:border border-[var(--main-color)] col-span-2`}
              >
                CONTACT
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
