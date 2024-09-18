import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import Select_Section from '../Home/section';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableComponent from './table';

const Sections = ["Banner Section", "Contact Details"];

const sectionMappings = {
  "Banner Section": [
    { type: "input", label: "Heading", placeholder: "Enter Heading", key: "heading" },
    { type: "input", label: "Description", placeholder: "Enter Description", key: "description" },
  ],
};

const ContactUS = () => {
  const [selectedSection, setSelectedSection] = useState(Sections[0]);
  const [sectionData, setSectionData] = useState({});

  // Function to handle input field changes
  const handleInputChange = (section, key, value) => {
    setSectionData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value,
      },
    }));
  };

  // Function to handle image uploads and append new images to the existing ones
  const handleImageUpload = (section, key, files) => {
    const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setSectionData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: [...(prevState[section]?.[key] || []), ...imageUrls], // Append new images
      },
    }));
  };

  const handleDeleteImage = (section, key, index) => {
    setSectionData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: prevState[section][key].filter((_, i) => i !== index),
      },
    }));
  };



  return (
    <>
      <Breadcrumb pageName="About" />
      <Select_Section Sections={Sections} onSectionSelect={setSelectedSection} />

      <form className="bg-white p-6 rounded-lg shadow-lg mt-6" onSubmit={(e) => e.preventDefault()}>
        {sectionMappings[selectedSection]?.map((field, index) => (
          <div key={index} className='mb-5'>
            <label className="block text-gray-700 font-medium mb-2 text-[14px]">{field.label}</label>
            {field.type === 'input' ? (
              <input
                type="text"
                value={sectionData[selectedSection]?.[field.key] || ''}
                onChange={(e) => handleInputChange(selectedSection, field.key, e.target.value)}
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={field.placeholder}
              />
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(selectedSection, field.key, e.target.files)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-4 mt-4">
                  {sectionData[selectedSection]?.[field.key]?.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative">
                      <img src={image} alt="Uploaded" className="w-32 h-32 object-cover rounded-md" />
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-red-500"
                        onClick={() => handleDeleteImage(selectedSection, field.key, imgIndex)}
                      >
                        <AiOutlineClose size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}

        {selectedSection === "Contact Details" && (
          <>
            <TableComponent/>
          </>
        )}




       {selectedSection == "Banner Section" && <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600">
          Submit
        </button>}
      </form>
    </>
  );
};

export default ContactUS;
