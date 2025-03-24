import React, { useContext, useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistics = () => {
  
  const {backendUrl}=useContext(AuthContext);
  const [year, setYear]=useState(new Date().getFullYear().toString());
  const [donorYearlyData, setDonorYearlyData]=useState({})
  const [waitingRecipientsYearlyData, setWaitingRecipientsYearlyData]=useState({})
  const [successfulTransplantYearlyData, setSuccessfulTransplantYearlyData]=useState({})
  const [totalDonors, setTotalDonors]=useState(0);
  const [totalWaitingRecipients, setTotalWaitingRecipients]=useState(0);
  const [totalSuccessfulTransplant ,setTotalSuccessfulTransplant ]=useState(0);
  useEffect(()=>{
    const fetchDonorData=async()=>{
      try{
        const response=await axios.get(`${backendUrl}/api/chart-data/${year}`);
        setDonorYearlyData(response.data.donorsByMonth || {});
        setWaitingRecipientsYearlyData(response.data.waitingRecipientsYearlyData || {});
        setSuccessfulTransplantYearlyData(response.data.successfulTransplantYearlyData || {})
        setTotalDonors(response.data.totalDonors);
        setTotalWaitingRecipients(response.data.totalWaitingRecipients);
        setTotalSuccessfulTransplant(response.data.totalSuccessfulTransplant);
      }catch(err){
        toast.error(err.response.message);
      }
    };
    fetchDonorData();
  },[year])
  
  // Sample data
  const donorsData = {
    labels:Object.keys(donorYearlyData).length!==0?Object.keys(donorYearlyData):["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Donors Registered",
        data: Object.values(donorYearlyData).length!==0?Object.values(donorYearlyData):[0,0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // // Sample data
  // const donorsData = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //   datasets: [
  //     {
  //       label: "Donors Registered",
  //       data: [50, 60, 70, 80, 90, 100],
  //       backgroundColor: "rgba(75, 192, 192, 0.6)",
  //     },
  //   ],
  // };

  // const recipientsData = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //   datasets: [
  //     {
  //       label: "Recipients Waiting",
  //       data: [200, 210, 220, 230, 240, 250],
  //       backgroundColor: "rgba(255, 99, 132, 0.6)",
  //     },
  //     {
  //       label: "Recipients Transplanted",
  //       data: [50, 60, 70, 80, 90, 100],
  //       backgroundColor: "rgba(54, 162, 235, 0.6)",
  //     },
  //   ],
  // };

  const recipientsData = {
    labels: Object.keys(waitingRecipientsYearlyData).length!==0?Object.keys(waitingRecipientsYearlyData):["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Recipients Waiting",
        data: Object.values(waitingRecipientsYearlyData).length!==0?Object.values(waitingRecipientsYearlyData):[0,0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Recipients Transplanted",
        data: Object.values(successfulTransplantYearlyData).length!==0?Object.values(successfulTransplantYearlyData):[0,0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const total=totalWaitingRecipients+totalSuccessfulTransplant;
  const successRateData = {
    labels: ["Successful Transplants", "Waiting for Organs"],
    datasets: [
      {
        data: [(totalSuccessfulTransplant/total)*360, (totalWaitingRecipients/total)*360], // Example data
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  const currentYear = new Date().getFullYear();
  const startYear = 2015; // Adjust as needed
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);
  
  return (
    <div className="container mt-2">
      <h1 className="text-center mb-4">Gift of Life Dashboard</h1>

      {/* Key Metrics Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Donors Registered</h5>
              <p className="card-text fs-3">{totalDonors}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Recipients Waiting</h5>
              <p className="card-text fs-3">{totalWaitingRecipients}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Successful Transplants</h5>
              <p className="card-text fs-3">{totalSuccessfulTransplant}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-2">
        <strong>Select the year for which you want to see the data</strong>
        <select name="year" id="year" className="border ms-2 p-1" onChange={(e)=>setYear(e.target.value)}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
      </div>
      {/* Charts Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Donors Registered In {year}</h5>
              <Bar data={donorsData} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recipients Overview In {year}</h5>
              <Bar data={recipientsData} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Transplant Success Rate</h5>
              <Pie data={successRateData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
