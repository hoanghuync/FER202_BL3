import React from "react";

export default function CompanyTable({ data }) {
  if (data.length === 0) {
    return <p>No result</p>;
  }

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Start</th>
          <th>End</th>
        </tr>
      </thead>
      <tbody>
        {data.map((c, index) => (
          <tr key={index}>
            <td>{c.name}</td>
            <td>{c.category}</td>
            <td>{c.start}</td>
            <td>{c.end}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
