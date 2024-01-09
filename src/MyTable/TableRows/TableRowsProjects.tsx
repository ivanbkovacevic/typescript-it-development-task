import React, { useContext } from "react";
import { Context } from "../../context/context";
import { ContextUI } from "../../context/contextUI";
import { Project, PopUpVariant } from "../../constants";
import style from "./TableRows.module.scss";
import ControlledPopup from "../../ControledPopUp/ControledPopUp";

interface TableRowsProps {
  data: Project;
}

const TableRowsProjects: React.FC<TableRowsProps> = ({ data }) => {
  const { selectProject } = useContext(Context);
  const { togglePopUp } = useContext(ContextUI);

  return (
    <tr key={data.id}>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>
        <a href={data.productPage} target="_blank" rel="noreferrer">
          {data.productPage.substring(8)}
        </a>
      </td>
      <td>{data.articlePageText}</td>
      <td>{data.htmlEmail}</td>
      <td>{data.pageLink}</td>
      <td>
        <img src={data.productImg} alt={data.productImgAltText} />
        <ControlledPopup src={data.productImg} alt={data.productImgAltText} />
      </td>
      <td>
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePopUp(PopUpVariant.CONFIRM_PROJECT);
            selectProject(data);
          }}
        >
          Remove
        </button>
        <button
          className={style.editBtn}
          onClick={(e) => {
            e.stopPropagation();
            selectProject(data);
            togglePopUp(PopUpVariant.EDIT_PROJECT);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default TableRowsProjects;
