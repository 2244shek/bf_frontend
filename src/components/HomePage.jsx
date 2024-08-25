import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function HomePage() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);

            const res = await axios.post('http://localhost:5000/bfhl', parsedInput);

            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input or error in fetching data');
            setResponse(null);
        }
    };

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOptions(
            selectedOptions.includes(value)
                ? selectedOptions.filter(option => option !== value)
                : [...selectedOptions, value]
        );
    };

    return (
        <div className="App" style={styles.container}>
            <h1 style={styles.header}>API INPUT</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here...'
                style={styles.textarea}
            />
            <br />
            <button onClick={handleSubmit} style={styles.button}>Submit</button>
            {error && <p style={styles.error}>{error}</p>}

            {response && (
                <div style={styles.responseContainer}>
                    <h3 style={styles.subHeader}>Select Options</h3>
                    <label style={styles.checkboxLabel}>
                        <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
                        Alphabets
                    </label>
                    <label style={styles.checkboxLabel}>
                        <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
                        Numbers
                    </label>
                    <label style={styles.checkboxLabel}>
                        <input type="checkbox" value="HighestLowercaseAlphabet" onChange={handleOptionChange} />
                        Highest lowercase alphabet
                    </label>

                    <div style={styles.response}>
                        <h3 style={styles.subHeader}>Response</h3>
                        <p>
                            Filtered Response : {JSON.stringify([
                                ...(selectedOptions.includes('Alphabets') ? response.alphabets : []),
                                ...(selectedOptions.includes('Numbers') ? response.numbers : []),
                                ...(selectedOptions.includes('HighestLowercaseAlphabet') ? response.highest_lowercase_alphabet : [])
                            ])}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        fontFamily: "'Arial', sans-serif",
        margin: '40px auto',
        width: '60%',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        color: '#333',
        fontSize: '32px',
        marginBottom: '20px',
    },
    textarea: {
        width: '80%',
        height: '120px',
        padding: '15px',
        border: '2px solid #007BFF',
        borderRadius: '6px',
        fontSize: '16px',
        outline: 'none',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    responseContainer: {
        marginTop: '30px',
        textAlign: 'left',
    },
    subHeader: {
        color: '#555',
        fontSize: '24px',
        marginBottom: '10px',
    },
    checkboxLabel: {
        marginRight: '15px',
        fontSize: '18px',
        color: '#333',
    },
    response: {
        backgroundColor: '#e9ecef',
        padding: '20px',
        borderRadius: '6px',
        marginTop: '20px',
    },
};

export default HomePage;
