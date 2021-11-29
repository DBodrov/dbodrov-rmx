const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    console.log('get token API')
    const response = await fetch(
      "https://www.uuidtools.com/api/generate/v1",
      {
        headers: {
          accept: "application/json",
          "cache-control": "no-cache",
        },
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    );
    const token = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: token,
      }),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
