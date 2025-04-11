import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFeedbacks, deleteFeedback } from '../utils/api';
import RatingFilter from '../components/RatingFilter';

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ratingFilter, setRatingFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    if (!user?.role || user.role !== 'admin') {
      logout();
    } else {
      loadFeedbacks();
    }
  }, []);

  const loadFeedbacks = async () => {
    try {
      const data = await getFeedbacks(localStorage.getItem('token'));
      setFeedbacks(data);
      setFiltered(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (rating) => {
    setRatingFilter(rating);
    const filtered = rating
      ? feedbacks.filter((f) => f.rating === Number(rating))
      : feedbacks;
    setFiltered(filtered);
  };

  const handleSortChange = (key) => {
    setSortBy(key);
    const sorted = [...filtered].sort((a, b) =>
      key === 'rating'
        ? b.rating - a.rating
        : new Date(b.date) - new Date(a.date)
    );
    setFiltered(sorted);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      await deleteFeedback(id, localStorage.getItem('token'));
      loadFeedbacks();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Feedback Panel</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 items-center mb-4">
        <RatingFilter value={ratingFilter} onChange={handleFilterChange} />
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortBy}
          className="p-2 border rounded"
        >
          <option value="date">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Feedback</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((fb) => (
              <tr key={fb.id} className="text-center">
                <td className="p-2 border">{fb.name}</td>
                <td className="p-2 border">{fb.email}</td>
                <td className="p-2 border text-yellow-500">
                  {'★'.repeat(fb.rating)}
                  {'☆'.repeat(5 - fb.rating)}
                </td>
                <td className="p-2 border">{fb.feedback}</td>
                <td className="p-2 border">
                  {new Date(fb.date).toLocaleString()}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(fb.id)}
                    className="bg-red-400 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500 text-center">
                  No feedback found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
