import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import Select_Section from '../Home/section';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DynamicInput from './DynamicInput';

const Sections = ["Banner Section", "work with us", "Want to Join", "Featured Marketing"];

const sectionMappings = {
  "Banner Section": [
    { type: "input", label: "Heading", placeholder: "Enter Heading", key: "heading" },
    { type: "input", label: "Description", placeholder: "Enter Description", key: "description" },
  ],
  "work with us": [
    { type: "input", label: "Heading", placeholder: "Enter Heading", key: "heading" },
    { type: "input", label: "Description", placeholder: "Enter Description", key: "Description" },
    { type: "image-upload-multiple", label: "Upload Brands Image", key: "BrandsImage" },
  ],
  "Social Media Management": [],
  "Influencer Marketing": [],
  "Video Production": [
    { type: "input", label: "Heading", placeholder: "Enter Heading", key: "heading" },
    { type: "image-upload-multiple", label: "Upload Production Image", key: "ProductionImage" },
  ],
  "Featured Marketing": [],
};

const Work = () => {
  const [selectedSection, setSelectedSection] = useState(Sections[0]); // Default to first section
  const [sectionData, setSectionData] = useState({}); // State to hold data for all sections
  const [cards, setCards] = useState([{ title: '', description: '', buttonName: '', redirectUrl: '', images: [] }]);

  // Handle input change for dynamic fields in any section
  const handleInputChange = (section, key, value) => {
    setSectionData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value,
      },
    }));
  };

  const handleImageUpload = (section, key, files) => {
    const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    setSectionData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: imageUrls,
      },
    }));
  };

  const handleAddCard = () => {
    setCards([...cards, { title: '', description: '', buttonName: '', redirectUrl: '', images: [] }]);
  };

  const handleDeleteCard = (index) => {
    if (cards.length > 1) {
      const updatedCards = cards.filter((_, cardIndex) => cardIndex !== index);
      setCards(updatedCards);
    }
  };

  const handleCardInputChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const handleCardImageUpload = (index, files) => {
    const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    const updatedCards = [...cards];
    updatedCards[index].images = imageUrls;
    setCards(updatedCards);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('All Section Data:', sectionData); // This will log all section data
  };

  return (
    <>
      {/* Select section */}
      <Breadcrumb pageName="About" />
      <Select_Section Sections={Sections} onSectionSelect={(section) => setSelectedSection(section)} />

      {/* Render the form only for the selected section */}
      <form className="bg-white p-6 rounded-lg shadow-lg mt-6" onSubmit={handleSubmit}>
        {/* Dynamically render fields for the selected section */}
        {sectionMappings[selectedSection]?.map((field, index) => {
          if (field.type === 'input') {
            return (
              <div key={index} className='mb-5'>
                <label className="block text-gray-700 font-medium mb-2 text-[14px]">{field.label}</label>
                <input
                  type="text"
                  value={sectionData[selectedSection]?.[field.key] || ''}
                  onChange={(e) => handleInputChange(selectedSection, field.key, e.target.value)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field.placeholder}
                />
              </div>
            );
          }

          if (field.type === 'image-upload-multiple') {
            return (
              <div key={index} className='mb-5'>
                <label className="block text-gray-700 font-medium mb-2 text-[14px]">{field.label}</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(selectedSection, field.key, e.target.files)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-4 mt-4">
                  {sectionData[selectedSection]?.[field.key]?.map((image, index) => (
                    <img key={index} src={image} alt="Uploaded" className="w-32 h-32 object-cover rounded-md" />
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}

        {/* Special rendering for Social Media Management cards */}
        {selectedSection === "Want to Join" && (
          <>
            <div  className='mb-5'>
                <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading</label>
                <input
                  type="text"
                  // value={sectionData[selectedSection]?.[field.key] || ''}
                  // onChange={(e) => handleInputChange(selectedSection, field.key, e.target.value)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={"enter heaingd"}
                />
              </div>
            <div  className='mb-5'>
                <label className="block text-gray-700 font-medium mb-2 text-[14px]">Description</label>
                <input
                  type="text"
                  // value={sectionData[selectedSection]?.[field.key] || ''}
                  // onChange={(e) => handleInputChange(selectedSection, field.key, e.target.value)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={"enter Description"}
                />
              </div>
            {cards.map((card, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg relative">
                {cards.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => handleDeleteCard(index)}
                  >
                    <AiOutlineClose size={20} />
                  </button>
                )}
            <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Heading</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardInputChange(index, 'title', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Title"
                  />
            </div>
            
                <label className="block text-gray-700 font-medium mb-2">Card Image</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleCardImageUpload(index, e.target.files)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-4 mt-4">
                  {card.images.map((img, imgIndex) => (
                    <img key={imgIndex} src={img} alt={`Card Image ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
                  ))}
                </div>
                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Card Description</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardInputChange(index, 'title', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Card Description"
                  />
            </div>
                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Card SubHeading</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardInputChange(index, 'title', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Title"
                  />
                </div>
                <div className='mt-4 ml-3'>
                <DynamicInput/>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
              onClick={handleAddCard}
            >
              <AiOutlinePlus size={20} className="mr-2" />
              Add Card
            </button>
          </>
        )}

        {selectedSection === "Featured Marketing" && (
          <>
            <div  className='mb-5'>
                <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading</label>
                <input
                  type="text"
                  // value={sectionData[selectedSection]?.[field.key] || ''}
                  // onChange={(e) => handleInputChange(selectedSection, field.key, e.target.value)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={"enter heaingd"}
                />
              </div>
            {cards.map((card, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg relative">
                {cards.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => handleDeleteCard(index)}
                  >
                    <AiOutlineClose size={20} />
                  </button>
                )}

                <label className="block text-gray-700 font-medium mb-2">Card Image</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleCardImageUpload(index, e.target.files)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-4 mt-4">
                  {card.images.map((img, imgIndex) => (
                    <img key={imgIndex} src={img} alt={`Card Image ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
                  ))}
                </div>

                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={card.name}
                    onChange={(e) => handleCardInputChange(index, 'title', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </div>
                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Position</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardInputChange(index, 'title', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter position"
                  />
                </div>
                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Card Title</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardInputChange(index, 'title', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Title"
                  />
                </div>
                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Card Description</label>
                  <input
                    type="text"
                    value={card.description}
                    onChange={(e) => handleCardInputChange(index, 'description', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Description"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
              onClick={handleAddCard}
            >
              <AiOutlinePlus size={20} className="mr-2" />
              Add Card
            </button>
          </>
        )}
        {selectedSection === "Influencer Marketing" && (
          <>
            <div  className='mb-5'>
                <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading</label>
                <input
                  type="text"
                  // value={sectionData[selectedSection]?.[field.key] || ''}
                  // onChange={(e) => handleInputChange(selectedSection, field.key, e.target.value)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={"enter heaingd"}
                />
              </div>
            {cards.map((card, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg relative">
                {cards.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => handleDeleteCard(index)}
                  >
                    <AiOutlineClose size={20} />
                  </button>
                )}

                <label className="block text-gray-700 font-medium mb-2">Card Image</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleCardImageUpload(index, e.target.files)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-4 mt-4">
                  {card.images.map((img, imgIndex) => (
                    <img key={imgIndex} src={img} alt={`Card Image ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
                  ))}
                </div>

                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Card Title</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardInputChange(index, 'title', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Title"
                  />
                </div>
               
              </div>
            ))}
            <button
              type="button"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
              onClick={handleAddCard}
            >
              <AiOutlinePlus size={20} className="mr-2" />
              Add Card
            </button>
          </>
        )}
        

        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600">
          Submit
        </button>
      </form>
    </>
  );
};

export default Work;
