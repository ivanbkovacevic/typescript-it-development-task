import React from "react";
import style from "./PopUp.module.scss";

interface PopUpProps {
  children: React.ReactNode;
  show: boolean;
  togglePopUp: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ children, show, togglePopUp }) => {
  return (
    <>
      {show && (
        <div className={style.overlay}>
          <div className={style.wrapper}>
            <button onClick={togglePopUp}>&#10006;</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;
