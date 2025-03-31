import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [pendingRequests, setPendingRequests] = useState([]);

  // ✅ Function to Fetch Pending Requests
  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/accessRequests/pending");
      setPendingRequests(response.data);
    } catch (error) {
      console.error("Error fetching access requests:", error);
    }
  };

  // ✅ Fetch Pending Requests on Page Load
  useEffect(() => {
    fetchPendingRequests();
  }, []);

  // ✅ Approve Request & Refresh Data
  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/accessRequests/${id}/approve`);
      alert("✅ Access Request Approved and stored in Worker!");
      fetchPendingRequests(); // ⬅️ Refresh Data from Backend
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // ❌ Reject Request & Refresh Data
  const handleReject = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/accessRequests/${id}/reject`);
      alert("❌ Access Request Rejected!");
      fetchPendingRequests(); // ⬅️ Refresh Data from Backend
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div>
      <h2>Admin Approval Panel</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.length === 0 ? (
            <tr>
              <td colSpan="6">No pending requests</td>
            </tr>
          ) : (
            pendingRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.employeeName}</td>
                <td>{request.position}</td>
                <td>{request.phoneNumber}</td>
                <td>{request.address}</td>
                <td>{request.username}</td>
                <td>
                  <button style={{ backgroundColor: "green", color: "white", margin: "5px" }} onClick={() => handleApprove(request._id)}>
                    Approve
                  </button>
                  <button style={{ backgroundColor: "red", color: "white" }} onClick={() => handleReject(request._id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
