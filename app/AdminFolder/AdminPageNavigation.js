import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHomePage from "./AdminHomePage";
import EditCategory from "./EditCategory";
import createCategory from "./CreateCategory";

export default function AdminPageNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="AdminHomePage">
      <Stack.Screen name="AdminHomePage" component={AdminHomePage} />
      <Stack.Screen name="EditCategory" component={EditCategory} />
      <Stack.Screen name="createCategory" component={createCategory} />
    </Stack.Navigator>
  );
}
