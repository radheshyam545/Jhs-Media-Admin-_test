import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa"; // Import icons

const DynamicInput = () => {
  const [inputs, setInputs] = useState([{ id: 1, width: 200 }]); // Initial input with width

  const addInput = () => {
    const newId = inputs.length > 0 ? inputs[inputs.length - 1].id + 1 : 1; // Generate new ID
    setInputs([...inputs, { id: newId, width: 200 }]); // Add new input
  };

  const removeInput = (id) => {
    const newInputs = inputs.filter((input) => input.id !== id); // Remove input by id
    setInputs(newInputs);
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <div className="flex items-center mb-4" key={input.id}>
          <span className="mr-2">{index + 1}</span> {/* Display index + 1 for consistent numbering */}
          <input
            type="text"
            style={{ width: `200px` }}
            className="border rounded-md p-2"
            placeholder="Input"
          />
          {index === inputs.length - 1 ? (
            // Plus icon for the last input
            <FaPlus
              className="ml-2 text-green-500 cursor-pointer"
              onClick={addInput}
            />
          ) : (
            // Cross icon for all inputs except the last one
            <FaTimes
              className="ml-2 text-red-500 cursor-pointer"
              onClick={() => removeInput(input.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicInput;
