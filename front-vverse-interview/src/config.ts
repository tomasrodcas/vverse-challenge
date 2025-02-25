const getEnvVariable = (key: string, defaultValue?: string): string => {
    const value = import.meta.env[key];
    if (value === undefined && defaultValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value ?? defaultValue!;
  };
  
  export const config = {
    API_BASE_URL: getEnvVariable("VITE_API_BASE_URL"),
    ENV: getEnvVariable("VITE_ENV", "development"),
  };
  