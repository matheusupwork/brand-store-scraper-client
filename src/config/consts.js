import { toast } from "react-toastify";

export const APIEndpoint = "http://localhost:8080/api";
export const columns = [
  { Header: "NO", accessor: "no" },
  { Header: "ID", accessor: "id" },
  { Header: "NAME", accessor: "name" },
  { Header: "ADDRESS", accessor: "address" },
  { Header: "CITY", accessor: "city" },
  { Header: "STATE", accessor: "state" },
  { Header: "POSTAL CODE", accessor: "postalCode" },
  { Header: "PHONE", accessor: "phone" },
]
export const errorHandler = (error) => {
  if (error.response?.data) toast.error(error.response.data.message, { position: "top-right" });
  else toast.error(error.message, { position: "top-right" });
};
