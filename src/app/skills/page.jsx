"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Skills = () => {
  const router = useRouter()

  useEffect(() => {
    const handleWheel = (event) => {
      const delta = event.deltaY;
      event.preventDefault();
      if(delta>0){
        router.push("/experience")
      }
      if(delta<0){
        router.push("/me")
      }
    };

    document.addEventListener('wheel', handleWheel);
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [])

  return (
    <div className="h-screen w-full text-white flex justify-center items-center">
      Skills
    </div>
  );
};

export default Skills;
