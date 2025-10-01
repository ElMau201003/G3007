import React, { useState } from 'react';

async function reviewText(token, text) {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
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
    <div>
      <textarea value={text} onChange={e => setText(e.target.value)} rows={12} cols={80} />
      <div>
        <button onClick={handleReview} disabled={loading}>Revisar</button>
      </div>
      <div>
        <h3>Sugerencias</h3>
        <pre>{JSON.stringify(suggestions, null, 2)}</pre>
      </div>
    </div>
  );
}