import { View, Platform, ScrollView, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Recommeded from "../../(frontPage)/Recommeded";
import Explore from "../../(frontPage)/Explore";
import Contact from "../../(frontPage)/Contact";
import Footer from "../../(frontPage)/Footer";
import GuidePage from "../../(frontPage)/GuidePage";
import LocationBased from "../../(frontPage)/LocationBased";

import All from "../../(frontPage)/All";

import Banner from "../../(frontPage)/Banner";
import { LoadingContext } from "@/app/context/LoadingContext";
import Loading from "../../(tabs)/Loading";
import useApi from "@/app/hooks/useApi";
import { SafeAreaView } from "react-native-safe-area-context";
import useGeoLocation from "@/app/hooks/GeoLocation";
import Imageslider from "../../(mobileHeader)/ImageSlider";
import Header from "@/app/(header)/Header";

export default function HomeScreen() {
  const [pageDetails, setPageDetails] = useState(null);
  const { geoCoords } = useGeoLocation(); // ✅ Correct hook usage
  // console.log("geoCoords :", geoCoords);
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
  const { getJsonApi } = useApi();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    startLoading();
    try {
      // const data = await getJsonApi(
      //   `homepage/?lat=${String(geoCoords.latitude)}&lng=${String(
      //     geoCoords.longitude
      //   )}`
      // );
      // console.log(data)

      const queraystring = new URLSearchParams(geoCoords).toString();
      const data = await getJsonApi(`homepage/?${queraystring}`);
      setPageDetails(data.data);
      console.log(queraystring);
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

        {Platform.OS !== "web" && <Imageslider />}

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
