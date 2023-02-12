import axios from 'axios';
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

declare const GOOGLE_API_KEY: string | undefined;

type GoolgeGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESUlt';
};

async function searchAddressHandler(e: Event) {
  e.preventDefault();
  //send to this to google API
  const enteredAddress = addressInput.value;

  if (GOOGLE_API_KEY === undefined) {
    throw Error('API_KEY is Empty!');
  }
  try {
    //Google map geocoding API
    const result = await axios.get<GoolgeGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress,
      )}&key=${GOOGLE_API_KEY}`,
    );

    if (result.data.status !== 'OK') {
      throw new Error('could not fetch location');
    }
    const coordinates = result.data.results[0].geometry.location;
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener('submit', (e: Event) => searchAddressHandler(e));
