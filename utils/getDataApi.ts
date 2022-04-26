import axios from "axios";

const API_KEY = "3aa86d938a10214b54013b56089dad10";

const url = "https://gateway.marvel.com:443/v1/public/characters";

class GetDataApi {
  async getData(url: any) {
    try {
      const response = await axios.get(url, {
        params: {
          apikey: API_KEY,
          limit: 100,
        },
      });

      return response.data.data.results;
    } catch (error: any) {
      return false;
    }
  }
}

export const getDataApi = new GetDataApi();
