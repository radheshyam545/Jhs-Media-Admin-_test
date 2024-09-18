import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import Select_Section from '../Home/section';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Sections = ["Banner Section", "As Featured"];

const sectionMappings = {
  "Banner Section": [
    { type: "input", label: "Heading", placeholder: "Enter Heading", key: "heading" },
    { type: "input", label: "Description", placeholder: "Enter Description", key: "description" },
  ],
  "Brands": [
    { type: "input", label: "Heading", placeholder: "Enter Heading", key: "heading" },
    { type: "input", label: "Description", placeholder: "Enter Description", key: "description" },
    { type: "image-upload-multiple", label: "Upload Brands Image", key: "brandsImage" },
  ],
  "Social Media Management": [],
  "Influencer Marketing": [],
  "Video Production": [
    { type: "input", label: "Heading", placeholder: "Enter Heading", key: "heading" },
    { type: "image-upload-multiple", label: "Upload Production Image", key: "productionImage" },
  ],
  "Featured Marketing": [],
};

const Work = () => {
  const [selectedSection, setSelectedSection] = useState(Sections[0]);
  const [sectionData, setSectionData] = useState({});
  const [cards, setCards] = useState([{ title: '', description: '', buttonName: '', redirectUrl: '', images: [] }]);

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

  const handleAddCard = () => setCards([...cards, { title: '', description: '', buttonName: '', redirectUrl: '', images: [] }]);

  const handleDeleteCard = (index) => setCards(cards.filter((_, i) => i !== index));

  const handleCardInputChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const handleCardImageUpload = (index, files) => {
    const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    const updatedCards = [...cards];
    updatedCards[index].images = [...updatedCards[index].images, ...imageUrls]; // Append new images
    setCards(updatedCards);
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

        {selectedSection === "Social Media Management" && (
          <>
            {cards.map((card, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg relative">
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-500"
                  onClick={() => handleDeleteCard(index)}
                >
                  <AiOutlineClose size={20} />
                </button>
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
                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2">Card Title</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardInputChange(index, 'title', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Title"
                  />
                </div>
                <div className="mt-4">
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

{selectedSection === "As Featured" && (
          <>
            <div  className='mb-5'>
                <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading</label>
                <input
                  type="text"
                  // value={sectionData[selectedSection]?.[field.key] || ''}
                  // onChange={(e) => handleInputChange(selectedSection, field.key, e.target.value)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={"enter heading"}
                />
              </div>
            <div  className='mb-5'>
                <label className="block text-gray-700 font-medium mb-2 text-[14px]">Description</label>
                <input
                  type="text"
                  // value={sectionData[selectedSection]?.[field.key] || ''}
                  // onChange={(e) => handleInputChange(selectedSection, field.key, e.target.value)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={"enter sub description"}
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
                    value={card.name}
                    onChange={(e) => handleCardInputChange(index, 'title', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter title"
                  />
                </div>
                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Card Description</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardInputChange(index, 'title', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter position"
                  />
                </div>
                <label className="block text-gray-700 font-medium mb-2 mt-4 text-[14px]">Card Button</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    // value={card.buttonName}
                    // onChange={(e) => handleCardInputChange(index, 'buttonName', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Button Name"
                  />
                  <input
                    type="text"
                    // value={card.redirectUrl}
                    // onChange={(e) => handleCardInputChange(index, 'redirectUrl', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Redirect URL"
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
