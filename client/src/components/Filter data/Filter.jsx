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
      const dateRange = {
        startDate: startDate,
        endDate: endDate,
      };
      const blob = await exportData(dateRange).unwrap();

      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "orders.xlsx");
        link.click();

        window.URL.revokeObjectURL(url);
        showSuccessFeedback("Dowloading Excel File");
      }
    } catch (error) {
      console.log(typeof error, error);

      if (typeof error?.data !== "object") {
        const data = JSON.parse(error?.data);
        showErrorFeedback(data?.message || data?.data?.message);
      } else {
        showErrorFeedback(error?.message || error?.data?.message);
      }
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
              setStartDate(
                new Date(event.target.value).toISOString().split("T")[0],
              );
            }}
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(event) => {
              setEndDate(
                new Date(event.target.value).toISOString().split("T")[0],
              );
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
