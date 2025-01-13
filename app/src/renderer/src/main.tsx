import './assets/main.css';
import React, { useState } from 'react'; // Correct import here
import ReactDOM from 'react-dom/client';
import App from './App';
import Upload from './Upload';

const Main = (): JSX.Element => {
  const [showApp, setShowApp] = useState(false); // Corrected to use `useState`

  const toggleComponent = () => {
    setShowApp((prevState) => !prevState);
  };

  return (
    <div>
      {/* Conditionally render the components */}
      {showApp ? <App /> : <Upload />}
      
      {/* Button to toggle between components */}
      <button onClick={toggleComponent}>
        {showApp ? 'Show Upload Component' : 'Show App Component'}
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
