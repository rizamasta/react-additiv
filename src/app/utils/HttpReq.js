//this copying from my existing project
//takeout interceptions
const axios = require("axios").default;
export const decode = obj => {
  try {
    return new URLSearchParams(obj).toString();
  } catch (error) {
    return false;
  }
};
/**
 * Axios with Method GET
 * @param uri is endpoint from URL
 * @param query is parameter query for get data
 */
export async function RequestGet(uri, query, config) {
  if (query) {
    query = "?" + decode(query);
  }
  var url =
    uri.indexOf("https://") === 0 || uri.indexOf("http://") === 0
      ? uri
      : process.env.REACT_APP_API + uri;
  return await axios.get(url + (query || ""), config);
}
/**
 * Axios with method POST
 * @param uri is endpoint from URL
 * @param data is Object or Form Data
 */
export async function RequestPost(uri, data, config) {
  var url =
    uri.indexOf("https://") === 0 || uri.indexOf("http://") === 0
      ? uri
      : process.env.REACT_APP_API + uri;
  return await axios.post(url, data, config);
}

/**
 * Axios with method PUT
 * @param uri is endpoint from URL
 * @param data is Object or Form Data
 */
export async function RequestPut(uri, data, config) {
  var url =
    uri.indexOf("https://") === 0 || uri.indexOf("http://") === 0
      ? uri
      : process.env.REACT_APP_API + uri;
  return await axios.put(url, data, config);
}

/**
 * Axios with method DELETE
 * @param uri is endpoint from URL
 * @param data is Object or Form Data
 */
export async function RequestDelete(uri) {
  return await axios.delete(process.env.REACT_APP_API + uri);
}
