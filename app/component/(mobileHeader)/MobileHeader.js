import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  useWindowDimensions,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useApi from "@/app/hooks/useApi";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024;
  const [searchBar, setSearchBar] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const { getJsonApi } = useApi();
  const navigation = useNavigation();
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (searchBar?.length > 0) {
      fetchSearchResult();
    } else {
      setSearchResults([]);
    }
  }, [searchBar]);

  const fetchSearchResult = async () => {
    try {
      const data = await getJsonApi(`homepage/search/${searchBar}`);
      setSearchResults(data.data.structuredResult || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredResults = searchResults.filter((item) =>
    item.toLowerCase().startsWith(searchBar.toLowerCase())
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
    <View className="bg-TealGreen w-full px-4 py-3 " style={{ zIndex: 100 }}>
      <View className="flex-row items-center justify-between ">
        <Text className="text-white text-xl font-bold shrink-0 w-[100px] ">
          Machine Street
        </Text>
        <View
          ref={searchRef}
          className="flex-row bg-white rounded-md items-center flex-1 min-w-0 relative"
          style={{
            maxWidth: isDesktop ? 600 : undefined,
            paddingHorizontal: 10,
          }}
        >
          <TextInput
            className="h-10 flex-1"
            placeholder="Search..."
            value={searchBar}
            onChangeText={(text) => {
              setSearchBar(text);
              setShowResults(text.length > 0);
            }}
            style={{ outline: "none" }}
          />
          <Link href={`/(screen)/ProductList?searchTerms=${searchBar}`} asChild>
            <Pressable className="absolute right-1">
              <Icon name="search" size={20} color="gray" />
            </Pressable>
          </Link>
        </View>

        {/* Right Side Icons */}
        <View className="flex-row items-center gap-14 ">
          {isDesktop ? (
            <>
              <Pressable
                className="bg-red-500 py-2 px-8 rounded-md "
                onPress={() => navigation.navigate("Sell")}
              >
                <Text className="text-white font-semibold text-base">Sell</Text>
              </Pressable>

              <Pressable
                className="items-center"
                onPress={() => {
                  navigation.navigate("Fav");
                }}
              >
                <FontAwesome name="star" size={20} color="white" />
                <Text className="text-white font-semibold text-sm">
                  WishList
                </Text>
              </Pressable>

              <Pressable onPress={() => navigation.navigate("Chat")}>
                <MaterialIcons name="chat" size={40} color="white" />
              </Pressable>

              <Pressable
                className="mr-2"
                onPress={() => navigation.navigate("Profile")}
              >
                <MaterialIcons name="account-circle" size={40} color="white" />
              </Pressable>
            </>
          ) : (
            <Pressable
              onPress={() => setIsOpen(!isOpen)}
              className="shrink-0 ms-2"
            >
              <MaterialIcons name="menu" size={35} color="white" />
            </Pressable>
          )}
        </View>
        {isOpen && (
          <Pressable
            className="absolute inset-0 z-50"
            onPress={() => setIsOpen(false)}
          ></Pressable>
        )}
      </View>
      {showResults && filteredResults?.length > 0 && (
        <View
          className="absolute top-12 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 mt-4"
          style={{
            width: isDesktop ? 605 : "58%",
            marginLeft: isDesktop ? 290 : 100,
          }}
        >
          {filteredResults.slice(0, 10).map((item, index) => (
            <Link
              key={index}
              href={`/(screen)/ProductList?searchTerms=${item}`}
              asChild
            >
              <Pressable className="px-4 py-2 hover:bg-gray-200">
                <Text className="text-gray-800 font-semibold">{item}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      )}
      {!isDesktop && isOpen && (
        <View className="absolute right-2 top-[60px] bg-gray-300 p-4 w-[250px] p-2 rounded-sm shadow-lg">
          <Pressable
            onPress={() => {
              navigation.navigate("Fav");
              setIsOpen(false);
            }}
          >
            <View className="flex flex-row items-center space-x-4 p-4 bg-gray-100 rounded-sm mb-2 ">
              <FontAwesome name="star" size={35} color="teal" />
              <Text className="text-gray-500 font-semibold text-lg ms-2">
                WishList
              </Text>
            </View>
          </Pressable>

          <Pressable
            className="flex flex-row items-center space-x-4 p-4 bg-gray-100 rounded-sm mb-2"
            onPress={() => {
              navigation.navigate("Chat");
              setIsOpen(false);
            }}
          >
            <MaterialIcons name="chat" size={35} color="teal" />
            <Text className="text-gray-500 font-semibold text-lg ms-2">
              Message
            </Text>
          </Pressable>

          <Pressable
            className="flex flex-row items-center space-x-3 p-4 bg-gray-100 rounded-sm mb-2"
            onPress={() => {
              navigation.navigate("Profile");
              setIsOpen(false);
            }}
          >
            <MaterialIcons name="account-circle" size={35} color="teal" />
            <Text className="text-gray-500 font-semibold text-lg ms-2">
              Profile
            </Text>
          </Pressable>

          <Pressable
            className="bg-red-500 py-2 px-6 rounded-md mb-2"
            onPress={() => {
              navigation.navigate("Sell");
              setIsOpen(false);
            }}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Sell
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
