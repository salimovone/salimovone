"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const QMark = () => {
  const router = useRouter()

  useEffect(() => {
    const handleWheel = (event) => {
      const delta = event.deltaY;
      event.preventDefault();
      if(delta>0){
        router.push("/")
      }
      if(delta<0){
        router.push("/experience")
      }
    };

    document.addEventListener('wheel', handleWheel);
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [])

  return (
    <div className="h-full w-full text-white flex justify-center items-center">
      QMark
    </div>
  );
};

export default QMark;
