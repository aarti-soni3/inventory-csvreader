import { useContext } from "react";
import "./filter.css";
import { LuDownload } from "react-icons/lu";
import { FeedbackContext } from "../../context/createContext";
import { useExportDataMutation } from "../../store/productApi";

export const Filter = () => {
  const { showSuccessFeedback, showErrorFeedback } =
    useContext(FeedbackContext);

  const [exportData, { isLoading }] = useExportDataMutation();

  const handleOnClick = async () => {
    try {
      const filterData = { date: new Date() };
      const blob = await exportData(filterData).unwrap();

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
      <button className="button" onClick={handleOnClick} disabled={isLoading}>
        <LuDownload size="1.3rem" color="white" />
        Download
      </button>
    </div>
  );
};
