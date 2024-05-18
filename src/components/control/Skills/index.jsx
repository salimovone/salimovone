import { RiEditCircleLine } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { get, getDatabase, push, ref, remove, set } from "firebase/database";
import app from "@/firebaseConfig";
import ModalAdd from "@/components/ModalAdd";

const Skills = () => {
  const [inEdit, setInEdit] = useState(-1);
  const [skills, setSkills] = useState([]);
  const [inEditElemet, setInEditElemet] = useState({});
  const [modal, setModal] = useState("hidden");

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "data/skills");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const myData = snapshot.val();
      const temporaryArray = Object.keys(myData).map((item) => {
        return {
          ...myData[item],
          id: item,
        };
      });

      setSkills(temporaryArray);
    } else {
      alert("no data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickEdit = (x) => {
    if (x !== inEdit) {
      setInEditElemet(skills[x]);
      setInEdit(x);
    } else {
      updateData(x);
      setInEditElemet({});
      setInEdit(-1);
    }
  };

  const updateData = async () => {
    const db = getDatabase(app);
    const newDocRef = ref(db, "data/skills/" + inEditElemet.id);
    set(newDocRef, { value: inEditElemet.value }).catch((error) => {
      alert("error: ", error.message);
    });
    fetchData();
  };

  const deleteSkill = async (x) => {
    const db = getDatabase(app);
    const docRef = ref(db, "data/skills/" + skills[x].id);
    remove(docRef);
    fetchData();
  };

  const crateData = async (val) => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "data/skills"));
    set(newDocRef, { value: val }).catch((error) => {
      alert("error: ", error.message);
    });
  };

  const modalFunc = (e) => {
    if (e) crateData(e);
    setModal("hidden");
    fetchData();
  };

  return (
    <div className="relative w-full">
      <h1 className="mb-4">Skills page in edit mode</h1>
      {skills.map((item, index) => {
        return (
          <div
            key={index + 1}
            className="w-full flex justify-between mb-2 bg-[#fff2] items-center px-3 py-1 rounded"
          >
            <span className={index === inEdit && "hidden"}>{item.value}</span>
            <input
              type="text"
              value={inEditElemet?.value}
              onChange={(e) =>
                setInEditElemet({ value: e.target.value, id: inEditElemet.id })
              }
              className={`bg-transparent text-gray-500 ${
                index !== inEdit && "hidden"
              }`}
            />
            <span className="text-[24px] flex items-center justify-center gap-2">
              <button onClick={() => clickEdit(index)}>
                {index === inEdit ? (
                  <MdOutlineDownloadDone />
                ) : (
                  <RiEditCircleLine />
                )}
              </button>
              <button
                className="text-red-700 text-[28px]"
                onClick={() => deleteSkill(index)}
              >
                <TiDeleteOutline />
              </button>
            </span>
          </div>
        );
      })}
      <div className="w-full flex justify-end">
        <button
          className="bg-[#fff2] px-3 py-1 rounded"
          onClick={() => setModal("")}
        >
          add skill
        </button>
        <ModalAdd className={modal} func={modalFunc} />
      </div>
    </div>
  );
};

export default Skills;
