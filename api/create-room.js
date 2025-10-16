const { Daily } = require('@daily-co/daily-js');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const daily = Daily({ 
      apiKey: '46ee5e47e60c855179a8218ae8e831fb8e735f40b139170e93a2b1fa76ac106e'
    });
    
    const room = await daily.createRoom({
      properties: {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
        enable_chat: true,
        enable_screenshare: true,
        start_audio_off: false,
        start_video_off: false,
      }
    });

    console.log('Room created:', room.url);
    
    res.status(200).json({
      success: true,
      roomUrl: room.url,
      roomName: room.name
    });
    
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};