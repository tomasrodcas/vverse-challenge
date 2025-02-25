import { useQuery } from "@tanstack/react-query";

export const App = () => {
  const fetchExample = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/examples`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["example"],
    queryFn: fetchExample,
  });

  return (
    <div>
      <h1>App</h1>
      <p>API_BASE_URL: {import.meta.env.VITE_API_BASE_URL}</p>
      <p>ENV: {import.meta.env.VITE_ENV}</p>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Loading: {isLoading.toString()}</p>
      <p>Error: {JSON.stringify(error)}</p>
    </div>
  );
};
