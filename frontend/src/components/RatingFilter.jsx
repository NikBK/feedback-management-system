import React from 'react';

export default function RatingFilter({ value, onChange }) {
  return (
    <select
      className="p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Ratings</option>
      {[1, 2, 3, 4, 5].map((r) => (
        <option key={r} value={r}>
          {r} Star{r > 1 && 's'}
        </option>
      ))}
    </select>
  );
}
