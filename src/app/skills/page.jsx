"use client";
import { useEffect, useState } from "react";
import styles from "./skills.module.css";
import { get, getDatabase, ref } from "firebase/database";
import app from "@/firebaseConfig";
import Loader from "@/components/Loader";

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const db = getDatabase(app)
    const dbRef = ref(db, "data/skills")
    const snapshot = await get(dbRef)
    if(snapshot.exists()){
      setSkills(Object.values(snapshot.val()))
      setLoading(false)
    } else {
      console.log("no data")
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  return loading?(<div><Loader/></div>):(
    <div className="h-screen w-full text-white flex items-center px-5">
      <ul className={`${styles.ul}`}>
        {skills?.map((item, index) => (
          <li key={index + 1} className={`${styles.li}`}>
            {item?.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills