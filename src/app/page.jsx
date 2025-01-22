"use client";

import { malumotlarBazasi } from "./helper";

const Home = () => {
  
  const handleCopyMalumotlarBazasi = async () => {

    try {
        await navigator.clipboard.writeText(malumotlarBazasi);
        alert('Kod clipboardga muvaffaqiyatli yozildi!');
    } catch (err) {
        console.error('Kod clipboardga yozilmadi:', err);
    }
};

  return (
    <div className="h-screen px-10 flex-col w-full text-white flex justify-center items-start">
      {/* <div className="game_title max-md:text-3xl">I Am a Web Developer</div>
      <p className="text-2xl max-md:text-xl">
        But <span className="text-[var(--main-color)]">Why?</span>
      </p> */}
      <button onClick={handleCopyMalumotlarBazasi}>Ma'lumotlar bazasi 15</button>
    </div>
  );
};

export default Home;
