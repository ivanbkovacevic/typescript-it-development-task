import React from "react";
import projects from "../projects.json";
import { Project } from "../constants";

const projectsString = JSON.stringify(projects);
const productsParsed = JSON.parse(projectsString);

interface ContextState {
  projectsList: Project[];
  selectedProject: Project | null;
}

interface ContextProps {
  state: ContextState;
  setProjectsList: (data: Project[]) => void;
  addNewProject: (data: Project) => void;
  editProject: (data: Project) => void;
  removeProject: (data: Project | null) => void;
  selectProject: (data: Project | null) => void;
  sortingAscending: (data: string) => void;
  sortingDescending: (data: string) => void;
}

const Context = React.createContext<ContextProps>({
  state: {
    projectsList: productsParsed,
    selectedProject: null,
  },
  setProjectsList: () => {},
  addNewProject: () => {},
  editProject: () => {},
  removeProject: () => {},
  selectProject: () => {},
  sortingAscending: () => 0,
  sortingDescending: () => 0,
});

function ContextProvider(props: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<ContextState>({
    projectsList: productsParsed,
    selectedProject: null,
  });

  const setProjectsList = (data: Project[]) => {
    setState({
      ...state,
      projectsList: [...data],
    });
  };

  const addNewProject = (data: Project) => {
    setState({
      ...state,
      projectsList: [data, ...state.projectsList],
    });
  };

  const editProject = (data: Project) => {
    const newList = state.projectsList.map((item: Project) => {
      if (item.id === data.id) {
        return { ...data };
      }
      return item;
    });
    setState({
      ...state,
      projectsList: [...newList],
    });
  };

  const removeProject = (data: Project | null) => {
    const newList = state.projectsList.filter(
      (product: Project) => product.id !== data?.id
    );
    setState({
      ...state,
      projectsList: [...newList],
    });
  };

  const selectProject = (data: Project | null) => {
    setState({
      ...state,
      selectedProject: data,
    });
  };

  const sortingAscending = (property: string) => {
    const sorted = state.projectsList.sort((a: Project, b: Project) => {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
    setProjectsList([...sorted]);
  };
  const sortingDescending = (property: string) => {
    const sorted = state.projectsList.sort((a: Project, b: Project) => {
      if (a[property] > b[property]) {
        return -1;
      }
      if (a[property] < b[property]) {
        return 1;
      }
      return 0;
    });
    setProjectsList([...sorted]);
  };

  return (
    <Context.Provider
      value={{
        state,
        setProjectsList,
        addNewProject,
        editProject,
        removeProject,
        sortingAscending,
        sortingDescending,
        selectProject,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
