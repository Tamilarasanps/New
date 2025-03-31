import axios from "axios";

const API_url_product = "http://192.168.1.5:5000/homepage";
const API_url_SEARCH = "http://192.168.1.5:5000/homepage/searchResult";

export const getAllProduct = async () => {
  try {
    const response = await axios.get(API_url_product);
    console.log("API Response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      success: false,
      message: "Failed to fetch products",
      data: [],
      errorDetails: error?.response || error.message, 
    };
  }
};

export const getProductById = async () => {
  try {
    const response = await axios.get(API_url_product, {
      headers: { "content-type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("error on product", error);
    throw error;
  }
};

export const getSearchResult = async () => {
  try {
    const response = await axios.get(API_url_SEARCH, {
      headers: { "content-type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("serach is not come", error);
    throw error;
  }
};
