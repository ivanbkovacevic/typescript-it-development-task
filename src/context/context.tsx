import React from "react";
import employees from "../employees.json";
import projects from "../projects.json";
import { Employee, SortOrder, SortProperties, Project } from "../constants";

const employeesString = JSON.stringify(employees);
const employeesParsed = JSON.parse(employeesString);
const addedIdToTheEmployeesList = employeesParsed.map(
  (item: Employee, index: number) => {
    return {
      ...item,
      id: index + 1,
    };
  }
);
const projectsString = JSON.stringify(projects);
const productsParsed = JSON.parse(projectsString);
const addedIdToTheprojectsList = productsParsed.map(
  (item: Project, index: number) => {
    return {
      ...item,
      id: index + 1,
    };
  }
);

interface ContextState {
  employeesList: Employee[];
  projectsList: Project[];
  selectedEmployee: Employee | null;
  selectedProject: Project | null;
}

interface ContextProps {
  state: ContextState;
  setEmployeesList: (data: Employee[]) => void;
  setProjectsList: (data: Project[]) => void;
  handleSort: (order: string, value: string) => void;
  addNewEmployee: (data: Employee) => void;
  addNewProject: (data: Project) => void;
  editEmployee: (data: Employee) => void;
  editProject: (data: Project) => void;
  removeEmployee: (data: Employee | null) => void;
  removeProject: (data: Project | null) => void;
  selectEmployee: (data: Employee | null) => void;
  selectProject: (data: Project | null) => void;
}

const Context = React.createContext<ContextProps>({
  state: {
    employeesList: addedIdToTheEmployeesList,
    projectsList: addedIdToTheprojectsList,
    selectedEmployee: null,
    selectedProject: null,
  },
  setEmployeesList: () => {},
  addNewEmployee: () => {},
  editEmployee: () => {},
  removeEmployee: () => {},
  setProjectsList: () => {},
  addNewProject: () => {},
  editProject: () => {},
  removeProject: () => {},
  selectEmployee: () => {},
  selectProject: () => {},
  handleSort: () => {},
});

function ContextProvider(props: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<ContextState>({
    employeesList: addedIdToTheEmployeesList,
    projectsList: addedIdToTheprojectsList,
    selectedEmployee: null,
    selectedProject: null,
  });

  const setEmployeesList = (data: Employee[]) => {
    setState({
      ...state,
      employeesList: [...data],
    });
  };
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
  const addNewEmployee = (data: Employee) => {
    setState({
      ...state,
      employeesList: [data, ...state.employeesList],
    });
  };
  const editEmployee = (data: Employee) => {
    const newList = state.employeesList.map((item: Employee) => {
      if (item.id === data.id) {
        return { ...data };
      }
      return item;
    });
    setState({
      ...state,
      employeesList: [...newList],
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
  const removeEmployee = (data: Employee | null) => {
    const newList = state.employeesList.filter(
      (employee: Employee) => employee.id !== data?.id
    );
    setState({
      ...state,
      employeesList: [...newList],
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
  const selectEmployee = (data: Employee | null) => {
    setState({
      ...state,
      selectedEmployee: data,
    });
  };
  const selectProject = (data: Project | null) => {
    setState({
      ...state,
      selectedProject: data,
    });
  };

  const sortingAscending = (property: string) => {
    const sorted = state.employeesList.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
    setEmployeesList([...sorted]);
  };
  const sortingDescending = (property: string) => {
    const sorted = state.employeesList.sort((a: any, b: any) => {
      if (a[property] > b[property]) {
        return -1;
      }
      if (a[property] < b[property]) {
        return 1;
      }
      return 0;
    });
    setEmployeesList([...sorted]);
  };

  const handleSort = (order: string, value: string) => {
    switch (true) {
      case value === SortProperties.ID && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.ID);
        break;
      case value === SortProperties.ID && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.ID);
        break;
      case value === SortProperties.AGE && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.AGE);
        break;
      case value === SortProperties.AGE && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.AGE);
        break;
      case value === SortProperties.NAME && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.NAME);
        break;
      case value === SortProperties.NAME && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.NAME);
        break;
      case value === SortProperties.POSITION && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.POSITION);
        break;
      case value === SortProperties.POSITION && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.POSITION);
        break;
      case value === SortProperties.OFFICE && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.OFFICE);
        break;
      case value === SortProperties.OFFICE && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.OFFICE);
        break;
      case value === SortProperties.START_DATE && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.START_DATE);
        break;
      case value === SortProperties.START_DATE &&
        order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.START_DATE);
        break;
      case value === SortProperties.SALARY && order === SortOrder.ASCENDING:
        sortingAscending(SortProperties.SALARY);
        break;
      case value === SortProperties.SALARY && order === SortOrder.DESCENDING:
        sortingDescending(SortProperties.SALARY);
        break;
      default:
        break;
    }
  };

  return (
    <Context.Provider
      value={{
        state,
        setEmployeesList,
        addNewEmployee,
        editEmployee,
        removeEmployee,
        setProjectsList,
        addNewProject,
        editProject,
        removeProject,
        handleSort,
        selectEmployee,
        selectProject,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
