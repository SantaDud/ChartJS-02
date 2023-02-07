import "./App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getColdData, getCovidData, getFluData } from "./service/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Setting basic options for the chart including legend postion and title options.
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Line Chart",
    },
  },
};

function App() {
  // useState is used to create six state variables for cold, covid, and flu
  // Data variables hold the data
  // Labels variables hold the labels
  let [covidData, setCovidData] = useState([]);
  let [coldData, setColdData] = useState([]);
  let [fluData, setFluData] = useState([]);
  let [covidLabels, setCovidLabels] = useState([]);
  let [coldLabels, setColdLabels] = useState([]);
  let [fluLabels, setFluLabels] = useState([]);

  useEffect(() => {
    // Call the function created in the data.js file to fetch the data.
    getCovidData()
      .then((response) => {
        // create a local array for labels and data
        let labels = [];
        let data = [];

        // for each item of the response push the Year value in the labels
        // and push the No_of_colds value in the data
        response.forEach((res) => {
          labels.push(res["Year"]);
          data.push(Number(res["No_of_colds"]));
        });
        // Set the state variables so every time the state changes, the changes are reflected in the UI.
        setCovidData(data);
        setCovidLabels(labels);
      })
      .catch((error) => console.log(error));
    // Call the function created in the data.js file to fetch the data.
    getColdData()
      .then((response) => {
        // create a local array for labels and data
        let labels = [];
        let data = [];
        // for each item of the response push the Year value in the labels
        // and push the No_of_colds value in the data
        response.forEach((res) => {
          labels.push(res["Year"]);
          data.push(Number(res["No_of_colds"]));
        });
        // Set the state variables so every time the state changes, the changes are reflected in the UI.
        setColdData(data);
        setColdLabels(labels);
      })
      .catch((error) => console.log(error));
    // Call the function created in the data.js file to fetch the data.
    getFluData()
      .then((response) => {
        // create a local array for labels and data
        let labels = [];
        let data = [];
        // for each item of the response push the Year value in the labels
        // and push the No_of_colds value in the data
        response.forEach((res) => {
          labels.push(res["Year"]);
          data.push(Number(res["No_of_colds"]));
        });
        // Set the state variables so every time the state changes, the changes are reflected in the UI.
        setFluData(data);
        setFluLabels(labels);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      {/* Create first line graph */}
      {/* In the data we send the labels and the data as a dataset  */}
      {/* and set color options for the dataset */}
      <Line
        options={options}
        data={{
          labels: covidLabels,
          datasets: [
            {
              label: "Cases of Covid",
              data: covidData,
              borderColor: "rgb(200, 99, 132)",
              backgroundColor: "rgba(200, 99, 132, 0.5)",
            },
          ],
        }}
      />
      {/* In the data we send the labels and the data as a dataset  */}
      {/* and set color options for the dataset */}
      <Line
        options={options}
        data={{
          labels: coldLabels,
          datasets: [
            {
              label: "Cases of Cold",
              data: coldData,
              borderColor: "rgb(75, 150, 150)",
              backgroundColor: "rgb(75, 150, 150, .5)",
            },
          ],
        }}
      />
      {/* In the data we send the labels and the data as a dataset  */}
      {/* and set color options for the dataset */}
      <Line
        options={options}
        data={{
          labels: fluLabels,
          datasets: [
            {
              label: "Cases of Flu",
              data: fluData,
              borderColor: "rgb(132, 99, 255)",
              backgroundColor: "rgba(132, 99, 255, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
