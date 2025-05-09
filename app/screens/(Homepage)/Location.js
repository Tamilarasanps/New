import { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import useGeoLocation from "@/app/hooks/GeoLocation";
import Checkbox from "expo-checkbox";
import useApi from "@/app/hooks/useApi";
import DropDownPicker from "react-native-dropdown-picker";

const Location = ({ location, setLocation }) => {
  const [india, setIndia] = useState(false);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [countries] = useState(["India"]);
  const [districtsWithStates, setDistrictsWithStates] = useState([]);
  const { geoCoords, address } = useGeoLocation();
  const { getJsonApi } = useApi();

  const [openState, setOpenState] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("India");

  const inputFields = [
    { key: "country", label: "Country" },
    { key: "region", label: "Region" },
  ];

  // Fetch regions and districts first, then set location
  const fetchIndustries = async () => {
    try {
      const data = await getJsonApi(`CategoryPage`);
      const fetchedRegions = data?.data?.states[0]?.states || [];
      const fetchedDistricts = data?.data?.states[1]?.districts || [];

      setRegions(fetchedRegions);
      setDistrictsWithStates(fetchedDistricts);

      // Now that we have data, set location
      if (address?.state) {
        const matchedRegion = fetchedRegions.find(
          (r) => r.toLowerCase().trim() === address.state.toLowerCase().trim()
        );

        const matchedDistricts = fetchedDistricts
          ?.filter(
            (state) =>
              Object.keys(state)[0].toLowerCase().trim() ===
              address.state.toLowerCase().trim()
          )
          .flatMap((state) => Object.values(state)[0]);

        const matchedDistrict = matchedDistricts?.includes(address.district)
          ? address.district
          : "";

        if (matchedRegion) {
          setLocation({
            coords: geoCoords || "",
            country: address.country || "",
            region: matchedRegion,
            district: matchedDistrict || "",
          });

          setDistricts(matchedDistricts || []);
        }
      }
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  };

  // Fetch initial data once
  useEffect(() => {
    if (address?.country && geoCoords) {
      fetchIndustries();
    }
  }, [address, geoCoords]);

  // When region changes, update districts
  useEffect(() => {
    if (location.region && districtsWithStates.length > 0) {
      const matchedDistricts =
        districtsWithStates
          ?.filter(
            (state) =>
              Object.keys(state)[0].toLowerCase().trim() ===
              location.region.toLowerCase().trim()
          )
          .flatMap((state) => Object.values(state)[0]) || [];

      setDistricts(matchedDistricts);
    }
  }, [location.region]);

  return (
    <View className="relative mt-10">
      {/* Toggle checkbox */}
      <View className="flex flex-row items-center justify-end">
        <View className="flex flex-row items-center">
          <Checkbox
            value={india}
            onValueChange={() => {
              if (!india) {
                setLocation({
                  coords: geoCoords,
                  country: "",
                  region: "",
                  district: "",
                });
              } else {
                fetchIndustries(); // reset to current location
              }
              setIndia(!india);
            }}
            className="w-5 h-5 border-gray-400 cursor-pointer"
            color={india ? "#008080" : undefined}
          />
          <Text className="ml-2 text-gray-700">Other than India</Text>
        </View>
      </View>

      {!india ? (
        <>
          {/* Region (State) Dropdown */}
          <View style={{ zIndex: openState ? 2000 : 1000, marginBottom: 20 }}>
            <Text className="text-lg font-semibold text-teal-600">State</Text>
            <DropDownPicker
              open={openState}
              value={
                regions?.length > 0 && regions.includes(location.region)
                  ? location.region
                  : null
              }
              items={regions?.map((region) => ({
                label: region,
                value: region,
              }))}
              setOpen={setOpenState}
              setValue={(value) =>
                setLocation((prev) => ({
                  ...prev,
                  region: value,
                  district: "", // clear district when region changes
                }))
              }
              setItems={() => {}}
              placeholder="Select State"
              listMode="SCROLLVIEW"
              autoScroll={true}
              style={{
                borderColor: "#D1D5DB",
                height: 50,
                borderRadius: 8,
                paddingHorizontal: 8,
              }}
              dropDownContainerStyle={{
                borderColor: "#D1D5DB",
                backgroundColor: "#fff",
                maxHeight: 200,
              }}
              textStyle={{ color: "#000" }}
              placeholderStyle={{ color: "#9CA3AF" }}
            />
          </View>

          {/* District Dropdown */}
          <View style={{ zIndex: openDistrict ? 2000 : 1000 }}>
            <Text className="text-lg font-semibold text-teal-600">
              District
            </Text>
            <DropDownPicker
              open={openDistrict}
              value={
                districts?.length > 0 && districts.includes(location.district)
                  ? location.district
                  : null
              }
              items={districts?.map((district) => ({
                label: district,
                value: district,
              }))}
              setOpen={setOpenDistrict}
              setValue={(value) =>
                setLocation((prev) => ({
                  ...prev,
                  district: value,
                }))
              }
              setItems={() => {}}
              placeholder="Select District"
              disabled={!location.region}
              listMode="SCROLLVIEW"
              autoScroll={true}
              style={{
                borderColor: "#D1D5DB",
                height: 50,
                borderRadius: 8,
                paddingHorizontal: 8,
              }}
              dropDownContainerStyle={{
                borderColor: "#D1D5DB",
                backgroundColor: "#fff",
                maxHeight: 200,
              }}
              textStyle={{ color: "#000" }}
              placeholderStyle={{ color: "#9CA3AF" }}
            />
          </View>

          {/* Country Dropdown */}
          <Text className="text-lg font-semibold text-teal-600 mt-6">
            Country:
          </Text>
          <View
            style={{
              zIndex: openCountry ? 3000 : 1000,
              marginBottom: 20,
            }}
          >
            <DropDownPicker
              open={openCountry}
              value={selectedCountry}
              items={[{ label: "India", value: "India" }]}
              setOpen={setOpenCountry}
              setValue={setSelectedCountry}
              setItems={() => {}}
              placeholder="Select Country"
              listMode="SCROLLVIEW"
              autoScroll={true}
              disabled={true}
              style={{
                borderColor: "#D1D5DB",
                height: 50,
                borderRadius: 8,
                paddingHorizontal: 8,
                backgroundColor: "#f3f4f6",
              }}
              dropDownContainerStyle={{
                borderColor: "#D1D5DB",
                backgroundColor: "#fff",
              }}
              textStyle={{ color: "#000" }}
              placeholderStyle={{ color: "#9CA3AF" }}
            />
          </View>
        </>
      ) : (
        // Input fields for Other than India
        inputFields.map(({ key, label }) => (
          <View key={key} className="mt-4">
            <Text className="text-lg font-semibold text-teal-600">{label}</Text>
            <TextInput
              className="border border-gray-300 h-[50] rounded-lg w-full p-3 focus:border-teal-600 outline-teal-600"
              placeholder={`Enter your ${label}`}
              value={location[key]}
              onChangeText={(text) => setLocation({ ...location, [key]: text })}
            />
          </View>
        ))
      )}
    </View>
  );
};

export default Location;
