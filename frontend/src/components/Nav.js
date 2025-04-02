import { Link } from "react-router-dom";
import { CgGym } from "react-icons/cg";
import { FaPenClip } from "react-icons/fa6";
import { TbMessages } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { PiUserCircleFill } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";

const Nav = () => {
  const navItems = [
     { icon: <IoMdHome />, label: "Home", path: "/category" },
    { icon: <CgGym />, label: "Daily Task", path: "/dailytask" },
    { icon: <FaPenClip />, label: "Report", path: "/report" },
    { icon: <TbMessages />, label: "Permission", path: "/hour" },
    { icon: <TiTick />, label: "Attendance", path: "/attendance" },
    { icon: <PiUserCircleFill />, label: "Profile", path: "/employeeprofile" },
  ];

  return (
    <nav className="flex flex-wrap sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6 lg:mt-2">
      {navItems.map((item, index) => (
        <Link to={item.path} key={index} className="flex flex-col items-center">
          <div
            className="w-14 h-14 lg:w-20 lg:h-20 sm:w-16 sm:h-16 flex items-center justify-center"
            style={{ backgroundColor: "#950f95", borderRadius: "50px" }}
          >
            <div className="text-3xl lg:text-5xl text-white">{item.icon}</div>
          </div>
          <span className="text-xs sm:text-sm text-gray-700 mt-1">
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
