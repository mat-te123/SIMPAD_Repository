import React, { useEffect, useState } from 'react';

function UserTable() {
  const [users, setUsers] = useState([]); // state kosong dulu

  useEffect(() => {
    // ambil data API dari Laravel
    fetch('http://localhost:8080/api/test')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // buat ngecek apa yang dikirim backend
        setUsers(data); // simpan ke state
      })
      .catch((error) => console.error('Error:', error));
  }, []); // [] = dijalankan hanya sekali di awal

  return (
    <div>
      <h2>Daftar Mahasiswa</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>firstname</th>
            <th>lastname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Loading data...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
