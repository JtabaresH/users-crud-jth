import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

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
        .then(() => getUsers())
        .catch((error) => console.log(error.response));
    }
  };

  const reset = () => {
    setName('');
    setCategory('');
    setPrice('');
    setIsAvailable(false);
  };

  return (
    <form onSubmit={submit}>
      <div className="input-group mb-3">
        <label htmlfor="name" className="input-group-text">
          First name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label htmlfor="lastName" className="input-group-text">
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
        <label htmlfor="email" className="input-group-text">
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
        <label htmlfor="birthday" className="input-group-text">
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
        <label htmlfor="password" className="input-group-text">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className="btn-group" role="group">
        <button type="submit" className="btn btn-success">
          Submit
        </button>

        {userSelected !== null && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={deselectUser}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UsersForm;
