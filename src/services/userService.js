import apiClient, { unwrapApiResponse } from "../http/apiClient";

// GET already confirmed: http://localhost:3002/api/users
// POST, PUT and DELETE must exist in the running Node.js server.
export const userService = {
  getAll: async () => {
    const response = await apiClient.get("/users");
    const users = unwrapApiResponse(response);
    if (!Array.isArray(users)) {
      throw new Error("Expected an array in API response.data");
    }
    return users;
  },

  create: async (values) => {
    const response = await apiClient.post("/users", values);
    return unwrapApiResponse(response);
  },

  update: async (id, values) => {
    const response = await apiClient.put(`/users/${encodeURIComponent(id)}`, values);
    return unwrapApiResponse(response);
  },

  remove: async (id) => {
    const response = await apiClient.delete(`/users/${encodeURIComponent(id)}`);
    unwrapApiResponse(response);
    return id; // independent of DELETE response body format
  },
};


// import apiClient from "../http/apiClient";

// export const userService = {
//     getAll : () => apiClient.get("/users"),
//     getById: (id) => apiClient.get(`/users/${id}`),
//     create : (user) => apiClient.post('/users',user),
//     update :(id,user) => apiClient.put(`/users/${id}`,user),
//     delete : (id) => apiClient.delete(`/users/${id}`)
// }