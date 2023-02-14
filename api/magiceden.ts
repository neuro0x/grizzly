import axios from "axios";
import { Activity } from "../models";

const baseUrl = "https://api-mainnet.magiceden.dev/v2";

const mapType = (type: string) => {
  switch (type) {
    case "list":
      return "List";
    case "delist":
      return "Delist";
    case "buyNow":
      return "Buy Now";
    case "bid":
      return "Bid";
    default:
      return type;
  }
};

export default async function getTokenActivity(
  mint: string,
  offset = 0,
  limit = 100
) {
  const url = `${baseUrl}/tokens/${mint}/activities`;
  const { data } = await axios.get(url);
  return data
    .filter((it: any) => it.type !== "cancelBid")
    .map((it: any) => {
      it.type = mapType(it.type);
      return it as Activity;
    });
}
