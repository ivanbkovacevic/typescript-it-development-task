import React, { useContext } from "react";
import { ContextUI } from "../context/contextUI";
import style from "./PopUp.module.scss";

interface PopUpProps {
  children: React.ReactNode;
  show: boolean;
}

const PopUp: React.FC<PopUpProps> = ({ children, show }) => {
  const { togglePopUp } = useContext(ContextUI);

  return (
    <>
      {show && (
        <div className={style.overlay}>
          <div className={style.wrapper}>
            <button onClick={() => togglePopUp()}>&#10006;</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;
