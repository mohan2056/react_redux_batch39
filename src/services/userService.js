import apiClient from "../http/apiClient";

export const userService = {
    getAll : () => apiClient.get("/users"),
    getById: (id) => apiClient.get(`/users/${id}`),
    create : (user) => apiClient.post('/users',user),
    update :(id,user) => apiClient.put(`/users/${id}`,user),
    delete : (id) => apiClient.delete(`/users/${id}`)
}