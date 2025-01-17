import axios from "axios";
import React, { useEffect, useState } from "react";
import ChompsScraper from "../components/ChompsScraper";
import Table from "../components/Table";
import { errorHandler } from "../config/consts";

const Dashboard = () => {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.request({
      method: 'GET',
      maxBodyLength: Infinity,
      url: 'https://maxmind.destinilocators.com/geoipjson.php',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        setLocation(response.data);
      })
      .catch((error) => {
        errorHandler(error);
      });
  }, []);



  return (
    <div className="dark">
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-5">
        <div className="flex flex-col items-center px-6 mx-auto">
          <a href="https://amzsummits.com/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="mr-2 invert dark:invert-0" src="https://amzsummits.com/images/logo.svg" alt="logo" />
          </a>
        </div>

        <ChompsScraper location={location} setData={setData} loading={loading} setLoading={setLoading} />
        <Table data={data} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
