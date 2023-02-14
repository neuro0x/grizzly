import { Dispatch, SetStateAction, useState } from "react";
import { View, ScrollView, Image, TouchableHighlight } from "react-native";
import { Divider, useTheme } from "react-native-paper";

const topCollections = [
  {
    id: 0,
    name: "Scoogis",
    image: require("../assets/top-collections/scoogis.png"),
    symbol: "scoogis",
    firstVerifiedCreator: "ALiCEpUt745UnHPrHNACjXNxcTGyaK98mAUJcdAtwi2A",
  },
  {
    id: 1,
    name: "ABC",
    image: require("../assets/top-collections/abc.png"),
    symbol: "ABC",
    verifiedCollectionAddress: "ES2iF5ctjqvtopPn4n6K7c9fdHjYg41rYXL2XzJK37jF",
  },
  {
    id: 2,
    name: "Claynosaurz",
    image: require("../assets/top-collections/claynosaurs.png"),
    symbol: "DINO",
    verifiedCollectionAddress: "6mszaj17KSfVqADrQj3o4W3zoLMTykgmV37W4QadCczK",
  },
  {
    id: 3,
    name: "Famous Fox Federation",
    image: require("../assets/top-collections/fff.png"),
    symbol: "FFF",
    verifiedCollectionAddress: "BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac",
  },
  {
    id: 5,
    name: "Okay Bears",
    image: require("../assets/top-collections/okb.png"),
    symbol: "OKB",
    verifiedCollectionAddress: "3saAedkM9o5g1u5DCqsuMZuC4GRqPB4TuMkvSsSVvGQ3",
  },
  {
    id: 6,
    name: "Solana Monkey Business",
    image: require("../assets/top-collections/smb.png"),
    symbol: "SMB",
    verifiedCollectionAddress: "SMBH3wF6baUj6JWtzYvqcKuj2XCKWDqQxzspY12xPND",
  },
];

interface TopCollectionsProps {
  setFirstVerifiedCreators: Dispatch<SetStateAction<string[]>>;
  setVerifiedCollectionAddresses: Dispatch<SetStateAction<string[]>>;
}

export default function TopCollections({
  setFirstVerifiedCreators,
  setVerifiedCollectionAddresses,
}: TopCollectionsProps) {
  const theme = useTheme();
  const [highlighted, setHighlighted] = useState<number | null>(null);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        height: 85,
        margin: 10,
      }}
    >
      {topCollections.map((it) => (
        <View key={it.id} style={{ height: 85 }}>
          <TouchableHighlight
            onPress={() => {
              // selected one was clicked again
              if (highlighted === it.id) {
                setHighlighted(null);
                setFirstVerifiedCreators([]);
                setVerifiedCollectionAddresses([]);
              } else {
                setHighlighted(it.id);
                setFirstVerifiedCreators(
                  it.firstVerifiedCreator ? [it.firstVerifiedCreator] : []
                );
                setVerifiedCollectionAddresses(
                  it.verifiedCollectionAddress
                    ? [it.verifiedCollectionAddress]
                    : []
                );
              }
            }}
          >
            <Image
              source={it.image}
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                marginHorizontal: 5,
                borderColor:
                  highlighted === it.id
                    ? theme.colors.primary
                    : theme.colors.secondary,
                borderWidth: 3,
              }}
            />
          </TouchableHighlight>
        </View>
      ))}
    </ScrollView>
  );
}
