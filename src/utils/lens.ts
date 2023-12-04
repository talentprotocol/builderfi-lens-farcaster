import { LensClient, LimitType, PrimaryPublicationFragment, development } from '@lens-protocol/client';

export const getLensPublications = async (
  query: string,
  after?: number,
  options: { limit?: LimitType } = { limit: LimitType.Fifty }
): Promise<PrimaryPublicationFragment[]> => {
  const client = new LensClient({
    environment: development,
  });

  let pageInfo = {
    next: null,
  };

  const allItems: PrimaryPublicationFragment[] = [];

  do {
    // eslint-disable-next-line no-await-in-loop
    const result = await client.search.publications({
      query,
      limit: options.limit,
      ...(pageInfo?.next ? { cursor: pageInfo.next } : {}), // Use the next page token from pageInfo
    });

    const { items, pageInfo: nextPageInfo } = result;

    // Check if any of the items have a createdAt before the 'after' parameter
    const stopIndex = items.findIndex((item) => new Date(item.createdAt).getTime() < after);

    if (stopIndex !== -1) {
      // Some items have createdAt before 'after', stop the loop
      allItems.push(...items.slice(0, stopIndex));
      break;
    }

    allItems.push(...items);

    pageInfo = nextPageInfo;
  } while (pageInfo.next !== null);

  return allItems;
};
