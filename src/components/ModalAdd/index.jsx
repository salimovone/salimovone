import React, { useState } from "react";

const ModalAdd = ({ className, func }) => {
    const [newSkill, setNewSkill] = useState("")
  return (
    <center
      className={`absolute top-0 left-0 pt-60 h-full w-full ${className}`}
    >
      <div className=" bg-[#fff5] w-96 px-3 py-8 rounded-2xl">
        <div className="flex items-center justify-center gap-4">
          new skill:
          <input
            onChange={(e)=>setNewSkill(e.target.value)}
            value={newSkill}
            type="text"
            placeholder="skill name"
            className="p-2 bg-transparent rounded-md border"
          />
        </div>
        <button className="mt-3 border rounded-md px-8 py-2" onClick={()=>func(newSkill)}>done</button>
      </div>
    </center>
  );
};

export default ModalAdd;
