import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Use state to hold the form data
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Update state when user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the browser from refreshing

    try {
      // This is the API call to your backend!
      // We use localhost:5000 because docker-compose will expose it.
      const response = await axios.post('http://localhost:5000/api/submit', formData);

      console.log(response.data);
      alert('User data submitted successfully!');

      // Clear the form
      setFormData({ name: '', email: '' });

    } catch (err) {
      console.error('Error submitting form', err);
      alert('Error submitting data');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN App Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;