const API_URL = "/api";

export const signup = async (data) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const login = async (data) => {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const uploadCertificate = async (formData, token) => {
  return fetch(`${API_URL}/certificates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export const getCertificates = async (token) => {
  return fetch(`${API_URL}/certificates`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};