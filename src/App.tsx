import { useState } from "react";
import React, { useContext } from "react";
import { Context } from "./context";
import employees from "./employees.json";
import MyTable from "./MyTable/MyTable";
import PopUp from "./PopUp/PopUp";
import Form from "./Form/Form";
import ConfirmAction from "./ConfirmAction/ConfirmAction";
import { Employee, PopUpVariant, SortOrder, SortProperties } from "./constants";
import "./globals.scss";
import style from "./App.module.scss";

const App: React.FC = () => {
  const { state, togglePopUp } = useContext(Context);
  const { popUpIsOpen, popUpVariant } = state;

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
  const [employeesList, setEmployeesList] = useState<Employee[]>(
    addedIdToTheEmployeesList
  );
  const [employeeIndex, setEmployeeIndex] = useState<number | null>(null);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee>();

  const sortingAscending = (property: string) => {
    const sorted = employeesList.sort((a: any, b: any) => {
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
    const sorted = employeesList.sort((a: any, b: any) => {
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

  const addNewEmployee = (newEmployee: Employee) => {
    setEmployeesList([newEmployee, ...employeesList]);
  };

  const editEmployee = (employee: Employee) => {
    const newList = employeesList.map((item: Employee) => {
      if (item.id === employee.id) {
        return { ...employee };
      }
      return item;
    });
    setEmployeesList([...newList]);
    togglePopUp();
  };

  const handleRemoveEmployee = () => {
    const newList = employeesList.filter(
      (employee: Employee, index: number) => employeeIndex !== index
    );
    setEmployeesList([...newList]);
    togglePopUp();
  };

  const handleRemoveEmployeePopUp = (
    event: React.MouseEvent,
    eIndex: number
  ) => {
    event.stopPropagation();
    togglePopUp(PopUpVariant.CONFIRM);
    setEmployeeIndex(eIndex);
  };
  const handleEditEmployeePopUp = (employee: Employee) => {
    togglePopUp(PopUpVariant.EDIT_EMPLOYEE);
    setEmployeeToEdit(employee);
  };

  const generatePopUpChildren = () => {
    switch (popUpVariant) {
      case PopUpVariant.ADD_NEW_EMPLOYEE:
        return (
          <Form
            formAction={PopUpVariant.ADD_NEW_EMPLOYEE}
            addNewEmployee={addNewEmployee}
            listLength={employeesList.length}
          />
        );
      case PopUpVariant.CONFIRM:
        return <ConfirmAction confirmed={handleRemoveEmployee} />;
      default:
        return (
          <Form
            formAction={PopUpVariant.EDIT_EMPLOYEE}
            editEmployee={editEmployee}
            employeeToEdit={employeeToEdit}
          />
        );
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
      <MyTable
        list={employeesList}
        handleSort={handleSort}
        handleRemoveEmployee={handleRemoveEmployeePopUp}
        handleEditEmployee={handleEditEmployeePopUp}
      />
      <PopUp show={popUpIsOpen}>{generatePopUpChildren()}</PopUp>
    </div>
  );
};

export default App;
