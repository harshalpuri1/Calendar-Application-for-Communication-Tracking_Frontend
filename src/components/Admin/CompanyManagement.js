import React, { useState, useEffect } from "react";
import "./CompanyManagement.css"; // Ensure the path is correct
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "2 weeks",
    adminEmail: localStorage.getItem("AdminEmail"),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const baseUrl =
    "https://calendar-application-for-communication.onrender.com/api/v1/company";

  const fetchCompanies = async () => {
    try {
      const adminEmail = localStorage.getItem("AdminEmail"); // Get admin email from localStorage
      if (!adminEmail) {
        setError("Admin email not found in localStorage");
        return;
      }

      // Append the email as a query parameter to the URL
      const url = `${baseUrl}/get?email=${encodeURIComponent(adminEmail)}`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setCompanies(data); // Set the fetched companies
      } else {
        setError("Failed to fetch companies");
      }
    } catch (error) {
      setError("Failed to connect to the server");
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  // Add or update a company
  const addOrUpdateCompany = async () => {
    if (!newCompany.name || !newCompany.location || !newCompany.emails) {
      setError("Name, Location, and Email are required!");
      toast.error("Name, Location, and Email are required!");
      return;
    }

    setError(""); // Clear error

    try {
      if (isEditing) {
        // Update company
        const response = await fetch(`${baseUrl}/update/${currentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCompany),
        });

        if (response.ok) {
          const updatedCompany = await response.json();
          const updatedCompanies = companies.map((company) =>
            company.id === currentId ? updatedCompany : company
          );
          setCompanies(updatedCompanies);
          setIsEditing(false);
          setCurrentId(null);
          fetchCompanies();
          toast.success("Company updated successfully!");
        } else {
          setError("Failed to update the company");
          toast.error("Failed to update the company");
        }
      } else {
        // Add company
        const response = await fetch(`${baseUrl}/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCompany),
        });

        if (response.ok) {
          const addedCompany = await response.json();
          setCompanies([...companies, addedCompany]);
          fetchCompanies();
          toast.success("Company added successfully!");
        } else {
          setError("Failed to add the company");
          toast.error("Failed to add the company");
        }
      }

      setNewCompany({
        name: "",
        location: "",
        linkedIn: "",
        emails: "",
        phoneNumbers: "",
        comments: "",
        periodicity: "2 weeks",
        adminEmail: localStorage.getItem("AdminEmail"),
      });
    } catch (error) {
      setError("Failed to connect to the server");
      toast.error("Failed to connect to the server");
      console.error(error);
    }
  };

  // Edit a company
  const editCompany = (id) => {
    const companyToEdit = companies.find((company) => company.id === id);
    setIsEditing(true);
    setCurrentId(id);
    setNewCompany(companyToEdit);
  };

  // Open modal for delete confirmation
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Delete a company
  const deleteCompany = async () => {
    try {
      const response = await fetch(`${baseUrl}/delete/${deleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCompanies(companies.filter((company) => company.id !== deleteId));
        fetchCompanies();
        toast.success("Company deleted successfully!");
      } else {
        setError("Failed to delete the company");
        toast.error("Failed to delete the company");
      }
    } catch (error) {
      setError("Failed to connect to the server");
      toast.error("Failed to connect to the server");
      console.error(error);
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <h2>Company Management</h2>
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="form">
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error */}
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={newCompany.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newCompany.location}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="emails"
          placeholder="Emails"
          value={newCompany.emails}
          onChange={handleInputChange}
        />
        <input
          type="url"
          name="linkedIn"
          placeholder="LinkedIn Profile"
          value={newCompany.linkedIn}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phoneNumbers"
          placeholder="Phone Numbers"
          value={newCompany.phoneNumbers}
          onChange={handleInputChange}
        />
        <textarea
          name="comments"
          placeholder="Comments"
          value={newCompany.comments}
          onChange={handleInputChange}
        />
        <select
          name="periodicity"
          value={newCompany.periodicity}
          onChange={handleInputChange}
        >
          <option value="1 week">1 Week</option>
          <option value="2 weeks">2 Weeks</option>
          <option value="1 month">1 Month</option>
        </select>
        <button onClick={addOrUpdateCompany}>
          {isEditing ? "Update Company" : "Add Company"}
        </button>
      </div>
      <div className="company-list">
        <h3>Companies</h3>
        <ul>
          {companies.map((company) => (
            <li key={company.id}>
              <div>
                <strong>{company.name}</strong> - {company.location} <br></br>
                <br></br>
                <strong>{company.emails}</strong>
              </div>
              <div>{company.periodicity}</div>
              <div className="EDbutton">
                <button onClick={() => editCompany(company.id)}>Edit</button>
                <button onClick={() => confirmDelete(company.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this company?</p>
            <button onClick={deleteCompany}>Yes</button>
            <button onClick={() => setShowModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;
