// src/components/Admin/CompanyManagement.jsx
import React, { useState } from "react";

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
  });

  const handleInputChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const addCompany = () => {
    setCompanies([...companies, newCompany]);
    setNewCompany({
      name: "",
      location: "",
      linkedIn: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      periodicity: "2 weeks",
    });
  };

  return (
    <div>
      <h2>Company Management</h2>
      <div className="form">
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
          type="url"
          name="linkedIn"
          placeholder="LinkedIn Profile"
          value={newCompany.linkedIn}
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
        <button onClick={addCompany}>Add Company</button>
      </div>
      <div className="company-list">
        <h3>Companies</h3>
        <ul>
          {companies.map((company, index) => (
            <li key={index}>
              {company.name} - {company.location}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyManagement;