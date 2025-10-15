import React from 'react';

const History = () => {
  // Mock data for patient history
  const patientHistory = [
    { id: '123456', date: '2025-09-26', status: 'Completed' },
    { id: '234567', date: '2025-09-25', status: 'Processing' },
    { id: '345678', date: '2025-09-24', status: 'Completed' },
  ];

  return (
    <div className="content-container">
      <h2 className="mb-4">Scan History</h2>
      <div className="history-list">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientHistory.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.date}</td>
                  <td>
                    <span className={`status-badge ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-link view-btn">View Results</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;