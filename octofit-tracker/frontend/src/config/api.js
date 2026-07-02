const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    const { hostname, protocol } = window.location;

    if (hostname.endsWith('.app.github.dev')) {
      const frontendPrefix = hostname.split('.')[0];

      if (frontendPrefix.endsWith('-5173')) {
        const codespaceName = frontendPrefix.replace(/-5173$/, '');
        return `${protocol}//${codespaceName}-8000.app.github.dev`;
      }

      if (frontendPrefix.endsWith('-8000')) {
        return `${protocol}//${hostname}`;
      }
    }
  }

  return 'http://localhost:8000';
};

export const apiBaseUrl = getApiBaseUrl();
export const apiUrl = `${apiBaseUrl}/api`;
