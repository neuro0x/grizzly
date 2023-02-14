export interface ActiveListing {
  amount: number;
  attributes: { trait_type: string; value: string }[];
  collection: { key: string; verified: boolean };
  collectionDetails?: any;
  data: OnChainData;
  description: string;
  editionNonce: number;
  firstVerifiedCreator: string;
  image: string;
  isMutable: boolean;
  key: string;
  marketplace: string; // TODO: enumerate
  mint: string;
  name: string;
  primarySaleHappened: boolean;
  properties: {
    category: string;
    creators: Creator[];
    files: { type: string; uri: string }[];
  }[];
  seller: string;
  sellerFeeBasisPoints: number;
  symbol: string;
  tokenStandard: string;
  transactionSignature: string;
  updateAuthority: string;
  verifiedCollectionAddress: string;
}

export interface OnChainData {
  creators: Creator[];
  name: string;
  sellerFeeBasisPoints: number;
  symbol: string;
  uri: string;
}

export interface Creator {
  address: string;
  verified: boolean;
  share: number;
}

export interface Activity {
  blocktime: number;
  buyer: string;
  buyerReferral: string;
  collectionSymbol: string;
  price: number;
  seller: string;
  sellerReferral: string;
  signature: string;
  slot: number;
  source: string; // TODO: enumerate
  tokenMint: string;
  type: "List" | "Delist" | "Buy Now" | "Bid"; // TODO: enumerate
}
