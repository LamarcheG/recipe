export const getRecipe = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  const data = await response.text();
  return data;
};
