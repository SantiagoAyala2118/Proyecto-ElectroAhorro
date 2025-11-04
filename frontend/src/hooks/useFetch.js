export const useFetch = (url) => {
  const getFetch = async (data) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        console.error("Error en la response", res.status, res.statusText);
      }
    } catch (err) {
      console.error("Error durante la petición", err);
    }
  };

  return { getFetch };
};
