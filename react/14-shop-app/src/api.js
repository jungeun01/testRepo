import axios from "axios";
import {
  parseFirestoreFields,
  toFirestoreFields,
} from "./utils/firebaseTranslate";

const API_KEY = "AIzaSyB1ajgNrTpNj69VX9KHgQf5WNKhBOLX3CE";

const AUTH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6InlyeHEtUSJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGUuY29tLyIsImF1ZCI6InNob3AtYXBwLThiNTAxIiwiaWF0IjoxNzIzNzk2NjIyLCJleHAiOjE3MjUwMDYyMjIsInVzZXJfaWQiOiI2T0tSUmNldmlVZE5MRElBODZVVnVvZGVjbnAyIiwiZW1haWwiOiJ0ZXN0dXNlcjFAZ21haWwuY29tIiwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIiwidmVyaWZpZWQiOmZhbHNlfQ.NOI1abBVREjJbNBVoMQdklFM8N9L8Rkol-RCnGUfR7y1ywTA9R4VMYclxKLfgNANhkdneuSVaMGm3apnvQiy2dpiZtKErK1ngLZcctNQZRcSIAo_mrfvDqjUrApoSVxQswqbgA_uDj6tz7CVAldDXjLC0l_nOjFu2zTb8SeeiGfUdB2efA-uNz6blrCpYAFrUki4Zd414xK5y_MAfIpFMQlRYjgLXQcVCPbyIeX02n5ANIHHQ3XvwNga4DSkCYZE4QvId1N15ucuV5eFNZZ0v-keROG4MokZEOwKVdgN8u4vp2Fp9ehL3Lh62bcqXB5Rm6Wnz6SIkAlHfjn5kZrKWQ";
const BASE_URL =
  "https://firestore.googleapis.com/v1/projects/shop-app-8b501/databases/(default)/documents";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

function getResultData(response) {
  if (response.data.length > 0) {
    const result = response.data.map((data) => {
      return {
        ...parseFirestoreFields(data.document.fields),
        docId: data.document.name.split("/").pop(),
      };
    });
    return result;
  } else {
    return {
      ...parseFirestoreFields(response.data.fields),
      docId: response.data.name.split("/").pop(),
    };
  }
}

export async function getDatasRest(collectionName, queryOptions) {
  const { conditions } = queryOptions;
  const [condition] = conditions;
  const { field, operator, value } = condition;
  try {
    const response = await api.post(":runQuery", {
      structuredQuery: {
        from: [{ collectionId: collectionName }],
        where: {
          fieldFilter: {
            field: { fieldPath: field },
            op: operator,
            value: { stringValue: value },
          },
        },
      },
    });
    return getResultData(response);
  } catch (error) {
    console.error("데이터 가져오기 오류: ", error);
  }
}

export async function getDataRest(url) {
  // /products/productDocId
  const response = await api.get(url);
  return getResultData(response);
}

export async function addDatasRest(url, addObj) {
  //장바구니에 담기
  try {
    const result = await api.patch(url, { fields: toFirestoreFields(addObj) });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteDatasRest(url) {
  //삭제
  try {
    await api.delete(url);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteDatasRestBatch(url, dataArr) {
  try {
    for (const item of dataArr) {
      const response = await api.delete(`${url}${item.id}`);
    }
    // const requests = dataArr.map((item) => {
    //   return {
    //     delete: `projects/shop-app-8b501/databases/(default)/documents/${url}/${item.id}`,
    //     //   fields:
    //   };
    // });
    // const response = await api.post(
    //   ":batchWrite", //url
    //   { writes: requests }, //body
    //   {
    //     headers: {
    //       Authorization: `Bearer${AUTH_TOKEN}`,
    //     },
    //   } ///????
    // );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
