const API_BASE = 'http://localhost:3000';

export const postFeedback = async (data, token) => {
  return fetch(`${API_BASE}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getFeedbacks = async (token, rating) => {
  const url = new URL(`${API_BASE}/feedback`);
  if (rating) url.searchParams.append('rating', rating);

  return fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
};

export const deleteFeedback = async (id, token) => {
  return fetch(`${API_BASE}/feedback/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
};

export const loginUser = async (credentials) => {
  return fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }).then((res) => res.json());
};

export const signupUser = async (details) => {
  return fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  }).then((res) => res.json());
};
