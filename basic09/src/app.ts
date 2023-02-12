const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

function searchAddressHandler(e: Event) {
  e.preventDefault();
  //send to this to google API
  const enteredAddress = addressInput.value;
}

form.addEventListener('submit', (e: Event) => searchAddressHandler(e));
