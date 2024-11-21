// netlify/functions/proxy.js
const axios = require('axios');

exports.handler = async function(event, context) {
  const { url } = event.queryStringParameters;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No URL provided' }),
    };
  }

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',  
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: response.data.toString('base64'), 
      isBase64Encoded: true,  
    };
  } catch (error) {
    console.error('Error fetching image:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching image' }),
    };
  }
};
