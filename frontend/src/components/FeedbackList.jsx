import React from 'react';

export default function FeedbackList({ feedbacks, onDelete }) {
  return (
    <table className="min-w-full table-auto border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Rating</th>
          <th className="p-2 border">Feedback</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.map((fb) => (
          <tr key={fb.id}>
            <td className="p-2 border">{fb.name}</td>
            <td className="p-2 border">{fb.email}</td>
            <td className="p-2 border text-yellow-500">
              {'★'.repeat(fb.rating)}
              {'☆'.repeat(5 - fb.rating)}
            </td>
            <td className="p-2 border">{fb.feedback}</td>
            <td className="p-2 border">{new Date(fb.date).toLocaleString()}</td>
            <td className="p-2 border">
              <button
                onClick={() => onDelete(fb.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
