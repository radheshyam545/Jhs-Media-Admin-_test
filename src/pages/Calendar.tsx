import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Calendar = () => {
  const Sections = ["Banner Section", "Influencer Services", "Influencer Marketing", "Our Milestones", "Featured Projects", "Brands", "Featured Marketing"];
  const [selectedSection, setSelectedSection] = useState(null);

  const handleSelect = (section) => {
    setSelectedSection(section);
  };

  return (
    <>
      <Breadcrumb pageName="Home Section" />
      <div className="overflow-x-auto whitespace-nowrap py-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="inline-flex space-x-4" style={{ WebkitOverflowScrolling: 'touch' }}>
          {
            Sections.map((section, index) => (
              <h1 
                key={index} 
                className={`px-4 py-2 cursor-pointer rounded-md ${selectedSection === section ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => handleSelect(section)}
              >
                {section}
              </h1>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Calendar;
