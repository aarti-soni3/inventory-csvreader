import { useContext, useState } from "react";
import "./uploadFile.css";
import { MdUploadFile, MdDone } from "react-icons/md";
import { useUpdateDataFromFileMutation } from "../../store/productApi";
import { FeedbackContext } from "../../context/createContext";

export const UploadFile = () => {
  const { showSuccessFeedback, showErrorFeedback } =
    useContext(FeedbackContext);

  const [file, setFile] = useState(null);
  const [updateDataFromFile, { isLoading, error }] =
    useUpdateDataFromFileMutation();

  const handleOnFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) setFile(file);

      const formData = new FormData();
      formData.append("file", file);
      const data = await updateDataFromFile(formData);

      if (data) {
        console.log(data);
        showSuccessFeedback(data?.message || data?.data?.message);
      }
    } catch (error) {
      showErrorFeedback(error.message || error?.data?.message);
    }
  };

  return (
    <div className="upload-container">
      <input
        id="file"
        name="file"
        type="file"
        onChange={handleOnFileChange}
        className="hidden"
        disabled={isLoading}
      />
      <label
        htmlFor="file"
        className={`custom-upload ${isLoading ? "disabled" : ""}`}
      >
        {file ? (
          <>
            <MdDone size="1.5em" />
            <p>Uploaded!</p>
          </>
        ) : (
          <>
            <MdUploadFile size="1.3em" />
            <p>Upload File</p>
          </>
        )}
      </label>
      <p>{error && error.message}</p>
    </div>
  );
};
