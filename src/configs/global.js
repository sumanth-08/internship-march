const RESPONSE = {
  SUCCESS: {
    code: 200,
    message: "Everything worked as expected",
  },
  UNKNOWN_ERROR: {
    code: 500,
    message: "Something went worng!",
  },
  REQUIRED_PARAMS: {
    code: 201,
    message: "is required params",
  },

  NO_DATA: {
    code: 202,
    message: "no data found",
  },
};

export default RESPONSE;
