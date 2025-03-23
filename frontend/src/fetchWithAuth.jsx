const fetchWithAuth = async (url, options = {}, navigate) => {
  let token = localStorage.getItem('token');

  const defaultHeaders = {
      Authorization: `JWT ${token}`,
  };

  options.headers = { ...defaultHeaders, ...options.headers };

  let response = await fetch(url, options);

  if (response.status === 401) {
      console.log('Access token expired. Refreshing...');
      const newToken = await refreshToken(navigate); // Pass navigate here
      if (!newToken) return response;

      options.headers.Authorization = `JWT ${newToken}`;
      response = await fetch(url, options);
  }

  return response;
};

const refreshToken = async (navigate) => {
  try {
      const refresh = localStorage.getItem('refresh_token');
      if (!refresh) {
          navigate('/'); // Redirect to login
          return null;
      }

      const response = await fetch(`${API_BASE}/auth/jwt/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh }),
      });

      if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.access);
          return data.access;
      } else {
          alert('Session expired! Please log in again.');
          navigate('/'); // Redirect if refresh fails
          return null;
      }
  } catch (error) {
      console.error('Error refreshing token:', error);
      navigate('/'); // Redirect on error
      return null;
  }
};

export default fetchWithAuth;
