import React, { useState } from 'react';
import { postFeedback } from '../utils/api';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 1,
    feedback: '',
  });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postFeedback({
        ...formData,
        rating: Number(formData.rating),
      });
      if (res.message === 'Feedback received') {
        setSuccess('Thank you for your feedback!');
        setFormData({ name: '', email: '', rating: 1, feedback: '' });
      }
    } catch {
      setSuccess('Something went wrong!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Name"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
        />
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 && 's'}
            </option>
          ))}
        </select>
        <textarea
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          required
          placeholder="Your feedback..."
          className="w-full p-2 mb-2 border rounded"
        />
        {success && <p className="text-green-500 mb-2">{success}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
