// api.js
import axios from 'axios';

const API_BASE_URL = 'https://7jn4cwdn48.execute-api.ap-south-1.amazonaws.com/st1'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = async () => {
  try {
    const response = await api.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Axios Error:', error);
    throw error;
  }
};

export const addTodo = async (todo) => {
  try {
    const response = await api.post('/todos', todo);
    console.log('Axios Response:', response);
    return response.data;
  } catch (error) {
    console.error('Axios Error:', error);
    throw error;
  }
};

export const updateTodo = async (id, todo) => {
  try {
    const response = await api.put(`/todos/${id}`, todo);
    console.log('Axios Response:', response);
    return response.data;
  } catch (error) {
    console.error('Axios Error:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/todos/${id}`);
    console.log('Axios Response:', response);
    return response.data;
  } catch (error) {
    console.error('Axios Error:', error);
    throw error;
  }
};
