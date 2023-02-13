import { Loader } from '@googlemaps/js-api-loader';
import { API_KEY } from '../config/googleMap.config';

class GoogleMapLoader {
  private static instance: Loader;
  public static getInstance(): Loader {
    if (
      GoogleMapLoader.instance === undefined ||
      GoogleMapLoader.instance === null
    ) {
      GoogleMapLoader.instance = new Loader({
        apiKey: API_KEY ?? '',
        version: 'weekly',
      });
    }
    return GoogleMapLoader.instance;
  }
}

export default GoogleMapLoader;
