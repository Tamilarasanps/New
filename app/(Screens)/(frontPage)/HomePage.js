import { View, Platform, ScrollView, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Recommeded from "./Recommeded";
import Explore from "./Explore";
import Contact from "./Contact";
import Footer from "./Footer";
import GuidePage from "./GuidePage";
import LocationBased from "./LocationBased";
import * as Location from "expo-location";
import Header from "../(header)/Header";
import All from "./All";
import ImageSlider from "../(mobileHeader)/ImageSlider";
import Banner from "./Banner";
import { LoadingContext } from "@/app/context/LoadingContext";
import Loading from "../../Loading";
import useApi from "@/app/hooks/useApi";
import { SafeAreaView } from "react-native-safe-area-context";
import useGeoLocation from "@/app/hooks/GeoLocation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage() {
  const [pageDetails, setPageDetails] = useState(null);
  const { geoCoords } = useGeoLocation(); // ✅ Correct hook usage
console.log("geoCoords :", geoCoords)
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
  const { getJsonApi } = useApi();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    startLoading();
    try {
      const data = await getJsonApi(`homepage/?lat=${String(geoCoords.latitude)}&lng=${String(geoCoords.longitude)}`);
      console.log(data)
      setPageDetails(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  if (isLoading || pageDetails === null) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="h-[100vh]">
      <ScrollView>
        {Platform.OS === "web" && <Header />}
        {Platform.OS === "web" && <All />}
        {Platform.OS === "web" && <Banner />}

        {Platform.OS !== "web" && <ImageSlider />}

        {pageDetails && (
          <>
            <Recommeded recommendedProducts={pageDetails.recommentedProducts} />
            <Explore categoriesData={[pageDetails.category]} />
          </>
        )}

        
        {Platform.OS === "web" && <GuidePage />}
        <LocationBased />
        {Platform.OS === "web" && <Contact />}
        {Platform.OS === "web" && <Footer />}
      </ScrollView>
    </SafeAreaView>
  );
}
