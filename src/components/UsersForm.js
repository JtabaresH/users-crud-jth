import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

  const [type, setType] = useState(false);
  const changeType = () => setType(!type);

  useEffect(() => {
    if (userSelected !== null) {
      setName(userSelected.first_name);
      setLastName(userSelected.last_name);
      setEmail(userSelected.email);
      setBirthday(userSelected.birthday);
      setPassword(userSelected.password);
    } else {
      setName('');
      setLastName('');
      setEmail('');
      setBirthday('');
      setPassword('');
      setType(false);
    }
  }, [userSelected]);

  const submit = (e) => {
    e.preventDefault();
    const users = {
      first_name: name,
      last_name: lastName,
      email: email,
      birthday: birthday,
      password: password,
    };
    if (userSelected !== null) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
          users
        )
        .then(() => {
          getUsers();
          deselectUser();
        });
    } else {
      axios
        .post('https://users-crud1.herokuapp.com/users/', users)
        .then(() => {
          getUsers();
          reset();
        })
        .catch((error) => console.log(error.response));
    }
  };

  const reset = () => {
    setName('');
    setLastName('');
    setEmail('');
    setBirthday('');
    setPassword('');
    setType(false);
  };

  return (
    <form onSubmit={submit}>
      <div className="input-group mb-3">
        <label htmlFor="name" className="input-group-text">
          First name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label htmlFor="lastName" className="input-group-text">
          Last name
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
      </div>

      <div className="input-group mb-3">
        <label htmlFor="email" className="input-group-text">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="example@example.com"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className="input-group mb-3">
        <label htmlFor="birthday" className="input-group-text">
          Birthday
        </label>
        <input
          type="date"
          className="form-control"
          id="birthday"
          onChange={(e) => setBirthday(e.target.value)}
          value={birthday}
        />
      </div>

      <div className="input-group mb-3">
        <label htmlFor="password" className="input-group-text">
          Password
        </label>
        <input
          type={type ? 'text' : 'password'}
          className="form-control"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={changeType}
        >
          {type ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
            >
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
          )}
        </button>
      </div>

      <button type="submit" className="btn btn-success">
        Submit
      </button>
      {userSelected !== null && (
        <button type="button" className="btn btn-danger" onClick={deselectUser}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default UsersForm;
