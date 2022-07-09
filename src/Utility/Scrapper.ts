const getRecipe = async (url: string) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

const extractRecipe = (html: string) => {
  const startTag = '<script type="application/ld+json">';
  const endTag = "</script>";
  const startTagLength = startTag.length;

  const start = html.indexOf(startTag) + startTagLength;
  const end = html.indexOf(endTag, start);
  const json = html.substring(start, end);
  const recipe = JSON.parse(json);
  console.log(recipe);
};

export const scrapper = async (url: string) => {
  const html = await getRecipe(url);
  extractRecipe(html);
};
