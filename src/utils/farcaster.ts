interface Cast {
  publishedAt: number;
  username: string;
  data: {
    text: string;
    image: string | null;
    replyParentMerkleRoot: string | null;
    threadMerkleRoot: string;
  };
}

export const getCasts = async (
  query: string,
  after?: number,
  options: { page?: number; count?: number } = { count: 10 }
): Promise<Cast[]> => {
  let page = 0;
  const { count } = options;
  const searchCasterBaseUrl = new URL('https://searchcaster.xyz/api/search');
  if (query) {
    searchCasterBaseUrl.searchParams.append('text', query);
  }
  if (after) {
    searchCasterBaseUrl.searchParams.append('after', after.toString());
  }
  if (page) {
    searchCasterBaseUrl.searchParams.append('page', page.toString());
  }
  if (count) {
    searchCasterBaseUrl.searchParams.append('count', count.toString());
  }
  const castsData: Cast[] = [];

  let shouldStop = false;
  while (!shouldStop) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(searchCasterBaseUrl.toString());
      // eslint-disable-next-line no-await-in-loop
      const data = await response.json();
      const { count: newCount, casts } = data.meta;
      castsData.push(...casts);
      if (newCount < count) {
        shouldStop = true;
      }
    } catch (e) {
      console.error(e);
      break;
    }
    page++;
    searchCasterBaseUrl.searchParams.set('page', page.toString());
  }
  return castsData;
};