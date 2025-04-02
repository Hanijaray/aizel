import { FaUserCircle } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { BsCheckCircleFill, BsXCircleFill, BsPenFill } from 'react-icons/bs';
import { IoMdFitness, IoMdHome } from 'react-icons/io';
import { RiShieldUserFill } from 'react-icons/ri';
import manimg from "../../assets/Man.jpg";
import Header from '../Header';

export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <Header />
            </div>
     {/* Scrollable Content */}
     <div className="flex-grow overflow-y-auto mt-[56px] sm:mt-16 bg-white px-4 sm:px-16 pb-20 sm:pb-0">
            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-col items-center justify-between p-2 pb-0 sm:p-4 min-w-screen    rounded">
                <div className="flex flex-row items-center justify-between w-full mt-2 sm:mt-0">
                    {/* Left: Profile Image & Name */}
                    <div className="flex items-center justify-start space-x-3 sm:space-x-4">
                        <img src={manimg} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border" alt="Profile" />
                        <div>
                            <h2 className="text-sm sm:text-lg font-bricolagegrotesque">Welcome Back!</h2>
                            <p className="text-xs sm:text-base text-gray-600">Jonathan Patterson</p>
                        </div>
                    </div>

                    {/* Right: View Profile Button */}
                    <button className="bg-[#800080] text-white justify-end px-3 sm:px-5 py-1.5 sm:py-3 rounded-full flex items-center text-xs sm:text-sm font-semibold">
                        VIEW PROFILE <FaUserCircle className="ml-2 text-lg sm:text-xl" />
                    </button>
                </div>
                {/* Second Line: Location & Login Time */}
                <div className="flex flex-row items-center justify-between gap-2 sm:gap-96 p-1 min-w-screen mt-0 sm:mt-0">
                    {/* Left: Location */}
                    <div className="flex items-center space-x-2 text-gray-700">
                        <MdLocationOn className="text-[#800080] text-lg sm:text-2xl" />
                        <p className="text-xs sm:text-lg">123 Anywhere Street, Any City, live Location</p>
                    </div>
                    <p className="text-xs sm:text-lg text-gray-700">Login: 9:30 pm</p>
                </div>
            </div>

            {/* Daily Task Section */}
            <div className="flex items-center justify-between mt-4">
                <h3 className="text-xl font-bold">DAILY TASK</h3>
                <div className="flex-1 border-t-2 border-purple-700 ml-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6 mt-2 sm:mt-4">
                {/* New Task & On Progress */}
                <div className="bg-white p-2 sm:p-4 rounded-lg sm:border border-gray-300 sm:shadow-lg">
                    <h3 className="text-xl sm:text-2xl font-bold text-center font-caladaa">New Task</h3>
                    <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-4 font-inter">
                        {["New Task", "On Due Date"].map((status, index) => (
                            <div key={index} className="bg-primary text-white p-3 sm:p-5 rounded-xl relative sm:shadow-md">
                                <p className="text-base sm:text-lg font-semibold">Enter Subject</p>
                                <p className="text-xs sm:text-sm">Days remaining: 3</p>
                                <span className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-secondary text-black px-2 sm:px-4 py-0.5 sm:py-1 font-serif rounded-full font-semibold text-xs sm:text-base">
                                    {status}
                                </span>
                                <p className="text-xs sm:text-sm absolute bottom-2 sm:bottom-4 right-2 sm:right-4">
                                    Date: 10:00 AM | Deadline: 6:00 PM
                                </p>
                            </div>
                        ))}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6 text-center font-caladaa">On Progress</h3>
                    <div className="mt-2 sm:mt-4 bg-primary text-white p-3 sm:p-5 rounded-xl relative sm:shadow-md">
                        <p className="text-base sm:text-lg font-semibold">Enter Subject</p>
                        <p className="text-xs sm:text-sm">Days remaining: 3</p>
                        <span className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-secondary text-black px-2 sm:px-4 py-0.5 sm:py-1 rounded-full font-semibold text-xs sm:text-base font-inter">On Progress</span>
                        <p className="text-xs sm:text-sm absolute bottom-2 sm:bottom-4 right-2 sm:right-4">Date: 10:00 AM | Deadline: 6:00 PM</p>
                    </div>
                </div>

                {/* Updated State */}
                <div className='flex flex-col space-y-2 sm:space-y-4'>
                    <div className="bg-white p-2 sm:p-4 rounded sm:border border-gray-300 sm:shadow">
                        <h3 className="text-xl sm:text-2xl font-bold text-center font-caladaa">Updated State</h3>
                        <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-4">
                            {[
                                { text: "COMPLETED", color: "text-green-700", icon: BsCheckCircleFill },
                                { text: "FAILED", color: "text-red-700", icon: BsXCircleFill }
                            ].map((item, index) => (
                                <div key={index} className="bg-primary text-white p-3 sm:p-5 rounded-xl relative sm:shadow-md">
                                    <p className="text-base sm:text-lg font-bricolage-grotesque">Enter Subject</p>
                                    <p className="text-xs sm:text-sm font-bricolage-grotesque">Days remaining: 3</p>
                                    <span className={`absolute top-2 sm:top-4 right-2 sm:right-4 bg-white ${item.color} px-2 sm:px-4 py-0.5 sm:py-1 rounded-full font-semibold flex items-center text-xs sm:text-base`}>
                                        <item.icon className="mr-1 sm:mr-2" /> {item.text}
                                    </span>
                                    <p className="text-xs sm:text-sm absolute bottom-2 sm:bottom-4 right-2 sm:right-4">
                                        Date: 10:00 AM | Deadline: 6:00 PM
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full bg-secondary text-black font-bold py-2 sm:py-4 text-lg sm:text-xl mt-2 sm:mt-4 rounded-3xl font-lobster">
                            VIEW TASK HISTORY
                        </button>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="mt-2 sm:mt-4 bg-primary fixed sm:static bottom-0 left-0 right-0 text-white flex justify-center space-x-2 sm:space-x-4 py-2 sm:py-4 px-2 sm:px-10">
                        <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-full">
                            <IoMdHome className="w-5 h-5 sm:w-8 sm:h-8" />
                        </div>
                        <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-full">
                            <IoMdFitness className="w-5 h-5 sm:w-8 sm:h-8" />
                        </div>
                        {/* Oval Button for Task */}
                        <div className="w-16 sm:w-24 h-10 sm:h-16 flex flex-row items-center justify-center space-x-1 sm:space-x-2 border-2 border-white rounded-full bg-white text-purple-700 px-2 sm:px-4">
                            <IoMdFitness className="w-5 h-5 sm:w-8 sm:h-8" />
                            <span className="text-sm sm:text-xs font-bold">Task</span>
                        </div>
                        <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-full">
                            <BsPenFill className="w-5 h-5 sm:w-8 sm:h-8" />
                        </div>
                        <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-full">
                            <RiShieldUserFill className="w-5 h-5 sm:w-8 sm:h-8" />
                        </div>
                        <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-full">
                            <FaUserCircle className="w-5 h-5 sm:w-8 sm:h-8" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}