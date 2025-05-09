import { Platform, ScrollView, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/app/context/LoadingContext";
import useApi from "@/app/hooks/useApi";
import All from "@/app/component/(subMenu)/All";
import Banner from "./Banner";
import Recommeded from "./Recommeded";
import Explore from "./Explore";
import GuidePage from "./GuidePage";
import LocationBased from "./LocationBased";
import Contact from "./Contact";
import Footer from "@/app/component/(footer)/Footer";
import Loading from "@/app/component/Loading";
import ImageSlider from "@/app/component/(mobileHeader)/ImageSlider";

export default function HomeScreen() {
  const [pageDetails, setPageDetails] = useState(null);
  const geoCoords = { latitude: 11.0788608, longitude: 76.9327104 };
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
  const { getJsonApi } = useApi();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    startLoading();
    try {
      const queraystring = new URLSearchParams(geoCoords).toString();
      const data = await getJsonApi(`homepage/?${queraystring}`);
      setPageDetails(data.data);
      console.log(data, "data in home page");
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
    <ScrollView>
      {/* {Platform.OS === "web" && <Header />} */}
      {Platform.OS !== "web" && <ImageSlider />}
      {Platform.OS === "web" && <All />}
      {Platform.OS === "web" && <Banner />}
      {pageDetails && (
        <>
          <Recommeded recommendedProducts={pageDetails.recommentedProducts} />
          <Explore categoriesData={[pageDetails.category]} />
        </>
      )}
      {Platform.OS === "web" && <GuidePage />}
      <LocationBased locationProducts={pageDetails.locationProducts} />
      {Platform.OS === "web" && <Contact />}
      {Platform.OS === "web" && <Footer />}
    </ScrollView>
  );
}
