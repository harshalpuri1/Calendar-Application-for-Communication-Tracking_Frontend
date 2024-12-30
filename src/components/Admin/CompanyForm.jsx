import React, { useState } from 'react';
import { createCompany } from '../../services/api';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedin: '',
    email: '',
    phone: '',
    comments: '',
    periodicity: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCompany(formData);
    setFormData({});
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 border rounded-lg shadow-md">
      <input placeholder="Company Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input placeholder="Location" onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
      <input placeholder="LinkedIn" onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Company</button>
    </form>
  );
};

export default CompanyForm;
