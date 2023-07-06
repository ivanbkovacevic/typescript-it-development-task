import React, { useContext } from "react";
import { Context } from "../context/context";
import { ContextUI } from "../context/contextUI";
import style from "./ConfirmAction.module.scss";

const ConfirmAction:React.FC = () => {
    const { removeEmployee, state } = useContext(Context);
    const { selectedEmployee } = state;
    const { togglePopUp } = useContext(ContextUI);


  return (
    <div className={style.wrapper}>
      <h2>Are you sure that you want to remove this employee?</h2>
      <div className={style.btnsWrapper}>
        <button onClick={() => {
            removeEmployee(selectedEmployee);
            togglePopUp();
            }}>Yes</button>
        <button onClick={() => togglePopUp()}>No</button>
      </div>
    </div>
  );
};

export default ConfirmAction;