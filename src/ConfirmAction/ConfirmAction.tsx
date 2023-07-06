import React, { useContext } from "react";
import { Context } from "../context";
import style from "./ConfirmAction.module.scss";

interface ConfirmActionProps {
  confirmed: () => void;
}

const ConfirmAction: React.FC<ConfirmActionProps> = ({ confirmed }) => {
  const { togglePopUp } = useContext(Context);

  return (
    <div className={style.wrapper}>
      <h2>Are you sure that you want to remove this employee?</h2>
      <div className={style.btnsWrapper}>
        <button onClick={confirmed}>Yes</button>
        <button onClick={() => togglePopUp()}>No</button>
      </div>
    </div>
  );
};

export default ConfirmAction;
