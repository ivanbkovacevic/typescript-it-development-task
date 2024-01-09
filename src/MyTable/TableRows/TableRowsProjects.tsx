import React, { useContext } from "react";
import { Context } from "../../context/context";
import { ContextUI } from "../../context/contextUI";
import { Project, PopUpVariant } from "../../constants";

interface TableRowsProps {
  data: Project;
}

const TableRowsProducts: React.FC<TableRowsProps> = ({ data }) => {
  const { selectProject } = useContext(Context);
  const { togglePopUp } = useContext(ContextUI);
  return (
    <tr
      key={data.id}
      onDoubleClick={() => {
        selectProject(data);
        togglePopUp(PopUpVariant.EDIT_PROJECT);
      }}
    >
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>
        <a href={data.productPage} target="_blank">
          {data.productPage.substring(8)}
        </a>
      </td>
      <td>{data.articlePageText}</td>
      <td>{data.htmlEmail}</td>
      <td>{data.pageLink}</td>
      <td>
        <img src={data.productImg} alt={data.productImgAltText} />
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
      </td>
    </tr>
  );
};

export default TableRowsProducts;
