import { MMKV } from "react-native-mmkv";

export async function getIconsStorage() {
    const storage = new MMKV();
    let response: any = {data: [], error: null, isSuccess: false};
    const result = storage.getString('icons');
  
    if (result) {
      response.isSuccess = true;
      response.data = result ? JSON.parse(result) : [];
    } else {
      response.error = 'error';
    }
    return response;
  }