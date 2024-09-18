import { useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import FaviconUploader from './FaviconUploader';
import Form from './Form';

const SiteSetting = () => {
  const categories = ['General Information', 'Third Party', 'Maintenance Mode', 'Analytical Script'];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const fieldsMapping = {
    'General Information': [
      { label: 'Company Name', type: 'text', placeholder: 'Loccus Furniture' },
      { label: 'Phone', type: 'text', placeholder: '9875804733' },
      { label: 'Email', type: 'email', placeholder: 'dkenterprises1018@gmail.com' },
      { label: 'Company Address', type: 'text', placeholder: 'Plot No. 33, Gautam Vihar, Second, Mansar' },
      { label: 'Latitude', type: 'text', placeholder: 'Latitude' },
      { label: 'Longitude', type: 'text', placeholder: 'Longitude' },
      { 
        label: 'Country', 
        type: 'select', 
        options: [
          { value: 'India', label: 'India' }
          // Add more options as needed
        ] 
      },
      { label: 'Company Copyright text', type: 'text', placeholder: 'copyright text' },
    ],
    'Third Party': [
      { label: 'Whatsapp', type: 'text', placeholder: 'Enter Whatsapp url' },
      { label: 'Call to Action', type: 'text', placeholder: 'Enter' },
      { label: 'Email', type: 'email', placeholder: 'Enter Email' },
      { label: 'Facebook', type: 'text', placeholder: 'Enter Facebook url' },
      { label: 'Instagram', type: 'text', placeholder: 'Enter Instgram url' },
      { label: 'Twitter', type: 'text', placeholder: 'Enter Twitter url' },
      { label: 'Linkdein', type: 'text', placeholder: 'Enter Linkedin url' },
      { label: 'Pinterest', type: 'text', placeholder: 'Enter Pinterest' },
      
    ],
    'Maintenance Mode': [
      { label: 'Enable Maintenance Mode', type: 'checkbox' },
      { label: 'Maintenance Message', type: 'text', placeholder: 'We are currently under maintenance.' },
    ],
    'Analytical Script': [
      { label: 'Google Analytics ID', type: 'text', placeholder: 'UA-XXXXX-Y' },
      { label: 'Facebook Pixel ID', type: 'text', placeholder: 'Enter Facebook Pixel ID' },
    ],
  };

  const categoryNames = {
    'General Information': 'Company Information',
    'Third Party': 'Third Party Integration',
    'Maintenance Mode': 'Maintenance Settings',
    'Analytical Script': 'Analytical Script Configuration',
  };

  return (
    <>
      <Breadcrumb pageName="Site Setting" />
      <div className="flex space-x-4 mt-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleSelectCategory(category)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category
                ? 'bg-[#E54F26] text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Pass the fields and category name corresponding to the selected category */}
      <Form 
        companyInfoFields={fieldsMapping[selectedCategory]} 
        categoryName={categoryNames[selectedCategory]} 
      />
      
      <br/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Three columns layout */}
        <FaviconUploader title="Website Header Logo" />
        <FaviconUploader title="Website Footer Logo" />
        <FaviconUploader title="Website Favicon" />
      </div>
    </>
  );
};

export default SiteSetting;
