import { RequestGet } from "app/utils/HttpReq";

export async function getEmployeeData(key) {
  const {
    result: {
      body: { data, error },
    },
  } = await RequestGet("assignment/employees/" + key)
    .then(result => {
      return {
        result: {
          body: { data: result.data, error: null },
        },
      };
    })
    .catch(error => {
      return {
        result: {
          body: { data: null, error: error.message },
        },
        errorJS: error,
      };
    });
  return { data, error };
}
