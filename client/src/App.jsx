import "./App.css";
import { Product } from "./components/Product/Product";
import { UploadFile } from "./components/Upload File/UploadFile";

function App() {
  return (
    <div className="container">
      <UploadFile />
      <Product />
    </div>
  );
}

export default App;
