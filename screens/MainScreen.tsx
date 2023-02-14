import React, { useEffect, useState } from "react";
import { Alert, FlatList, FlatListProps, ScrollView } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { v4 as uuid } from "uuid";

import { getActiveListings } from "../api/helius";
import getTokenActivity from "../api/magiceden";
import Header from "../components/Header";
import NFTCard from "../components/NFTCard";
import TopCollections from "../components/TopCollections";
import DetailsModal from "../components/modals/DetailsModal";
import ModalBase from "../components/modals/ModalBase";
import { ActiveListing, Activity } from "../models";

export default function MainScreen() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedNft, setSelectedNft] = useState<ActiveListing | null>(null);
  const [selectedNftDetails, setSelectedNftDetails] = useState<Activity[]>([]);
  const [activeListings, setActiveListings] = useState<ActiveListing[]>([]);
  const [paginationToken, setPaginationToken] = useState<string | null>(null);
  const [firstVerifiedCreators, setFirstVerifiedCreators] = useState<string[]>(
    []
  );
  const [verifiedCollectionAddresses, setVerifiedCollectionAddresses] =
    useState<string[]>([]);

  const onGetActiveListings = async () => {
    setLoading(true);
    const {
      paginationToken: token,
      results,
      error,
    } = await getActiveListings(
      undefined,
      firstVerifiedCreators,
      verifiedCollectionAddresses,
      undefined,
      paginationToken as string
    );

    if (error) {
      console.log("-> error", error);
      setLoading(false);
      Alert.alert("Error", error.message);
      return;
    }

    setLoading(false);
    setActiveListings(results);
    setPaginationToken(token);
  };

  useEffect(() => {
    (async () => {
      if (showDetails && selectedNft) {
        const activities = await getTokenActivity(selectedNft.mint);
        setSelectedNftDetails(activities);
      }
    })();
  }, [showDetails, selectedNft]);

  useEffect(() => {
    (async () => {
      await onGetActiveListings();
    })();
  }, [firstVerifiedCreators, verifiedCollectionAddresses]);

  return (
    <>
      <Header />
      <TopCollections
        setFirstVerifiedCreators={setFirstVerifiedCreators}
        setVerifiedCollectionAddresses={setVerifiedCollectionAddresses}
      />
      <FlatList
        data={activeListings}
        keyExtractor={(item) => item.mint + uuid()}
        onEndReached={() => {
          if (loading) return;
          onGetActiveListings();
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          loading ? (
            <ActivityIndicator
              animating
              color={theme.colors.secondary}
              size="large"
              style={{ height: "100%" }}
            />
          ) : null
        }
        renderItem={({ item }) => (
          <NFTCard
            key={item.mint + uuid()}
            nft={item}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
            selectedNft={selectedNft}
            setSelectedNft={setSelectedNft}
          />
        )}
      />
      {/* <ScrollView>
        {!loading &&
          activeListings.map((item) => (
            <NFTCard
              key={item.mint}
              nft={item}
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              selectedNft={selectedNft}
              setSelectedNft={setSelectedNft}
            />
          ))}

        {loading && (
          <ActivityIndicator
            animating
            color={theme.colors.secondary}
            size="large"
            style={{ height: "100%" }}
          />
        )}
      </ScrollView> */}

      {showDetails && selectedNft && (
        <ModalBase visible={showDetails} setVisible={setShowDetails}>
          <DetailsModal
            selectedNft={selectedNft}
            selectedNftDetails={selectedNftDetails}
          />
        </ModalBase>
      )}
    </>
  );
}
