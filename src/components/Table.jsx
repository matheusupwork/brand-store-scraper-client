import React from "react";
import { columns, } from "../config/consts";
import Loading from "./Loading";

const Table = ({ data, loading }) => {
  const LoadingElement = (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4" colSpan={`${columns.length}`}>
        <Loading />
      </td>
    </tr>
  );
  const DataElement = data?.map((row, rowIndex) => (
    <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{rowIndex + 1}</td>
      <td className="px-6 py-4">{row?.id}</td>
      <td className="px-6 py-4">{row?.name}</td>
      <td className="px-6 py-4">{row?.address}</td>
      <td className="px-6 py-4">{row?.city}</td>
      <td className="px-6 py-4">{row?.state}</td>
      <td className="px-6 py-4">{row?.postalCode}</td>
      <td className="px-6 py-4">{row?.phone}</td>
    </tr>
  ));

  return (
    <div>
      <div className={`relative overflow-x-auto shadow-md ${loading && "animate-pulse"}`}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column) => (
                <th key={column.Header} scope="col" className="px-6 py-3">
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{loading ? LoadingElement : DataElement}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
