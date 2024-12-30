import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies } from '../../store/companySlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Company Dashboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th>Company</th>
            <th>Last Communication</th>
            <th>Next Scheduled</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.lastCommunication}</td>
              <td>{company.nextCommunication}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
