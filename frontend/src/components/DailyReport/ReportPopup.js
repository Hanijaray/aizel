import React from "react";

const ReportPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Popup Container */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Today’s Report <span className="text-gray-600">(20:38:43 Fri, Dec 20 2024)</span>
        </h2>

        {/* Report Details */}
        <div className="text-sm sm:text-base space-y-2">
          <p><strong>Regarding:</strong></p>
          <p><strong>Subject:</strong></p>
          <p><strong>Customer Type:</strong></p>
          <p><strong>State:</strong></p>
          <p><strong>Company Name:</strong></p>
          <p><strong>Communicator Name:</strong></p>
          <p><strong>Company Phone Number:</strong></p>
          <p><strong>Image:</strong></p>
          <p><strong>Pinned Location:</strong></p>
          <p><strong>Detail Report:</strong></p>
          <p className="text-gray-600">
            Review the project requirements carefully to understand the scope. Break down the tasks into smaller, manageable steps for better organization. Assign deadlines to each step to ensure timely completion. Finally, start working on the first task with focus and efficiency.
          </p>
        </div>

        {/* Cancel Button */}
        <button
          className="mt-4 w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all"
          onClick={onClose}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default ReportPopup;