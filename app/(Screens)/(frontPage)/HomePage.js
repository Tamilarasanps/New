import { View, Platform, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Recommeded from "./Recommeded";
import Explore from "./Explore";
import Contact from "./Contact";
import Footer from "./Footer";
import GuidePage from "./GuidePage";
import LocationBased from "./LocationBased";
import Header from "../(header)/Header";
import All from "./All";
import ImageSlider from "../(mobileHeader)/ImageSlider";
import Banner from "./Banner";
import { LoadingContext } from "@/app/context/LoadingContext";
import Loading from "../../Loading";   
import useApi from "@/app/hooks/useApi";

export default function HomePage() {

  const [pageDetails, setPageDetails] = useState(null); // Initial state is null
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
  const { getJsonApi } = useApi();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    startLoading();
    try {
      const data = await getJsonApi(`homepage`);
      console.log("homepage data" + data.data);
      setPageDetails(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };
  console.log(pageDetails)

  if (isLoading || pageDetails === null) {  // Display loading until data is ready
    return <Loading />;
  }

  return (
    <View className="h-[100vh]">
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

        {Platform.OS === "web" ? <GuidePage /> : null}
        <LocationBased />
        {Platform.OS === "web" ? <Contact /> : null}
        {Platform.OS === "web" ? <Footer /> : null}
      </ScrollView>
    </View>
  );
}
