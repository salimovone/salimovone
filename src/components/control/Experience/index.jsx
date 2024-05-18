import { HiArrowCircleRight } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { get, getDatabase, push, ref, remove, set } from "firebase/database";
import app from "@/firebaseConfig";
import ModalAdd from "@/components/ModalAdd";

const Experience = () => {
  const [inEdit, setInEdit] = useState(-1);
  const [experience, setExperience] = useState([]);
  const [inEditElemet, setInEditElemet] = useState({});
  const [modal, setModal] = useState("hidden");
  const [opened, setOpened] = useState(-1);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "data/experience");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const myData = snapshot.val();
      const temporaryArray = Object.keys(myData).map((item) => {
        return {
          ...myData[item],
          id: item,
        };
      });

      setExperience(temporaryArray);
    } else {
      alert("no data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickEdit = (x) => {
    if (x !== inEdit) {
      setInEditElemet(experience[x]);
      setInEdit(x);
      setOpened(x);
    } else {
      updateData(x);
      setInEditElemet({});
      setInEdit(-1);
      setOpened(-1);
    }
  };

  const updateData = async () => {
    const db = getDatabase(app);
    const newDocRef = ref(db, "data/experience/" + inEditElemet.id);
    set(newDocRef, { value: inEditElemet.value }).catch((error) => {
      alert("error: ", error.message);
    });
    fetchData();
  };

  const deleteExp = async (x) => {
    const db = getDatabase(app);
    const docRef = ref(db, "data/experience/" + experience[x].id);
    remove(docRef);
    fetchData();
  };

  // const crateData = async (val) => {
  //   const db = getDatabase(app);
  //   const newDocRef = push(ref(db, "data/skills"));
  //   set(newDocRef, { value: val }).catch((error) => {
  //     alert("error: ", error.message);
  //   });
  // };

  // const modalFunc = (e) => {
  //   if (e) crateData(e);
  //   setModal("hidden");
  //   fetchData();
  // };

  return (
    <div className="relative w-full">
      <h1 className="mb-4">Experience page in edit mode</h1>
      {experience.map((item, index) => {
        return (
          <div
            key={index + 1}
            className="w-full mb-2 bg-[#fff2] px-3 py-1 rounded"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="cursor-pointer"
                  onClick={() => setOpened(opened !== index ? index : -1)}
                >
                  <HiArrowCircleRight />
                </div>
                <span className={index === inEdit && "hidden"}>
                  {item.name}
                </span>
                <input
                  type="text"
                  value={inEditElemet.name}
                  onChange={(e) => {
                    setInEditElemet(inEditElemet.name = e.target.value);
                  }}
                  className={`bg-transparent text-gray-500 border p-1 rounded ${
                    index !== inEdit && "hidden"
                  }`}
                />
              </div>
              <span className="text-[24px] flex items-center justify-center gap-2">
                <button onClick={() => clickEdit(index)}>
                  {index === inEdit ? (
                    <MdOutlineDownloadDone />
                  ) : (
                    <RiEditCircleLine />
                  )}
                </button>
                <button
                  onClick={() => deleteExp(index)}
                  className="text-red-700 text-[28px]"
                >
                  <TiDeleteOutline />
                </button>
              </span>
            </div>

            <div
              className={
                "w-full mt-3 text-slate-500 border-t " +
                (opened !== index && "hidden")
              }
            >
              <span className={index === inEdit && "hidden"}>
                {item?.about}
              </span>
              <textarea
                type="text"
                value={inEditElemet.about}
                onChange={(e) =>
                  setInEditElemet((inEditElemet.about = e.target.value))
                }
                className={`bg-transparent text-gray-500 border p-1 w-full rounded ${
                  index !== inEdit && "hidden"
                }`}
              />
            </div>
            <div
              className={
                "w-full mt-3 text-lime-500 text-right " +
                (index !== opened && "hidden")
              }
            >
              <span className={index === inEdit && "hidden"}>
                [{item?.year?.begin} to {item?.year?.end}]
              </span>
              <span className={index !== inEdit && "hidden"}>
                <input
                  type="text"
                  // value={inEditElemet.year.begin}
                  onChange={(e) => {
                    // setInEditElemet(inEditElemet.year.begin = e.target.value);
                    console.log(inEditElemet)
                  }}
                  className={`bg-transparent text-gray-500 border px-1 w-fit rounded`}
                />{" "}
                to{" "}
                <input
                  type="text"
                  // value={inEditElemet.year.end}
                  onChange={(e) => {
                    // setInEditElemet(inEditElemet.year.end = e.target.value)
                  }}
                  className={`bg-transparent text-gray-500 border px-1 rounded`}
                />
              </span>
            </div>
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
        {/* <ModalAdd className={modal} func={modalFunc} /> */}
      </div>
    </div>
  );
};

export default Experience;
