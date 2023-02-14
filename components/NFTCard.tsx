import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Dispatch, SetStateAction } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";

import { ActiveListing } from "../models";
import openUrl from "../utils/openUrl";
import shortenAddress from "../utils/shortenAddress";

interface NFTCardProps {
  nft: ActiveListing;
  showDetails: boolean;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
  selectedNft: ActiveListing | null;
  setSelectedNft: Dispatch<SetStateAction<ActiveListing | null>>;
}

export default function NFTCard({
  nft,
  setShowDetails,
  setSelectedNft,
}: NFTCardProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        marginBottom: 30,
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 0.5,
      }}
    >
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={require("../assets/magiceden.png")}
          style={{ width: 30, height: 18 }}
        />
        <TouchableOpacity
          onPress={async () =>
            await openUrl(`https://solscan.io/account/${nft.seller}`)
          }
        >
          <Text
            style={{
              color: theme.colors.secondary,
              fontWeight: "bold",
              marginLeft: 5,
            }}
          >
            {shortenAddress(nft.seller)}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text variant="titleLarge" style={{ marginRight: 2 }}>
            {nft.amount / LAMPORTS_PER_SOL}
          </Text>
          <Image
            source={require("../assets/solana.png")}
            style={{ width: 100 / 5, height: 88 / 5 }}
          />
        </View>
      </View>

      <Image
        style={{ height: 400 }}
        resizeMethod="resize"
        resizeMode="cover"
        source={{ uri: nft.image }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View>
          <Text variant="titleLarge">{nft.name}</Text>
          <Text>{nft.symbol || "N/A"}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedNft(nft);
              setShowDetails(true);
            }}
          >
            <IconButton
              mode="contained"
              iconColor={theme.colors.secondary}
              icon="eye"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconButton
              mode="contained"
              iconColor={theme.colors.primary}
              icon="wallet"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
