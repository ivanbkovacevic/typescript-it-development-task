import React, { useContext } from "react";
import { ContextUI } from "./context/contextUI";
import MyTable from "./MyTable/MyTable";
import PopUp from "./PopUp/PopUp";
import Form from "./Form/Form";
import { PopUpVariant } from "./constants";
import "./globals.scss";
import style from "./App.module.scss";

const App: React.FC = () => {
  const { stateUI, togglePopUp } = useContext(ContextUI);
  const { popUpIsOpen, popUpVariant } = stateUI;

  const generatePopUpChildren = () => {
    if (popUpVariant === PopUpVariant.ADD_NEW_EMPLOYEE) {
      return <Form formAction={PopUpVariant.ADD_NEW_EMPLOYEE} />;
    } else {
      return <Form formAction={PopUpVariant.EDIT_EMPLOYEE} />;
    }
  };

  return (
    <div className={style.wrapper}>
      <button
        className={style.btnAddNew}
        onClick={() => togglePopUp(PopUpVariant.ADD_NEW_EMPLOYEE)}
      >
        Add new
      </button>
      <MyTable />
      {popUpIsOpen && <PopUp>{generatePopUpChildren()}</PopUp>}
    </div>
  );
};

export default App;
