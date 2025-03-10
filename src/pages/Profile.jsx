import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function Profile({ user, setUser }) {
  const [newName, setNewName] = useState(user.name);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setUser((prevUser) => ({
      ...prevUser,
      name: newName,
    }));

    setShowToast(true); // Show success message
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div
        className="card p-4 text-center shadow-lg"
        style={{ width: "300px", borderRadius: "15px" }}
      >
        {/* Profile Image */}
        <img
          src="/profile.jpg" // Make sure to place your image in the "public" folder
          alt="Profile"
          className="rounded-circle mx-auto d-block mb-2"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
            border: "3px solid #ff69b4",
          }}
        />

        {/* Display Name */}
        <h4 className="mb-2">{user.name}</h4>

        {/* Name Input */}
        <input
          type="text"
          className="form-control form-control-sm"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        {/* Save Button */}
        <button className="btn btn-success btn-sm mt-2" onClick={handleSave}>
          Save Name
        </button>
      </div>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          bg="success"
          onClose={() => setShowToast(false)}
          delay={1200}
          autohide
        >
          <Toast.Body className="text-white">
            ✅ Name updated successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Profile;
