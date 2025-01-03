import React, { useState, useEffect } from "react";
import "./CommunicationMethodManagement.css";
import { toast } from "react-toastify";

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [currentMethod, setCurrentMethod] = useState(null); // For add/edit modal
  const [showModal, setShowModal] = useState(false); // For add/edit modal
  const [deleteId, setDeleteId] = useState(null); // For delete confirmation modal

  const API_BASE_URL =
    "https://calendar-application-for-communication.onrender.com/api/v1/communication/methods";

  const fetchMethods = async () => {
    try {
      const adminEmail = localStorage.getItem("AdminEmail");
      if (!adminEmail) {
        toast.error("Admin email not found in localStorage");
        return;
      }
      const response = await fetch(
        `${API_BASE_URL}?email=${encodeURIComponent(adminEmail)}`
      );
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          setMethods(responseData.data);
        } else {
          toast.error(
            responseData.message || "Failed to load communication methods."
          );
        }
      } else {
        toast.error("Failed to load communication methods.");
      }
    } catch (error) {
      toast.error("Failed to connect to the server.");
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Map method names to their sequences
    const methodSequenceMap = {
      "LinkedIn Post": 1,
      "LinkedIn Message": 2,
      Email: 3,
      "Phone Call": 4,
      Other: 5,
    };

    setCurrentMethod((prev) => {
      const updatedMethod = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Update the sequence based on the selected method name
      if (name === "name" && methodSequenceMap[value] !== undefined) {
        updatedMethod.sequence = methodSequenceMap[value];
      }

      return updatedMethod;
    });
  };

  const openModal = (method = null) => {
    setCurrentMethod(
      method || {
        name: "",
        description: "",
        sequence: methods.length + 1,
        mandatory: false,
        adminEmail: localStorage.getItem("AdminEmail"),
      }
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentMethod(null);
  };

  const addOrUpdateMethod = async () => {
    try {
      const url = API_BASE_URL;
      const methodType = "POST";

      const response = await fetch(url, {
        method: methodType,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentMethod,
          sequence: parseInt(currentMethod.sequence), // Ensure sequence is an integer
        }),
      });

      if (response.ok) {
        toast.success("Method added successfully.");
        fetchMethods();
        closeModal();
      } else {
        toast.error("Failed to save communication method.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to connect to the server.");
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(false); // Close add/edit modal if open
  };

  const deleteMethod = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${deleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMethods(methods.filter((method) => method.id !== deleteId));
        toast.success("Communication method deleted successfully.");
      } else {
        toast.error("Failed to delete communication method.");
      }
    } catch (error) {
      toast.error("Failed to connect to the server.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div>
      <h2>Communication Method Management</h2>

      <div className="method-list">
        <h3>Existing Communication Methods</h3>
        {methods.length > 0 ? (
          <div className="method-grid">
            {methods.map((method) => (
              <div key={method.id} className="method-item">
                <span>
                  <strong>{method.name}</strong>
                </span>
                <p>{method.description}</p>
                <span>{method.mandatory ? "Mandatory" : "Optional"}</span>
                <button onClick={() => confirmDelete(method.id)}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No communication methods available.</p>
        )}
      </div>

      <button className="add-method-btn" onClick={() => openModal()}>
        + Add Method
      </button>

      {/* Add/Edit Modal */}
      {showModal && currentMethod && (
        <div className="modal">
          <div className="modal-content">
            <h3>{currentMethod.id ? "Edit Method" : "Add New Method"}</h3>
            <select
              type="text"
              name="name"
              placeholder="Method Name"
              value={currentMethod.name}
              onChange={handleInputChange}
            >
              <option value="Select">Select</option>
              <option value="LinkedIn Post">LinkedIn Post</option>
              <option value="LinkedIn Message">LinkedIn Message</option>
              <option value="Email">Email</option>
              <option value="Phone Call">Phone Call</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              name="description"
              placeholder="Description"
              value={currentMethod.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="sequence"
              placeholder="Sequence"
              value={currentMethod.sequence}
              onChange={handleInputChange}
            />
            <label>
              <input
                type="checkbox"
                name="mandatory"
                checked={currentMethod.mandatory}
                onChange={handleInputChange}
              />
              Mandatory
            </label>
            <div className="modal-actions">
              <button onClick={addOrUpdateMethod}>Save</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this communication method?</p>
            <div className="modal-actions">
              <button onClick={deleteMethod}>Yes</button>
              <button onClick={() => setDeleteId(null)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationMethodManagement;
