import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { APIEndpoint, errorHandler } from "../config/consts";
import Loading from "./Loading";

const ChompsScraper = ({ location, setData, loading, setLoading }) => {
  const [filterUrl, setFilterUrl] = useState("https://chomps.com/pages/beef-jerky-near-me");

  const scrapeHandler = (e) => {
    console.log(location);
    e.preventDefault();
    setLoading(true);
    axios.request({
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${APIEndpoint}/chomps/stores`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(location)
    })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  const downloadHandler = (file) => {
    fetch(`${APIEndpoint}/download?path=csv\\${file}`, { "Content-Type": "application/json" })
      .then((response) => {
        if (response.status === 200) return response.blob();
        throw new Error("Failed to download file");
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => toast.error(error?.message, { position: "top-right" }));
  };

  return (
    <form className="space-y-4 sm:space-y-6 py-4 px-1" onSubmit={scrapeHandler}>
      <div className="grid sm:grid-cols-12 gap-4">
        <div className="sm:col-span-10 relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
            </svg>
          </div>
          <input type="url" name="filterUrl" id="filterUrl" value={filterUrl} onChange={(e) => setFilterUrl(e.target.value)} placeholder="Enter a url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button type="submit" className="col-span-1 p-3 sm:p-0 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          {loading ? <Loading /> : "Scrape"}
        </button>
        <button type="button" onClick={() => downloadHandler("chomps.csv")} className="col-span-1 p-3 sm:p-0 items-center bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          <svg className="w-6 h-6 mx-auto text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M5 5a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H5Zm9 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H14Zm3 0a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17ZM3 17v-3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm11-2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H14Zm3 0a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ChompsScraper;
