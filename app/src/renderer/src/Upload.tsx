import React from 'react';

interface UploadProps {
  onFileSelect: (file: File) => void; // Callback to handle file selection
}

function Upload({ onFileSelect }: UploadProps): JSX.Element {
  let message = 'This is the upload component. Please select a file.';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileSelect(event.target.files[0]); // Call onFileSelect with the selected file
    }
  };

  return (
    <>
      <h1>{message}</h1>
      <div className="flex justify-center items-center h-screen">
        <input
          id="fileInput"
          type="file"
          className="file-input file-input-bordered w-full max-w-xs h-36 hover:bg-primary ease-in-out duration-200"
          onChange={handleFileChange}
        />
      </div>
    </>
  );
}

export default Upload;
