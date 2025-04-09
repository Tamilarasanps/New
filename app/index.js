// import React from "react";
// import "../global.css"; // Ensure correct path or remove if unnecessary
// import HomePage from "./(Screens)/(frontPage)/HomePage";

// import { Platform } from "react-native";

// import BottomBarNavi from "./src/(navigation)/BottomBarNavi";

// const index = () => {
//   return (
//     <>
//       {Platform.OS === "web" && <HomePage />}
//       {/* {Platform.OS !== "web" && <BottomBarNavigation />} */}
//       {Platform.OS !== "web" && <BottomBarNavi />}
//     </>
//   );
// };

// export default index;
import React from "react";
import HomeScreen from "./(tabs)/src/HomeScreen";
import { Platform } from "react-native";
import BottomNavBar from "./(tabs)/navigation/BottomNavBar";
// import AdminHomePage from "./(Admin)/AdminHomePage";
import HomePageAdmin from "./(Admin)/HomePageAdmin";

export default function App() {
  return (
    <>
      {/* <AdminHomePage /> */}
       {/* <HomePageAdmin /> */}
       {Platform.OS !== "web" && <BottomNavBar />}
       {Platform.OS === "web" && <HomeScreen />}
    </>
  );
}
