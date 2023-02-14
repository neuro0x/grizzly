import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { List, IconButton, Text, Button } from "react-native-paper";

import { ActiveListing, Activity } from "../../models";
import shortenAddress from "../../utils/shortenAddress";

interface DetailsModalProps {
  selectedNft: ActiveListing;
  selectedNftDetails: Activity[];
}

export default function DetailsModal({
  selectedNft,
  selectedNftDetails,
}: DetailsModalProps) {
  return (
    <>
      <Text variant="titleMedium">{selectedNft.name}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Image
          source={{ uri: selectedNft.image }}
          style={{
            width: 125,
            height: 125,
            borderRadius: 10,
          }}
        />
        <View style={{ justifyContent: "space-between" }}>
          <TouchableOpacity>
            <Button>
              Mint: {shortenAddress(selectedNft.mint)}{" "}
              <Image
                style={{ width: 15, height: 15 }}
                source={require("../../assets/solscan.png")}
              />
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button>
              Seller: {shortenAddress(selectedNft.seller)}{" "}
              <Image
                style={{ width: 15, height: 15 }}
                source={require("../../assets/solscan.png")}
              />
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button>
              Price: {selectedNft.amount / LAMPORTS_PER_SOL}{" "}
              <Image
                source={require("../../assets/solana.png")}
                style={{ width: 15, height: 15 }}
              />
            </Button>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ marginVertical: 5, maxHeight: 300 }}>
        <List.Accordion title="Recent Activities">
          {selectedNftDetails.map((it) => (
            <List.Item
              key={it.signature}
              title={it.type}
              left={() => {
                switch (it.type) {
                  case "List":
                    return <IconButton icon="format-list-checks" />;
                  case "Delist":
                    return <IconButton icon="list-status" />;
                  case "Buy Now":
                    return <IconButton icon="wallet-plus" />;
                  case "Bid":
                    return <IconButton icon="hand-coin" />;
                }
              }}
              right={() => (
                <View style={{ alignSelf: "flex-end", marginBottom: 5 }}>
                  {it.buyer && (
                    <Text style={{ textAlign: "right" }}>
                      Buyer: {shortenAddress(it.buyer)}
                    </Text>
                  )}
                  {it.seller && (
                    <Text style={{ textAlign: "right" }}>
                      Seller: {shortenAddress(it.seller)}
                    </Text>
                  )}
                </View>
              )}
              description={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>Price: {it.price} </Text>
                  <Image
                    source={require("../../assets/solana.png")}
                    style={{ width: 15, height: 15 }}
                  />
                </View>
              }
            />
          ))}
        </List.Accordion>
      </ScrollView>
    </>
  );
}
