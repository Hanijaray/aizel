import { FaCommentDots, FaBell } from "react-icons/fa";
import logo from "../assets/logo9.png";
const Header = () => {

  return (
    <div className="bg-[#800080] h-auto sm:p-4 p-2 flex justify-between items-center ">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
      <img src={logo} alt="Logo" className="h-10 mr-2" />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <div className="bg-white p-2 rounded-lg shadow-lg">
          <FaCommentDots className="text-[#800080] text-xl" />
        </div>
        <div className="bg-white p-2 rounded-lg shadow-lg relative">
          <FaBell className="text-[#800080] text-xl" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">1</span>
        </div>
      </div>
    </div>
  );
};

export default Header;