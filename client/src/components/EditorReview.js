import React, { useState } from 'react';

async function reviewText(token, text) {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/review`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({ text })
  });
  if (!resp.ok) throw new Error('Review failed');
  return resp.json();
}

export default function EditorReview({ token }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  async function handleReview() {
    setLoading(true);
    try {
      const res = await reviewText(token, text);
      setSuggestions(res.suggestions);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Editor de Revisión</h2>
        
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={12}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Escribe o pega tu texto aquí..."
        />

        <div className="flex justify-center">
          <button
            onClick={handleReview}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition duration-200 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Revisando...' : 'Revisar'}
          </button>
        </div>

        {suggestions && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Sugerencias</h3>
            <pre className="text-sm text-gray-800 overflow-x-auto">{JSON.stringify(suggestions, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
