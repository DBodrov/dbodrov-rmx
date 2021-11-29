const uuid = require('uuid');

exports.handler = async (event, context) => {
    const token = uuid.v4();
    console.log('token :', token)

    return {
      statusCode: 200,
      body: JSON.stringify({data: token})
    }
};
