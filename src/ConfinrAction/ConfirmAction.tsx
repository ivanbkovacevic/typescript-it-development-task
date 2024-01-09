import React, { useContext } from "react";
import { Context } from "../context/context";
import { ContextUI } from "../context/contextUI";
import style from "./ConfirmAction.module.scss";
import { PopUpVariant } from "../constants";

const ConfirmAction: React.FC = () => {
  const { removeEmployee, removeProject, state } = useContext(Context);
  const { selectedEmployee, selectedProject } = state;
  const { togglePopUp, stateUI } = useContext(ContextUI);
  const { popUpVariant } = stateUI;
  return (
    <div className={style.wrapper}>
      <h2>
        Are you sure that you want to remove this{" "}
        {popUpVariant === PopUpVariant.CONFIRM ? "employee" : "project"}
      </h2>
      <div className={style.btnsWrapper}>
        <button
          onClick={() => {
            if(PopUpVariant.CONFIRM) {
              removeEmployee(selectedEmployee);
            }
            removeProject(selectedProject);
            togglePopUp();
          }}
        >
          Yes
        </button>
        <button onClick={() => togglePopUp()}>No</button>
      </div>
    </div>
  );
};

export default ConfirmAction;
