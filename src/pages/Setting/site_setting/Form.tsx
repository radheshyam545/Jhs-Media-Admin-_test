const Form = ({ companyInfoFields, categoryName }) => { // Receive the categoryName as a prop
    return (
      <>
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center shadow-lg pb-2">
            <span className="material-icons mr-2">business</span>
            {categoryName} {/* Display the dynamic category name */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyInfoFields.map((field, index) => (
              <div key={index} className="col-span-1">
                <label className="block text-gray-700 font-medium mb-2 text-[14px]">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="w-full px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  export default Form;
  