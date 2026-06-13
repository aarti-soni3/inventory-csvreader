import "./App.css";
import { Filter } from "./components/Filter data/Filter";
// import { Product } from "./components/Product/Product";
import { UploadFile } from "./components/Upload File/UploadFile";

function App() {
  return (
    <div className="container">
      <UploadFile />
      {/* <Product /> */}
      <Filter />
    </div>
  );
}

export default App;
