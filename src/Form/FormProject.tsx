import React, { useContext, useEffect } from "react";
import { Context } from "../context/context";
import { ContextUI } from "../context/contextUI";
import { PopUpVariant, Project } from "../constants";
import style from "./Form.module.scss";
import { v4 as uuid } from 'uuid';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError/TextError";

interface FormProps {
  formAction: string;
}

const FormProject: React.FC<FormProps> = ({ formAction }) => {
  const { state, addNewProject, editProject, selectProject } =
    useContext(Context);
  const { selectedProject } = state;
  const { togglePopUp, stateUI } = useContext(ContextUI);
  const { popUpVariant } = stateUI;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    productImg: Yup.string().required("Project image is required"),
    productPage: Yup.string().required("Project Page is required"),
    articlePageText: Yup.string().required("Text is required"),
    articlePageLink: Yup.string().required("Page link is required"),
    htmlEmail: Yup.string().required("Html email is required"),
    pageLink: Yup.string().required("Page link is required"),
    productImgAltText: Yup.string().required(
      "Project image alt text is required"
    ),
  });

  const initialValues = {
    name: "",
    productImg: "",
    productPage: "",
    articlePageText: "",
    articlePageLink: "",
    htmlEmail: "",
    pageLink: "",
    productImgAltText: "",
    id: "0",
  };
  const handleFormSubmited = (values: Project, actions: any) => {
    if (formAction === PopUpVariant.ADD_NEW_PROJECT) {
      addNewProject({ ...values, id: uuid() });
    } else {
      editProject(values);
    }
    actions.resetForm();
    togglePopUp();
    selectProject(null);
  };

  const generateFormFields = () => {
    const fields = [
      {
        label: "Name",
        id: "name",
        type: "text",
        required: true,
        name: "name",
        placeHolder: "cool project",
        value: initialValues.name,
      },
      {
        label: "Product image",
        id: "productImg",
        type: "text",
        required: true,
        name: "productImg",
        placeHolder: "some image",
        value: initialValues.productImg,
      },
      {
        label: "Product image alt Text",
        id: "productImgAltText",
        type: "text",
        required: true,
        name: "productImgAltText",
        placeHolder: "some image text",
        value: initialValues.productImgAltText,
      },
      {
        label: "Article Page text",
        id: "articlePageText",
        type: "text",
        required: true,
        name: "articlePageText",
        placeHolder: "This page is something",
        value: initialValues.articlePageText,
      },
      {
        label: "Html Email",
        id: "htmlEmail",
        type: "text",
        required: true,
        name: "htmlEmail",
        placeHolder: "html email",
        value: initialValues.htmlEmail,
      },
      {
        label: "Product page",
        id: "productPage",
        type: "text",
        required: true,
        name: "productPage",
        placeHolder: "www.something",
        value: initialValues.productPage,
      },
      {
        label: "Article page link",
        id: "articlePageLink",
        type: "text",
        required: true,
        name: "articlePageLink",
        placeHolder: "www.something",
        value: initialValues.articlePageLink,
      },
      {
        label: "Page link",
        id: "pageLink",
        type: "text",
        required: true,
        name: "pageLink",
        placeHolder: "www.something...",
        value: initialValues.articlePageLink,
      },
    ];

    return fields.map((item) => {
      return (
        <div className={style.inputWrapper} key={item.id}>
          <label htmlFor={item.id}>{item.label}</label>
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

  console.log(initialValues, PopUpVariant);
  return (
    <div className={style.wrapper}>
      <h1 className={style.heading}>
        {formAction === PopUpVariant.ADD_NEW_PROJECT
          ? "Add new project"
          : "Edit Project"}
      </h1>
      <Formik
        initialValues={selectedProject || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmited}
        enableReinitialize={true}
      >
        <Form>
          {generateFormFields()}
          <button type="submit">
            {formAction === PopUpVariant.ADD_NEW_PROJECT
              ? "Add new project"
              : "Edit project"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormProject;
