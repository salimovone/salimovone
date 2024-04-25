"use client";

const Home = () => {
  return (
    <div className="h-screen px-10 flex-col w-full text-white flex justify-center items-start">
      <div className="game_title max-md:text-3xl">I Am a Web Developer</div>
      <p className="text-2xl max-md:text-xl">
        But <span className="text-[var(--main-color)]">Why?</span>
      </p>
    </div>
  );
};

export default Home;
