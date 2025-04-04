import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  useWindowDimensions,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Divider } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useApi from "@/app/hooks/useApi";
import Icon from "react-native-vector-icons/Feather";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();
  const screen = width > 1024;
  const [searchBar, setSearchBar] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const { getJsonApi } = useApi();

  useEffect(() => {
    if (searchBar.length > 0) {
      fetchSearchResult();
    } else {
      setSearchResults([]);
    }
  }, [searchBar]);

  const fetchSearchResult = async () => {
    try {
      const data = await getJsonApi(`homepage/search/${searchBar}`);
      console.log("Fetched Data:", data);

      if (data?.data?.structuredResult) {
        setSearchResults(data.data.structuredResult);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search API Error:", err);
    }
  };

  const filteredResults = searchResults.filter((item) =>
    item?.toLowerCase().startsWith(searchBar.toLowerCase())
  );

  useEffect(() => {
    if (Platform.OS === "web") {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setShowResults(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  return (
    <View
      className="bg-TealGreen w-full z-50 px-4 py-3"
      style={{ position: "sticky", top: 0 }}
    >
      <View
        className={`flex-row items-center ${
          screen ? "justify-between" : "gap-4"
        } `}
      >
        <Text className="text-white text-xl font-bold md:text-2xl">
          Machine Street
        </Text>

        {/* Search Bar */}
        <View ref={searchRef} className="relative">
          <View
            className="flex-row bg-white rounded-sm"
            style={{ width: screen ? 600 : 200 }}
          >
            <TextInput
              className="px-3 h-10 w-full"
              placeholder="Search..."
              value={searchBar}
              onChangeText={(text) => {
                setSearchBar(text);
                setShowResults(text.length > 0);
              }}
            />
            <Link
              href={`/(Screens)/(screen)/ProductList?searchTerms=${searchBar}`}
              asChild
            >
              <Pressable className="absolute right-2 top-2">
                <Icon name="search" size={20} color="red" />
              </Pressable>
            </Link>
          </View>

          {showResults && filteredResults.length > 0 && (
            <View className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
              {filteredResults.slice(0, 10).map((item, index) => (
                <Link
                  key={index}
                  href={`/(Screens)/(screen)/ProductList?searchTerms=${item}`}
                  asChild
                >
                  <Pressable className="px-4 py-2 hover:bg-gray-200">
                    <Text className="text-gray-800 font-semibold">{item}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          )}
        </View>

        {screen ? (
          <View className="flex flex-row gap-6 space-x-4">
            <Link href={"/(Screens)/(sell)/Sell"} asChild>
              <Pressable className="bg-red-500 py-2 px-6 rounded-md h-10">
                <Text className="text-white text-center text-lg font-semibold">
                  Sell
                </Text>
              </Pressable>
            </Link>
            <Link href={"/(Screens)/(screen)/Fav"} asChild>
              <Pressable>
                <FontAwesome name="star" size={20} color="white" />
                <Text className="text-white text-center text-md font-semibold">
                  WishList
                </Text>
              </Pressable>
            </Link>
            <Link href={"/(Screens)/(chat)/Chat"}>
              <Pressable>
                <MaterialIcons name="chat" size={40} color="white" />
              </Pressable>
            </Link>
            <Pressable
              onPress={() => router.push("/(Screens)/Profile/Profile")}
            >
              <MaterialIcons name="account-circle" size={40} color="white" />
            </Pressable>
          </View>
        ) : (
          <View
            className={`absolute right-0 top-[60px] bg-white w-[250px] p-2 rounded-sm shadow-lg ${
              isOpen ? "flex" : "hidden"
            }`}
          >
            <Link href={"/(Screens)/(screen)/Fav"} asChild>
              <Pressable className="flex flex-row items-center space-x-4 p-4 bg-gray-100 rounded-sm mb-2">
                <FontAwesome name="star" size={20} color="teal" />
                <Text className="text-gray-500 font-semibold text-lg">
                  WishList
                </Text>
              </Pressable>
            </Link>
            <Link href={"/(Screens)/(chat)/Chat"}>
              <Pressable className="flex flex-row items-center space-x-4 p-4 bg-gray-100 rounded-sm mb-2">
                <MaterialIcons name="chat" size={30} color="teal" />
                <Text className="text-gray-500 font-semibold text-lg">
                  Message
                </Text>
              </Pressable>
            </Link>
            <Link href="/(Screens)/Profile/Profile">
              <Pressable className="flex flex-row items-center space-x-3 p-4 bg-gray-100 rounded-sm mb-2">
                <MaterialIcons name="account-circle" size={40} color="teal" />
                <Text className="text-gray-500 font-semibold text-lg">
                  Profile
                </Text>
              </Pressable>
            </Link>
            <Divider />
            <Link href={"/(components)/Client/(sell)/Sell"} asChild>
              <Pressable className="bg-red-500 py-2 px-6 rounded-md mb-2">
                <Text className="text-white text-center text-lg font-semibold">
                  Sell
                </Text>
              </Pressable>
            </Link>
          </View>
        )}
        {!screen && (
          <Pressable
            className="absolute right-0"
            onPress={() => setIsOpen(!isOpen)}
          >
            <MaterialIcons name="menu" size={50} color="black" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
