import axios from 'axios';
import initMap from './hooks/use.googleMap';
import { API_KEY } from './config/googleMap.config';
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type GoolgeGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESUlt';
};

async function searchAddressHandler(e: Event) {
  e.preventDefault();
  //send to this to google API
  const enteredAddress = addressInput.value;

  if (API_KEY === undefined) {
    console.log(API_KEY);
    throw Error('API_KEY is Empty!');
  }
  try {
    //Google Maps geocoding API
    const result = await axios.get<GoolgeGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress,
      )}&key=${API_KEY}`,
    );

    if (result.data.status !== 'OK') {
      throw new Error('could not fetch location');
    }
    const coordinates = result.data.results[0].geometry.location;
    await initMap(coordinates);
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener('submit', (e: Event) => searchAddressHandler(e));
