import logo from "./logo.svg";
import "./App.css";
import { useState } from "react/cjs/react.development";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [productImg, setProductImg] = useState("");

  const handleFileChange = (e) => {
    console.log(e.target);
    setFile(e.target.files[0]);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    axios
      .post("http://localhost:8000/", formData)
      .then((res) => {
        setProductImg(res.data.product.imgUrl);
      })
      .catch((err) => {});
    e.target.reset()
    setName('')
  };

  return (
    <div className="App">
      <form action="" onSubmit={handleUpload}>
        <input
          type="text"
          valu={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input type="file" onChange={handleFileChange} />
        <button>upload</button>
      </form>
      {productImg && <img src={productImg} alt="product" />}
    </div>
  );
}

export default App;
