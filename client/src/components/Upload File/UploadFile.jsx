import { useState } from "react";
import "./uploadFile.css";
import { MdUploadFile, MdDone } from "react-icons/md";
import { useUpdateDataFromFileMutation } from "../../store/productApi";

export const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [updateDataFromFile, { data, isLoading, error }] = useUpdateDataFromFileMutation();

  const handleOnFileChange = async(event) => {
    const file = event.target.files[0];
    if (file) setFile(file);

    await updateDataFromFile(file);
  };

  return (
    <div className="upload-container">
      <input
        id="file"
        name="file"
        type="file"
        onChange={handleOnFileChange}
        className="hidden"
      />
      <label htmlFor="file" className="custom-upload">
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
    </div>
  );
};
