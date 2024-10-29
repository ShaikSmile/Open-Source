import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const handleCopy = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg p-9 rounded-lg">
        <h1 className="text-3xl font-bold text-stone-750 text-center">
          Password Generator
        </h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="border rounded-lg px-3 py-2 my-9 w-full"
          />
          <button
            onClick={handleCopy}
            className="text-white px-3 py-2 bg-blue-700 rounded-r-lg h-full my-9 hover:bg-blue-800 transition"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <label className="font-semibold">Length: {length}</label>
          <input
            type="range"
            value={length}
            min={8}
            max={100}
            onChange={(e) => setLength(Number(e.target.value))}
            className="cursor-pointer w-full"
          />
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <label className="font-semibold">Include Numbers</label>
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <label className="font-semibold">Include Special Characters</label>
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
          />
        </div>

        {/* <button
          onClick={passwordGenerator}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Generate Password
        </button> */}
      </div>
    </div>
  );
}

export default App;
