import React, { useState, useRef } from 'react';
import { FaFileUpload, FaImage } from 'react-icons/fa'; // Importing icons

const FaviconUploader = ({ title }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null); // Reference to the hidden file input

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-md ">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaImage className="h-6 w-6 text-gray-600 mr-2" />
          <h2 className="text-[14px] font-[400] text-gray-700">{title}</h2>
        </div>
        <span className="text-blue-500 text-sm">Ratio 1:1</span>
      </div>
      <div className="flex items-center justify-center mb-4">
        {selectedImage ? (
          <img 
            src={selectedImage} 
            alt="Selected Favicon" 
            className="h-10"
          />
        ) : (
          <p className="text-gray-500">No image selected</p>
        )}
      </div>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <label className="flex-grow px-4 py-2 text-gray-700 bg-white cursor-pointer flex items-center">
          <FaFileUpload className="mr-2" />
          Choose File
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            ref={fileInputRef} // Attach the ref to the file input
            accept="image/*" 
          />
        </label>
        <div className="w-px bg-gray-300"></div> {/* Vertical line */}
        <button
          onClick={handleBrowseClick}
          className="px-4 py-2 text-gray-700 bg-gray-100 border-l border-gray-300 flex items-center"
        >
          <FaFileUpload className="mr-2" />
          Browse
        </button>
      </div>
    </div>
  );
};

export default FaviconUploader;
