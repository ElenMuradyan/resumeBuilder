const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],  
}));

app.get('/proxy', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',  
    });

    res.set('Content-Type', 'image/jpeg'); 
    res.send(response.data);  
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Error fetching image' });
  }
});

app.listen(3000, () => {
  console.log('Proxy server running at http://localhost:3000');
});
