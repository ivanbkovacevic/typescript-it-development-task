import React, { useContext, useEffect } from "react";
import { ContextUI } from "./context/contextUI";
import PopUp from "./PopUp/PopUp";
import { PopUpVariant } from "./constants";
import "./globals.scss";
import style from "./App.module.scss";
import ConfirmAction from "./ConfirmAction/ConfirmAction";
import MyTableProjects from "./MyTable/MyTableProjects";
import FormProject from "./Form/FormProject";

const App: React.FC = () => {
  const { stateUI, togglePopUp } = useContext(ContextUI);
  const { popUpIsOpen, popUpVariant } = stateUI;

  useEffect(() => {
    document.title = "Custom CRUD table";

    return () => {
      document.title = "Default Title";
    };
  }, []);
  const generatePopUpChildren = () => {
    switch (popUpVariant) {
      case PopUpVariant.ADD_NEW_PROJECT:
        return <FormProject formAction={PopUpVariant.ADD_NEW_PROJECT} />;
      case PopUpVariant.CONFIRM_PROJECT:
        return <ConfirmAction />;
      case PopUpVariant.EDIT_PROJECT:
        return <FormProject formAction={PopUpVariant.EDIT_PROJECT} />;
    }
  };

  return (
    <div className={style.wrapper}>
      <h1>Custom CRUD table</h1>
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
