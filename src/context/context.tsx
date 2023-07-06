import React from "react";
import employees from "../employees.json";
import {
  Employee,
  SortOrder,
  SortProperties,
} from "../constants";

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

interface ContextState {
  employeesList: Employee[];
  selectedEmployee: Employee | null;
}

interface ContextProps {
  state: ContextState;
  setEmployeesList: (data: Employee[]) => void;
  handleSort: (order: string, value: string) => void;
  addNewEmployee: (data: Employee) => void;
  editEmployee: (data: Employee) => void;
  removeEmployee: (data: Employee) => void;
  selectEmployee: (data: Employee | null) => void;
}

const Context = React.createContext<ContextProps>({
  state: {
    employeesList: addedIdToTheEmployeesList,
    selectedEmployee: null,
  },
  setEmployeesList: () => {},
  addNewEmployee: () => {},
  editEmployee: () => {},
  removeEmployee: () => {},
  selectEmployee: () => {},
  handleSort: () => {},
});

function ContextProvider(props: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<ContextState>({
    employeesList: addedIdToTheEmployeesList,
    selectedEmployee: null,
  });

  const setEmployeesList = (data: Employee[]) => {
    setState({
      ...state,
      employeesList: [...data],
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
  const removeEmployee = (data: Employee) => {
    const newList = state.employeesList.filter(
      (employee: Employee) => employee.id !== data.id
    );
    setState({
      ...state,
      employeesList: [...newList],
    });
  };
  const selectEmployee = (data: Employee | null) => {
    setState({
      ...state,
      selectedEmployee: data,
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
        handleSort,
        selectEmployee,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
