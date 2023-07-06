import React, { useContext, useEffect } from "react";
import { Context } from "../context/context";
import { ContextUI } from "../context/contextUI";
import { Employee, PopUpVariant } from "../constants";
import style from "./Form.module.scss";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError/TextError";

interface FormProps {
  formAction: string;
}

const FormComponent: React.FC<FormProps> = ({ formAction }) => {
  const { state, addNewEmployee, editEmployee, selectEmployee } =
    useContext(Context);
  const { selectedEmployee, employeesList } = state;
  const { togglePopUp, stateUI } = useContext(ContextUI);
  const { popUpIsOpen, popUpVariant } = stateUI;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required"),
    office: Yup.string().required("Office is required"),
    startDate: Yup.string().required("Start Date is required"),
    salary: Yup.string().required("Salary is required"),
    position: Yup.string().required("Position is required"),
  });

  const initialValues = {
    name: "",
    age: "",
    office: "",
    startDate: "",
    salary: "",
    position: "",
    id: 0,
  };
  console.log(selectedEmployee);
  const handleFormSubmited = (values: Employee, actions: any) => {
    if (formAction === PopUpVariant.ADD_NEW_EMPLOYEE) {
      addNewEmployee({ ...values, id: employeesList.length + 1 });
    } else {
      editEmployee(values);
    }
    actions.resetForm();
    togglePopUp();
  };

  useEffect(() => {
    if (popUpVariant === PopUpVariant.ADD_NEW_EMPLOYEE) {
     selectEmployee(null);
    }
  }, []);

  const generateFormFields = () => {
    const fields = [
      {
        label: "Name",
        id: "name",
        type: "text",
        required: true,
        name: "name",
        placeHolder: "John Doe",
        value: initialValues.name,
      },
      {
        label: "Position",
        id: "position",
        type: "text",
        required: true,
        name: "position",
        placeHolder: "Accountant",
        value: initialValues.position,
      },
      {
        label: "Office",
        id: "office",
        type: "text",
        required: true,
        name: "office",
        placeHolder: "Tokyo",
        value: initialValues.office,
      },
      {
        label: "Age",
        id: "age",
        type: "text",
        required: true,
        name: "age",
        placeHolder: "35",
        value: initialValues.age,
      },
      {
        label: "Start Date",
        id: "startDate",
        type: "text",
        required: true,
        name: "startDate",
        placeHolder: "2012/03/29",
        value: initialValues.startDate,
      },
      {
        label: "Salary",
        id: "salary",
        type: "text",
        required: true,
        name: "salary",
        placeHolder: "$433,060",
        value: initialValues.salary,
      },
    ];

    return fields.map((item) => {
      return (
        <div className={style.inputWrapper} key={item.id}>
          <label htmlFor={item.id}>{item.name}</label>
          <Field
            type={item.type}
            id={item.id}
            name={item.name}
            placeholder={item.placeHolder}
          />
          <ErrorMessage name={item.name} component={TextError} />
        </div>
      );
    });
  };

  return (
    <div className={style.wrapper}>
      <h1>
        {formAction === PopUpVariant.ADD_NEW_EMPLOYEE
          ? "Add new employee"
          : "Edit Employee"}
      </h1>
      <Formik
        initialValues={selectedEmployee || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmited}
        enableReinitialize={true}
      >
        <Form>
          {generateFormFields()}
          <button type="submit">
            {formAction === PopUpVariant.ADD_NEW_EMPLOYEE
              ? "Add new employee"
              : "Edit Employee"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormComponent;
