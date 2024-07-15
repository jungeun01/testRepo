import { getXmlToJson } from "../utils/getXmlToJson";

const SERVICE_KEY =
  "imO3TsVMML7i2I5kmLH%2B%2Bhq9hNKjXt6aIg1hMmST4Oi5YtCneeY1HWpOom7xUx%2FFWELNBWEaB9TJbryeyVgaIg%3D%3D";

function getFormattedDate() {
  const today = new Date();
  const isoString = today.toISOString(); //2024-07-15T15:05:35.575z
  // 20240715
  const formattedDate = isoString.split("T")[0].split("-").join("");
  console.log(formattedDate);
  return formattedDate;
}

async function getSunsetRiseData() {
  var xhr = new XMLHttpRequest();
  var url =
    "http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getAreaRiseSetInfo"; /*URL*/
  var queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + SERVICE_KEY; /*Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("locdate") +
    "=" +
    encodeURIComponent(getFormattedDate()); /**/
  queryParams +=
    "&" +
    encodeURIComponent("location") +
    "=" +
    encodeURIComponent("대전"); /**/
  const result = await fetch(url + queryParams);
  const textResult = await result.text();
  const xmlString = new DOMParser().parseFromString(textResult, "text/xml");
  const jsonResult = getXmlToJson(xmlString);
  console.log(jsonResult);

  return jsonResult.response.body.items.item;
}
export { getSunsetRiseData };
