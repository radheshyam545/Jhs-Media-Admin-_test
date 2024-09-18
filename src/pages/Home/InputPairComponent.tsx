import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
const InputPairComponent = ({ onInputPairChange, value, handleRemoveButtonPair ,deletedStatus,ExistInputPairData}) => {
  const [inputPairs, setInputPairs] = useState([{ id: 1, name: "", link: "", isVisible: true }]);

  useEffect(() => {
    if (value && value.length > 0) {
      const updatedPairs = value.map(pair => ({
        ...pair,
        isVisible: pair.isVisible !== undefined ? pair.isVisible : true  // Add 'isVisible' if not present
      }));
      setInputPairs(updatedPairs);
    }
    else{
      setInputPairs([{ id: 1, name: "", link: "", isVisible: true }]);
    }
  }, [value]);

  const handleAddInputPair = () => {
    if (inputPairs.length < 2) {
      const maxId = Math.max(...inputPairs.map(pair => pair.id), 0);

      const newPair = { id: maxId + 1, name: "", link: "", isVisible: false };
      setInputPairs([...inputPairs, newPair]);

      setTimeout(() => {
        setInputPairs((prevPairs) =>
          prevPairs.map((pair, i) =>
            i === prevPairs.length - 1 ? { ...pair, isVisible: true } : pair
          )
        );
      }, 10);
    }
  };

  const handleRemoveInputPair = (id) => {
    const checkButtonexist =Array.isArray(ExistInputPairData)? ExistInputPairData.some((pair) => pair.id === id):false;
    console.log("checkButtonexist",checkButtonexist,ExistInputPairData);
    
    if(!checkButtonexist){
      setInputPairs((prevPairs) =>
        prevPairs.map((pair) =>
          pair.id === id ? { ...pair, isVisible: false } : pair
        )
      );
  
      setTimeout(() => {
        const updatedPairs = inputPairs.filter((pair) => pair.id !== id);
        setInputPairs(updatedPairs);
        onInputPairChange(updatedPairs); // Call parent function
      }, 300);
    }
    else{
      handleRemoveButtonPair(id);  // Pass the id to parent component
    }
  };

  const handlePairInputChange = (e, id, field) => {
    const updatedPairs = inputPairs.map((pair) =>
      pair.id === id ? { ...pair, [field]: e.target.value } : pair
    );
    setInputPairs(updatedPairs);
    onInputPairChange(updatedPairs); // Call parent function
  };

  return (
    <div className="flex flex-col space-y-4">
      {inputPairs.map((pair, index) => (
        <div
          key={pair.id}
          className="flex space-x-2 items-center"
          style={{
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            opacity: pair.isVisible ? 1 : 0,
            transform: pair.isVisible ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          <input
            type="text"
            className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Button Name"
            value={pair.name}
            onChange={(e) => handlePairInputChange(e, pair.id, "name")} // Pass id
            required
          />
          <input
            type="text"
            className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Redirect URL"
            value={pair.link}
            onChange={(e) => handlePairInputChange(e, pair.id, "link")} // Pass id
            required
          />

          {inputPairs.length === 1 ? (
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded-full"
              onClick={handleAddInputPair}
            >
              <AiOutlinePlus size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="bg-red-500 text-white p-2 rounded-full"
              onClick={() => handleRemoveInputPair(pair.id)}  // Pass id to remove
            >
              <AiOutlineClose size={16} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default InputPairComponent;
