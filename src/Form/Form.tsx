import React, { useState } from "react";
import FormInput from "./FormInput/FormInput";
import { Employee, PopUpVariant } from "../constants";
import style from "./Form.module.scss";

interface FormProps {
  addNewEmployee?: (emp: Employee) => void;
  togglePopUp: (v?: string) => void;
  formAction: string;
  editEmployee?: (emp: Employee) => void;
  employeeToEdit?: Employee;
  listLength?: number;
}

const Form: React.FC<FormProps> = ({
  addNewEmployee = () => {},
  togglePopUp,
  formAction,
  editEmployee = () => {},
  listLength = 0,
  employeeToEdit = {
    name: "",
    age: "",
    office: "",
    startDate: "",
    salary: "",
    position: "",
    id: listLength + 1,
  },
}) => {
  const employeeData: Employee =
    formAction === PopUpVariant.ADD_NEW_EMPLOYEE
      ? {
          name: "",
          age: "",
          office: "",
          startDate: "",
          salary: "",
          position: "",
          id: listLength + 1,
        }
      : { ...employeeToEdit };
      
  const [employeeInfo, setEmployeeInfo] = useState<Employee>(employeeData);

  const handleChange = (fieldName: string, value: string) => {
    setEmployeeInfo({ ...employeeInfo, [fieldName]: value });
  };
  const handleFormSubmited = (e: React.FormEvent) => {
    e.preventDefault();
    if (formAction === PopUpVariant.ADD_NEW_EMPLOYEE) {
      addNewEmployee(employeeInfo);
    } else {
      editEmployee(employeeInfo);
    }
    togglePopUp();
  };

  const generateFormFields = () => {
    const fields = [
      {
        label: "Name",
        id: "name",
        type: "text",
        required: true,
        name: "name",
        placeHolder: "John Doe",
        value: employeeInfo.name,
      },
      {
        label: "Position",
        id: "position",
        type: "text",
        required: true,
        name: "position",
        placeHolder: "Accountant",
        value: employeeInfo.position,
      },
      {
        label: "Office",
        id: "office",
        type: "text",
        required: true,
        name: "office",
        placeHolder: "Tokyo",
        value: employeeInfo.office,
      },
      {
        label: "Age",
        id: "age",
        type: "text",
        required: true,
        name: "age",
        placeHolder: "35",
        value: employeeInfo.age,
      },
      {
        label: "Start Date",
        id: "startDate",
        type: "text",
        required: true,
        name: "startDate",
        placeHolder: "2012/03/29",
        value: employeeInfo.startDate,
      },
      {
        label: "Salary",
        id: "salary",
        type: "text",
        required: true,
        name: "salary",
        placeHolder: "$433,060",
        value: employeeInfo.salary,
      },
    ];

    return fields.map((item) => {
      return (
        <FormInput
          key={item.name}
          label={item.label}
          id={item.id}
          type={item.type}
          required={item.required}
          name={item.name}
          placeHolder={item.placeHolder}
          value={employeeInfo[item.name]}
          onChangeHandler={handleChange}
        />
      );
    });
  };
  return (
    <div>
      <h1>
        {formAction === PopUpVariant.ADD_NEW_EMPLOYEE
          ? "Add new employee"
          : "Edit Employee"}
      </h1>
      <form onSubmit={handleFormSubmited} className={style.wrapper}>
        {generateFormFields()}
        <button type="submit">
          {formAction === PopUpVariant.ADD_NEW_EMPLOYEE
            ? "Add new employee"
            : "Edit Employee"}
        </button>
      </form>
    </div>
  );
};

export default Form;
