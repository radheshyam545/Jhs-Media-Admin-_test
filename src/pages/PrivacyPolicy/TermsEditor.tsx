// TermsEditor.js
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import CKEditorComponent from '../../components/CKEditorComponent/CKEditorComponent';

const TermsEditor = () => {
  const [content, setContent] = useState('');

    
  const handleSubmit = () => {
    // Here you can handle the form submission logic
    console.log('Submitted content:', content);
  };

  return (
    <div className="bg-white w-full min-h-screen p-8">
      <div className="max-w-6xl mx-auto py-6">
        <Typography variant="h6" className="mb-40">
          Update Privacy Content
        </Typography>

        {/* Title Section */}
        <Typography variant="subtitle1" className="mb-2">
          Title
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          className="mb-8"
          defaultValue="Privacy Policy"
        />

        {/* Content Label */}
        <Typography variant="subtitle1" className="mb-4">
          Content
        </Typography>

        {/* CKEditor Component */}
        <CKEditorComponent content={content} onChange={setContent} />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          className="w-full mt-8"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default TermsEditor;
