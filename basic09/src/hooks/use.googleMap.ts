import GoogleMapLoader from '../models/googleMap.model';

interface location {
  lat: number;
  lng: number;
}
async function initMap(location: location): Promise<boolean> {
  //Google Maps JS API
  const loadMap = await GoogleMapLoader.getInstance().load();
  const mapOption: { center: location; zoom: number } = {
    center: location,
    zoom: 15,
  };
  const map = new loadMap.maps.Map(
    document.getElementById('map') as HTMLElement,
    mapOption,
  );
  //마커추가
  new loadMap.maps.Marker({
    position: location,
    map: map,
  });

  return true;
}

export default initMap;
