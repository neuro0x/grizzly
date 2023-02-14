import axios from "axios";

import { ActiveListing } from "../models";

const apiKey = "4d4c0304-4d44-463b-91fc-e65467c4d489";
const baseUrl = "https://api.helius.xyz";

export const getActiveListings = async (
  marketplaces: string[] = [],
  firstVerifiedCreators: string[] = [],
  verifiedCollectionAddresses: string[] = [],
  limit = 100,
  paginationToken = ""
): Promise<{
  paginationToken: string;
  results: ActiveListing[];
  error?: any;
}> => {
  try {
    const { data: listings } = await axios.post(
      `${baseUrl}/v1/active-listings?api-key=${apiKey}`,
      {
        query: {
          marketplaces,
          firstVerifiedCreators,
          verifiedCollectionAddresses,
        },
        options: {
          limit,
          paginationToken: paginationToken || null,
        },
      }
    );

    // TODO: type this
    const mints = listings.result.map((it: any) => it.mint);
    const { data: mintsData } = await axios.post(
      `${baseUrl}/v0/tokens/metadata?api-key=${apiKey}`,
      { mintAccounts: mints }
    );

    return {
      paginationToken: listings.paginationToken,
      results: listings.result.map((it: any, index: number) => {
        const mapped = {
          ...it,
          ...it.activeListings?.[0],
          ...mintsData[index].offChainData,
          ...mintsData[index].onChainData,
        };
        delete mapped.activeListings;

        return mapped;
      }) as ActiveListing[],
    };
  } catch (error) {
    console.error(error);
    return { paginationToken: "", results: [], error };
  }
};
