import React from "react";
import { MdPrint } from "react-icons/md";
import { FaShareNodes } from "react-icons/fa6";
import Attendancereport from "./Attendancereport";
import Header from "./Header";

const Workerdetail = () => {

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: "Work Report",
      text: "Check out this work report.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="mt-2 flex flex-wrap  gap-4">
      <Header />
      <div className="w-248">
        <Attendancereport />
      </div>
      <div className="bg-white p-3 rounded-lg shadow-md border-3 w-85 h-145" style={{ borderColor: "#950f95" }}>
        <div className="flex">
          <img src="./Images/image.png" alt="r" className="w-15 h-9 flex mr-2" />
          <div>
            <h2 className="text-2xl font-bold font-caladea text-gray-800 ms-5">Company Name</h2>
            <p className="text-sm ms-10 font-bricolage">Life Changers Ind</p>
          </div>
        </div>
        <hr className="mt-2 border-1" style={{ color: "#950f95" }} />
        <div className="mt-3 bt-1 text-black flex">
          <button
            onClick={handlePrint}
            className="font-bricolage px-11 py-2 rounded-md flex border-1 font-bold"
            style={{ backgroundColor: "#fcc059" }}
          >
            <MdPrint className="text-black text-2xl me-2" /> Print
          </button>
          <button
            onClick={handleShare}
            className="font-bricolage px-9 ms-2 py-2 rounded-md flex border-1 font-bold"
            style={{ backgroundColor: "#fcc059" }}
          >
            <FaShareNodes className="text-black mt-1 me-2 text-xl" /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workerdetail;