import React from "react";
import { PopUpVariant } from "../constants";

interface ContextState {
  popUpIsOpen: boolean;
  popUpVariant: string;
}

interface ContextProps {
  state: ContextState;
  togglePopUp: (v?: string ) => void;
}

const ContextUI = React.createContext<ContextProps>({
  state: {
    popUpIsOpen: false,
    popUpVariant: PopUpVariant.ADD_NEW_EMPLOYEE,
  },
  togglePopUp: () => {},
});

function ContextUIProvider(props: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<ContextState>({
    popUpIsOpen: false,
    popUpVariant: PopUpVariant.ADD_NEW_EMPLOYEE,
  });

  const togglePopUp = (variant: string = PopUpVariant.ADD_NEW_EMPLOYEE) => {
    setState({
      ...state,
      popUpIsOpen: !state.popUpIsOpen,
      popUpVariant: variant,
    });
  };


  return (
    <ContextUI.Provider
      value={{
        state,
        togglePopUp,
      }}
    >
      {props.children}
    </ContextUI.Provider>
  );
}

export { ContextUI, ContextUIProvider };
