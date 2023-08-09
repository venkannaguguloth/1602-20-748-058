import React, { useState, useEffect } from 'react';

const NumberList = () => {
  const [numbers, setNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await fetch('http://20.244.56.144/numbers/primes');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setNumbers(data.numbers);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchNumbers();
  }, []);
  const handleButtonClick = async (endpoint) => {
    try {
      const response = await fetch(`http://20.244.56.144/numbers/${endpoint}`);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setNumbers(data.numbers);
      setActiveButton(endpoint);
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Number List</h2>
      <div className="buttons">
        <button
          className={activeButton === 'primes' ? 'active' : ''}
          onClick={() => handleButtonClick('primes')}
        >
          Primes
        </button>
        <button
          className={activeButton === 'odd' ? 'active' : ''}
          onClick={() => handleButtonClick('odd')}
        >
          Odd
        </button>
        <button
          className={activeButton === 'fibo' ? 'active' : ''}
          onClick={() => handleButtonClick('fibo')}
        >
          Fibo
        </button>
        <button
          className={activeButton === 'rand' ? 'active' : ''}
          onClick={() => handleButtonClick('rand')}
        >
          Random
        </button>
      </div>
      {/* <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul> */}
      <table className="number-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((number, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NumberList;
