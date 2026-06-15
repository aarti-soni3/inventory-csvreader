import { useContext } from "react";
import "./filter.css";
import { LuDownload } from "react-icons/lu";
import { FeedbackContext } from "../../context/createContext";
import { useExportDataMutation } from "../../store/productApi";
import { useState } from "react";

export const Filter = () => {
  const { showSuccessFeedback, showErrorFeedback } =
    useContext(FeedbackContext);

  const [exportData, { isLoading }] = useExportDataMutation();

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleOnClick = async () => {
    try {
      const dateRange = { startDate: startDate, endDate: endDate };
      const blob = await exportData(dateRange).unwrap();

      if (blob) {
        console.log(blob);
        const url = window.URL.createObjectURL(blob);
        console.log(url);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "orders.xlsx");
        link.click();

        window.URL.revokeObjectURL(url);
        showSuccessFeedback("Dowloading Excel File");
      }
    } catch (error) {
      showErrorFeedback(error?.message || error?.data?.message);
    }
  };

  return (
    <div className="filter-container">
      <div className="date-container">
        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(event) => {
              console.log(event.target.value);
              setStartDate(event.target.value);
            }}
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(event) => {
              setEndDate(event.target.value);
            }}
          />
        </div>
      </div>

      <button className="button" onClick={handleOnClick} disabled={isLoading}>
        <LuDownload size="1.3rem" color="white" />
        Download
      </button>
    </div>
  );
};
