import React, { useContext } from "react";
import { ContextUI } from "./context/contextUI";
import MyTable from "./MyTable/MyTable";
import PopUp from "./PopUp/PopUp";
import Form from "./Form/Form";
import { PopUpVariant } from "./constants";
import "./globals.scss";
import style from "./App.module.scss";
import ConfirmAction from "./ConfinrAction/ConfirmAction";
import MyTableProjects from "./MyTable/MyTableProjects";
import FormProject from "./Form/FormProject";

const App: React.FC = () => {
  const { stateUI, togglePopUp } = useContext(ContextUI);
  const { popUpIsOpen, popUpVariant } = stateUI;

  const generatePopUpChildren = () => {
    switch (popUpVariant) {
      case PopUpVariant.ADD_NEW_EMPLOYEE:
        return <Form formAction={PopUpVariant.ADD_NEW_EMPLOYEE} />;
      case PopUpVariant.ADD_NEW_PROJECT:
        return <FormProject formAction={PopUpVariant.ADD_NEW_PROJECT} />;
      case PopUpVariant.CONFIRM:
        return <ConfirmAction />;
      case PopUpVariant.CONFIRM_PROJECT:
        return <ConfirmAction />;
      case PopUpVariant.EDIT_EMPLOYEE:
        return <Form formAction={PopUpVariant.EDIT_EMPLOYEE} />;
      case PopUpVariant.EDIT_PROJECT:
        return <FormProject formAction={PopUpVariant.EDIT_PROJECT} />;
    }
  };

  return (
    <div className={style.wrapper}>
      <h1>Web Development projects</h1>
      <button
        className={style.btnAddNew}
        onClick={() => togglePopUp(PopUpVariant.ADD_NEW_PROJECT)}
      >
        Add new
      </button>
      <MyTableProjects />
      {popUpIsOpen && <PopUp>{generatePopUpChildren()}</PopUp>}
    </div>
  );
};

export default App;
