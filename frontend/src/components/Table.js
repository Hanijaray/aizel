import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";

const Table = () => {
  const tableData = [
    { id: "Worker ID", name: "Worker Name", date: "Dec 20 2024", loginTime: "Login:08:00 am", logoutTime: "Logout:06:00 pm", totalHrs: "9 Hrs", permission: "", time: "", reason: "", state: "Present" },
    { id: "Worker ID", name: "Worker Name", date: "Dec 20 2024", loginTime: "Login:08:00 am", logoutTime: "Logout:06:00 pm", totalHrs: "8 Hrs", permission: "1 Hour", time: "2:00pm-3:00pm", reason: "sick", state: "Permission" },
    { id: "Worker ID", name: "Worker Name", date: "Dec 20 2024", loginTime: "Login:08:00 am", logoutTime: "Logout:06:00 pm", totalHrs: "9 Hrs", permission: "", time: "", reason: "", state: "Present" },
    { id: "Worker ID", name: "Worker Name", date: "Dec 20 2024", loginTime: "Login:08:00 am", logoutTime: "Logout:06:00 pm", totalHrs: "9 Hrs", permission: "", time: "", reason: "", state: "Present" },
    { id: "Worker ID", name: "Worker Name", date: "Dec 20 2024", loginTime: "Login:08:00 am", logoutTime: "Logout:06:00 pm", totalHrs: "9 Hrs", permission: "", time: "", reason: "", state: "Present" },
    { id: "Worker ID", name: "Worker Name", date: "Dec 20 2024", loginTime: "Login:08:00 am", logoutTime: "Logout:06:00 pm", totalHrs: "4 Hrs", permission: "Half Day", time: "2:00pm-2:00pm", reason: "Hospital", state: "Permission" },
    { id: "Worker ID", name: "Worker Name", date: "Dec 20 2024", loginTime: "", logoutTime: "", totalHrs: "8", permission: "", time: "", reason: "sick", state: "Absent" },
    { id: "Worker ID", name: "Worker Name", date: "Dec 20 2024", loginTime: "Login:08:00 am", logoutTime: "Logout:06:00 pm", totalHrs: "9 Hrs", time: "", permission: "", reason: "", state: "Present" },
    { id: "Worker ID", name: "Worker Name", date: "Dec 20 2024", loginTime: "Login:08:00 am", logoutTime: "Logout:06:00 pm", totalHrs: "7 Hrs", permission: "2 Hour", time: "2:00pm-3:00pm", reason: "sick", state: "Permission" },
  ];

  return React.createElement(
    "div",
    { className: "container mx-auto mt-2 rounded-lg" },
    React.createElement(
      "div",
      { className: "overflow-x-auto rounded-lg" },
      React.createElement(
        "table",
        { className: "w-full border-collapse rounded-lg" },
        React.createElement(
          "thead",
          { className: "text-white font-bricolage rounded-lg text-sm", style: { backgroundColor: "#950f95" } },
          React.createElement(
            "tr",
            null,
            React.createElement("th", { className: "border-b border-gray-300 p-2" }, "Name & ID"),
            React.createElement("th", { className: "border-b border-gray-300 p-2" }, "Date"),
            React.createElement("th", { className: "border-b border-gray-300 p-2" }, "Login Time"),
            React.createElement("th", { className: "border-b border-gray-300 p-2" }, "Total hrs"),
            React.createElement("th", { className: "border-b border-gray-300 p-2" }, "Permission"),
            React.createElement("th", { className: "border-b border-gray-300 p-2" }, "Reason"),
            React.createElement("th", { className: "border-b border-gray-300 p-2" }, "State"),
            React.createElement("th", { className: "border-b border-gray-300 p-2" }, "View")
          )
        ),
        React.createElement(
          "tbody",
          { className: "font-bricolage text-sm" },
          tableData.map((row, index) =>
            React.createElement(
              "tr",
              { key: index, className: "text-center bg-white hover:bg-gray-100" },
              React.createElement(
                "td",
                { className: "border-b border-gray-300 p-1" },
                row.name,
                React.createElement("br", null),
                React.createElement("span", { className: "text-gray-400" }, row.id)
              ),
              React.createElement("td", { className: "border-b border-gray-300 p-1" }, row.date),
              React.createElement(
                "td",
                { className: "border-b border-gray-300 p-1" },
                row.loginTime,
                React.createElement("br", null),
                React.createElement("span", { className: "text-gray-400" }, row.logoutTime)
              ),
              React.createElement("td", { className: "border-b border-gray-300 p-1" }, row.totalHrs),
              React.createElement(
                "td",
                { className: "border-b border-gray-300 p-1" },
                React.createElement("span", null, row.permission),
                React.createElement("br", null),
                React.createElement("span", { className: "text-gray-400" }, row.time)
              ),
              React.createElement("td", { className: "border-b border-gray-300 p-1" }, row.reason),
              React.createElement(
                "td",
                { className: "border-b border-gray-300 p-1" },
                React.createElement(
                  "button",
                  {
                    className: `px-4 py-2 font-semibold text-sm rounded-lg w-25 ${
                      row.state === "Permission"
                        ? "bg-[#fbbf58] text-dark-400 hover:bg-yellow-700"
                        : row.state === "Absent"
                        ? "bg-red-500 text-white hover:bg-red-700"
                        : "text-white hover:bg-green-700"
                    }`,
                    style: row.state === "Present" ? { backgroundColor: "#950f95" } : {},
                  },
                  row.state
                )
              ),
              React.createElement(
                "td",
                { className: "border-b border-gray-300 p-1" },
                React.createElement(
                  "button",
                  { className: "bg-yellow-400 p-2 pl-3 rounded-sm w-10 items-center hover:bg-black" },
                  React.createElement(BiSolidRightArrow, { className: "text-white text-xl" })
                )
              )
            )
          )
        )
      )
    )
  );
};

export default Table;