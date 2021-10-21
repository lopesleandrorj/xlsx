import "./styles.css";
import { Renderer } from "xlsx-renderer";
import { saveAs } from "file-saver";
import viewModel from "./Data";

export default function App() {
  const renderer = new Renderer();

  const handleClick = () => {
    // 1. Download a template.
    fetch("./template.xlsx")
      // 2. Get template as ArrayBuffer.
      .then((response) => response.arrayBuffer())
      // 3. Fill the template with data (generate a report).
      .then((buffer) => renderer.renderFromArrayBuffer(buffer, viewModel))
      // 4. Get a report as buffer.
      .then((report) => report.xlsx.writeBuffer())
      // 5. Use `saveAs` to download on browser site.
      .then((buffer) => saveAs(new Blob([buffer]), `${Date.now()}_report.xlsx`))
      // Handle errors.
      .catch((err) => console.log("Error writing excel export", err));
  };

  return (
    <div className="App">
      <h1>XLSX Renderer</h1>
      <h2>Get XLSX Generated based on template provided</h2>
      <button onClick={handleClick}>Export</button>
    </div>
  );
}
