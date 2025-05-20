import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavBar from "./BottomNavBar";
import LandingPage from "@/app/screens/LandingPage";
import MechanicList_2 from "@/app/mechanicApp/MechanicList_2";
import ProfileScreen from "@/app/screens/(profile)/ProfileScreen";
// import BottomNavBar from "./path/to/BottomNavBar";

const Stack = createStackNavigator();

export default function StackApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={LandingPage} />
        <Stack.Screen name="MechanicProfiles" component={MechanicList_2} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        {/* Add other screens here if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
