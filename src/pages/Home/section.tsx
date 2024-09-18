import { useState } from 'react';
import { Chip, Box } from '@mui/material';


const Select_Section = ({Sections, onSectionSelect }) => {
  if(!Sections) return  
  // Set initial selected section to "Banner Section"
  const [selectedSection, setSelectedSection] = useState("Banner Section");

  const handleSelect = (section) => {
    setSelectedSection(section);
    onSectionSelect(section); // Pass the selected section to the parent
  };

  return (
    <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', py: 2, '&::-webkit-scrollbar': { display: 'none' } }}>
      <Box sx={{ display: 'inline-flex', gap: 2 }}>
        {Sections.map((section, index) => (
          <Chip
            key={index}
            label={section}
            onClick={() => handleSelect(section)}
            clickable
            sx={{
              px: 2,
              py: 1,
              borderRadius: '0px',
              backgroundColor: selectedSection === section ? '#E54F26' : 'grey.300',
              color: selectedSection === section ? 'white' : 'black',
              '&:hover': {
                backgroundColor: selectedSection === section ? '#E54F26' : 'grey.400',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Select_Section;
