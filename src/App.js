import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate JSON format
      const parsedData = JSON.parse(jsonInput);

      // Make API call
      const result = await axios.post('https://bajaj3-jxwd.onrender.com/bfhl', parsedData);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON format or error in API call');
    }
  };

  const handleDropdownChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    const displayData = {};

    if (selectedOptions.includes('Numbers')) displayData.numbers = numbers;
    if (selectedOptions.includes('Alphabets')) displayData.alphabets = alphabets;
    if (selectedOptions.includes('Highest alphabet')) displayData.highest_alphabet = highest_alphabet;

    return (
      <div>
        <h3>Response</h3>
        <pre>{JSON.stringify(displayData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Roll Number: RA2111003010931</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          rows="5"
          cols="50"
          placeholder='Enter JSON data here...'
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {response && (
        <div>
          <label>Select what to display: </label>
          <select multiple onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest alphabet">Highest alphabet</option>
          </select>
        </div>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
