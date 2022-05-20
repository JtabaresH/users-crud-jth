import React from 'react';

const UsersList = ({ users, userSelect }) => {
  return (
    <ul className="list-group">
      {users.map((users) => (
        <li key={users.id} className="list-group-item">
          <h3>
            {users.first_name} {users.last_name}
          </h3>
          <p>
            <b>Email:</b> {users.email}
          </p>
          <p>
            <b>Birthday:</b> {users.birthday}
          </p>
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => userSelect(users)}
            >
              Update
            </button>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
