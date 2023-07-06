import React, { useState } from "react";
import NumOfRows from "./NumOfRows/NumOfRows";
import Pagination from "./Pagination/Pagination";
import { Employee, TABLE_HEADERS } from "../constants";
import style from "./MyTable.module.scss";

interface MyTableProps {
  list: Employee[];
  handleSort: (s: string, sp: string) => void;
  handleRemoveEmployee: (e: React.MouseEvent, i: number) => void;
  handleEditEmployee: (employees: Employee) => void;
}

const MyTable: React.FC<MyTableProps> = ({
  list,
  handleSort,
  handleRemoveEmployee,
  handleEditEmployee,
}) => {
  const [numOfRows, setNumOfRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const generateTableHeaders = () => {
    const tableHeaders = TABLE_HEADERS.map((item) => {
      return (
        <th key={item.title}>
          <span>{item.title}</span>
          <button onClick={() => handleSort("a", item.sortProperty)}>
            &#8593;
          </button>
          <button onClick={() => handleSort("d", item.sortProperty)}>
            &#8595;
          </button>
        </th>
      );
    });
    return tableHeaders;
  };

  const generateTableRows = () => {
    const pageSettedList = list.slice(
      numOfRows * (currentPage - 1),
      numOfRows * currentPage
    );
    const tableRows = pageSettedList.map((item, index) => {
      return (
        <tr key={item.id} onClick={() => handleEditEmployee(item)}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.position}</td>
          <td>{item.office}</td>
          <td>{item.age}</td>
          <td>{item.startDate}</td>
          <td>{item.salary}</td>
          <td>
            <button onClick={(e) => handleRemoveEmployee(e, index)}>
              Remove
            </button>
          </td>
        </tr>
      );
    });
    return tableRows;
  };

  const handleNumOfRows = (value: number) => {
    setNumOfRows(value);
  };
  const handlePagination = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className={style.wrapper}>
      <NumOfRows handleNumOfRows={handleNumOfRows} numOfRows={numOfRows} />
      <table>
        <thead>
          <tr>{generateTableHeaders()}</tr>
        </thead>
        <tbody>{generateTableRows()}</tbody>
      </table>
      <Pagination
        listLength={list.length}
        numOfRows={numOfRows}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default MyTable;
