import React from 'react';

const UsersList = ({ users, userSelect, deleteUser }) => {
  return (
    <>
      <div class="card text-bg-primary mb-3" style={{ maxWidth: '18rem' }}>
        <div class="card-header">Header</div>
        <div class="card-body">
          <h5 class="card-title">Primary card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
      <div className="row justify-content-center text-center">
        {users.map((users) => (
          <div
            key={users.id}
            className="card text-bg-light m-3"
            style={{
              maxWidth: '18rem',
              boxShadow: '2px 3px 5px grey',
            }}
          >
            <h3 className="card-header" style={{ backgroundColor: '#C6C6C6' }}>
              {users.first_name} {users.last_name}
            </h3>
            <div className="card-body">
              <p>
                <b>Email</b> <br /> {users.email}
              </p>
              <p>
                <b>Birthday</b> <br /> {users.birthday}
              </p>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => userSelect(users)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteUser(users.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersList;
