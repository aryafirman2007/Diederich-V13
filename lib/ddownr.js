import axios from 'axios';

const formatAudio = [ 'mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav', '4k' ];
const formatVideo = [ '360', '480', '720', '1080', '1440' ];

const ddownr = {
  download: async (url, format) => {
    try {
      const response = await axios.get(`https://p.oceansaver.in/ajax/download.php?copyright=0&format=${format}&url=${url}`, {
        headers: {
          'User-Agent': 'MyApp/1.0',
          'Referer': 'https://ddownr.com/enW7/youtube-video-downloader'
        }
      });
    
      const data = response.data;
      const media = await ddownr.cekProgress(data.id);
      return {
        success: true,
        format: format,
        title: data.title,
        thumbnail: data.info.image,
        downloadUrl: media
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      return { success: false, message: error.message };
    }
  },
  cekProgress: async (id) => {
    try {
      const progressResponse = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
        headers: {
          'User-Agent': 'MyApp/1.0',
          'Referer': 'https://ddownr.com/enW7/youtube-video-downloader'
        }
      });

      const data = progressResponse.data;

      if (data.progress === 1000) {
        return data.download_url;
      } else {
        console.log('Masih belum selesai wak 😂, sabar gw cek lagi...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return ddownr.cekProgress(id);
      }
      return await ddownr.cekProgress(id);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      return { success: false, message: error.message };
    }
  }
}

export { ddownr };
/*
const axios = require('axios');

const formatAudio = [ 'mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav', '4k' ];
const formatVideo = [ '360', '480', '720', '1080', '1440' ];

const ddownr = {
  download: async (url, format) => {
    try {
      const response = await axios.get(`https://p.oceansaver.in/ajax/download.php?copyright=0&format=${format}&url=${url}`, {
        headers: {
          'User-Agent': 'MyApp/1.0',
          'Referer': 'https://ddownr.com/enW7/youtube-video-downloader'
        }
      });
    
      const data = response.data;
      const media = await ddownr.cekProgress(data.id);
      return {
        success: true,
        format: format,
        title: data.title,
        thumbnail: data.info.image,
        downloadUrl: media
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      return { success: false, message: error.message };
    }
  },
  cekProgress: async (id) => {
    try {
      const progressResponse = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
        headers: {
          'User-Agent': 'MyApp/1.0',
          'Referer': 'https://ddownr.com/enW7/youtube-video-downloader'
        }
      });

      const data = progressResponse.data;

      if (data.progress === 1000) {
        return data.download_url;
      } else {
        console.log('Masih belum selesai wak 😂, sabar gw cek lagi...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return ddownr.cekProgress(id);
      }
      return await ddownr.cekProgress(id);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      return { success: false, message: error.message };
    }
  }
}

module.exports = { ddownr };
*/