import Contact from "@/components/control/Contact";
import Experience from "@/components/control/Experience";
import Game from "@/components/control/Game";
import Me from "@/components/control/Me";
import QMark from "@/components/control/QMark";
import Skills from "@/components/control/Skills";

export const pages = [
  {
    name: "game",
    element: <Game/>,
  },
  {
    name: "me",
    element: <Me/>,
  },
  {
    name: "skills",
    element: <Skills/>,
  },
  {
    name: "experience",
    element: <Experience/>,
  },
  {
    name: "qMark",
    element: <QMark/>,
  },
  {
    name: "contact",
    element: <Contact/>,
  },
];
