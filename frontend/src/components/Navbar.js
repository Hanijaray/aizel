import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Location1 from "./Location/NewReport";
import Announcement from "./Announcement/Announcement";
import img1 from "../assets/logo7.png";
import Form from "./LC Request/Form";
import Dashboard from "./Dashboard";
export default function NavbarMain() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle Mobile Menu Toggle
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* Navbar with Sticky Position */}
      <nav className="bg-[#800080] text-white px-4 py-2 flex  items-center h-[50px] md:h-[80px] sticky top-0 z-50">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3 mr-6 w-[250px] ">
          <img src={img1} alt="Aziel Logo" className="h-8 md:h-10 w-[200px]" />
        </div>

        {/* Desktop Navigation for Larger Screens */}
        <div className="hidden md:flex space-x-5 lg:space-x-20  text-xl font-semibold md:ml-5">
          {[
            "LC Request",
            "Announcement",
            "Task",
            "Workers",
            "Location",
            "Dashboard",
          ].map((item) => (
            <button
              key={item}
              className={`px-3 py-2 text-sm lg:text-2xl font-semibold ${
                activeTab === item
                  ? "bg-yellow-400 text-black rounded-2xl"
                  : "hover:bg-yellow-500 rounded-xl  "
              }`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Hamburger Icon for Mobile View */}
        <div className="md:hidden ml-10 flex items-center justify-end w-full">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Show Below 750px */}
      {menuOpen && (
        <div className="bg-[#800080] text-white flex flex-col items-start px-4 py-3 space-y-3 md:hidden">
          {[
            "LC Request",
            "Announcement",
            "Task",
            "Workers",
            "Location",
            "Dashboard",
          ].map((item) => (
            <button
              key={item}
              className={`w-full text-left px-3 py-2 text-sm font-semibold ${
                activeTab === item
                  ? "bg-yellow-400 text-black rounded-2xl"
                  : "hover:bg-yellow-500"
              }`}
              onClick={() => {
                setActiveTab(item);
                setMenuOpen(false); // Close menu after selection
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Section */}
      <div className="flex-1 overflow-auto w-full m-0 p-0">
        {activeTab === "Announcement" ? (
          <Announcement />
        ) : activeTab === "Location" ? (
          <Location1 />
        ) : activeTab ==="LC Request" ?(
          <Form />
        ) :activeTab ==="Dashboard" ?
        <Dashboard /> :(
          <div className="h-full w-full flex items-center justify-center text-lg md:text-2xl font-bold text-gray-700 p-4">
            {activeTab !== "Announcement" && `${activeTab} Page`}
          </div>
        )}
      </div>
    </div>
  );
}
