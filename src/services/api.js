import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Add JWT token to requests
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authorize = async (scope) => {
  // Check if access token for the scope already exists
  const cachedToken = sessionStorage.getItem(scope);
  if (cachedToken) {
    return cachedToken; // Use the cached token
  }

  // If not cached, request a new access token
  try {
    const response = await axios.post(
      process.env.REACT_APP_AUTHORIZE_URL,
      { scopes: scope },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    );

    const { access_token } = response.data;

    sessionStorage.setItem(scope, access_token);

    return access_token;
  } catch (error) {
    console.error('Error obtaining access token:', error);
    throw error;
  }
};
export const fetchTasks = async (
  startDate,
  endDate,
  from = 0,
  size = 100,
  counting = true
) => {
  // Get access token for the read:task scope
  const accessToken = await authorize('read:task');

  const payload = {
    start_date: startDate,
    end_date: endDate,
    counting,
    _from: from,
    _size: size,
  };

  const response = await axios.post(process.env.REACT_APP_TASK_URL, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  // console.log("asdasd", response)
  return response.data;
};

export const login = (credentials) => API.post('/auth/login', credentials);
export const updateTaskStatus = (id, status) =>
  API.put(`/tasks/${id}/status`, { status });
export const createTask = (task) => API.post('/tasks', task);
export const fetchSummary = () => API.get('/employees/summary');
