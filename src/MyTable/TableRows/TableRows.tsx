import React, { useContext } from "react";
import { Context } from "../../context/context";
import { ContextUI } from "../../context/contextUI";
import { Employee, PopUpVariant } from "../../constants";

interface TableRowsProps {
  data: Employee;
}

const TableRows: React.FC<TableRowsProps> = ({ data }) => {
  const { selectEmployee } = useContext(Context);
  const { togglePopUp } = useContext(ContextUI);
  return (
    <tr
      key={data.id}
      onDoubleClick={() => {
        selectEmployee(data);
        togglePopUp(PopUpVariant.EDIT_EMPLOYEE);
      }}
    >
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.position}</td>
      <td>{data.office}</td>
      <td>{data.age}</td>
      <td>{data.startDate}</td>
      <td>{data.salary}</td>
      <td>
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePopUp(PopUpVariant.CONFIRM)
            selectEmployee(data)
          }}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default TableRows;
