interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: (id: string | number) => void;
  onCancel: () => void;
  id: string | number |null; // Add an id prop
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title, message, onConfirm, onCancel, id }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-black rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(id)} // Pass the id when confirming
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
