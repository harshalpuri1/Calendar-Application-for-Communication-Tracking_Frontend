import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api"; 
import "./CompanyManagement.css";

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
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
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCompanies = async () => {
    setLoading(true);
    setError("");
    try {
      const adminEmail = localStorage.getItem("AdminEmail");
      if (!adminEmail) {
        throw new Error("Admin email not found");
      }

      const response = await api.getCompanies({ email: adminEmail });
      
      // Ensure companies is always an array
      const companiesArray = Array.isArray(response) 
        ? response 
        : response?.data 
          ? (Array.isArray(response.data) ? response.data : [response.data])
          : [];
      
      setCompanies(companiesArray);
    } catch (error) {
      setError(error.message || "Failed to fetch companies");
      toast.error(error.message || "Failed to fetch companies");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const openFormModal = (company = null) => {
    if (company) {
      setIsEditing(true);
      setCurrentId(company.id);
      setNewCompany(company);
    } else {
      setIsEditing(false);
      setCurrentId(null);
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
    }
    setShowFormModal(true);
  };

  const closeFormModal = () => {
    setShowFormModal(false);
    setError("");
  };

  const addOrUpdateCompany = async () => {
    if (!newCompany.name || !newCompany.location || !newCompany.emails) {
      setError("Name, Location, and Email are required!");
      toast.error("Name, Location, and Email are required!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (isEditing) {
        await api.updateCompany(currentId, newCompany);
          toast.success("Company updated successfully!");
        } else {
        await api.createCompany(newCompany);
          toast.success("Company added successfully!");
      }
      fetchCompanies();
      closeFormModal();
    } catch (error) {
      setError(error.message || "Operation failed");
      toast.error(error.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const deleteCompany = async () => {
    setLoading(true);
    try {
      await api.deleteCompany(deleteId);
        toast.success("Company deleted successfully!");
      fetchCompanies();
    } catch (error) {
      setError(error.message || "Failed to delete company");
      toast.error(error.message || "Failed to delete company");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div>
      <h2>Company Management</h2>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="company-list">
        <h3>Companies</h3>
        {companies.length === 0 ? (
          <p>No companies found</p>
        ) : (
        <ul>
          {companies.map((company) => (
            <li key={company.id}>
              <div>
                <strong>{company.name}</strong> <br/>{company.location} <br /><br />
                {company.emails}
              </div>
              <div>
              <strong>{company.periodicity}</strong>
                </div>
              <div className="EDbutton">
                  <button onClick={() => openFormModal(company)} disabled={loading}>
                    {loading ? "Loading..." : "Edit"}
                  </button>
                  <button onClick={() => confirmDelete(company.id)} disabled={loading}>
                    {loading ? "Loading..." : "Delete"}
                  </button>
              </div>
            </li>
          ))}
        </ul>
        )}
      </div>
      <button className="newCompanyBtn" onClick={() => openFormModal()} disabled={loading}>
        {loading ? "Loading..." : "Add New Company"}
      </button>

      {showFormModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{isEditing ? "Edit Company" : "Add Company"}</h3>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              name="name"
              placeholder="Company Name"
              value={newCompany.name}
              onChange={handleInputChange}
              disabled={loading}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newCompany.location}
              onChange={handleInputChange}
              disabled={loading}
            />
            <input
              type="email"
              name="emails"
              placeholder="Emails"
              value={newCompany.emails}
              onChange={handleInputChange}
              disabled={loading}
            />
            <input
              type="url"
              name="linkedIn"
              placeholder="LinkedIn Profile"
              value={newCompany.linkedIn}
              onChange={handleInputChange}
              disabled={loading}
            />
            <input
              type="text"
              name="phoneNumbers"
              placeholder="Phone Numbers"
              value={newCompany.phoneNumbers}
              onChange={handleInputChange}
              disabled={loading}
            />
            <textarea
              name="comments"
              placeholder="Comments"
              value={newCompany.comments}
              onChange={handleInputChange}
              disabled={loading}
            />
            <select
              name="periodicity"
              value={newCompany.periodicity}
              onChange={handleInputChange}
              disabled={loading}
            >
              <option value="1 week">1 Week</option>
              <option value="2 weeks">2 Weeks</option>
              <option value="1 month">1 Month</option>
            </select>
            <button onClick={addOrUpdateCompany} disabled={loading}>
              {loading ? "Processing..." : isEditing ? "Update" : "Add"}
            </button>
            <button onClick={closeFormModal} disabled={loading}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this company?</p>
            <button onClick={deleteCompany} disabled={loading}>
              {loading ? "Deleting..." : "Yes"}
            </button>
            <button onClick={() => setShowDeleteModal(false)} disabled={loading}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;