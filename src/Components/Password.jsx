import React, { useState, useEffect, useRef } from 'react';
import './pass.css';

const App = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const passwordRef = useRef(null);

  const generatePassword = () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charPool = lowercaseChars;

    if (includeUppercase) charPool += uppercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool[randomIndex];
    }

    setGeneratedPassword(password);
    setCopySuccess('');
  };

  useEffect(() => {
    generatePassword();
  }, [passwordLength, includeUppercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword).then(
      () => setCopySuccess('Password copied to clipboard!'),
      () => setCopySuccess('Failed to copy password.')
    );
  };

  return (
    <div className="app">
      <h1>Password Generator</h1>
      <div className="generator-settings">
        <label>
          Password Length:
          <input
            type="number"
            min="4"
            max="32"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          Include Uppercase Letters
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Include Symbols
        </label>
      </div>
      <div className="password-display">
        <input
          ref={passwordRef}
          type="text"
          readOnly
          value={generatedPassword}
        />
        <button onClick={copyToClipboard}>Copy</button>
      </div>
      {copySuccess && <p className="copy-success">{copySuccess}</p>}
      <button className="generate-button" onClick={generatePassword}>
        Generate New Password
      </button>
    </div>
  );
};

export default App;

 