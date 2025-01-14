import './assets/main.css';
import React, { useState } from 'react'; // Correct import here
import ReactDOM from 'react-dom/client';
import App from './App';
import Upload from './Upload';
import './assets/App.css';

const Main = (): JSX.Element => {
  const [showApp, setShowApp] = useState(false); // Track which component to display
  const [gpxFile, setGpxFile] = useState<File | null>(null); // Store the selected file

  // Callback function to handle file selection
  const handleFileSelect = (file: File) => {
    setGpxFile(file);
    setShowApp(true); // Switch to App component once a file is selected
  };

  return (
    <div>
      {/* Conditionally render the components based on showApp state */}
      {showApp ? (
        <App gpxFile={gpxFile} />
      ) : (
        <Upload onFileSelect={handleFileSelect} />
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
