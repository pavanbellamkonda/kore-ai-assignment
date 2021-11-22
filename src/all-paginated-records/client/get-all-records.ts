/**
 * Source of fake api
 * https://www.instantwebtools.net/fake-rest-api#read-passenger-paginated
 */

const listElement = document.getElementById('passenger-list');

getAllRecords();

async function getAllRecords() {
  let totalPages = 0;
  let totalPassengers = 0;
  let currentPage = 0;
  const size = 4000;
  const allPassengers: Passenger[] = [];
  do {
    const rawRespnse = await fetch(createPaginationUrl(currentPage, size));
    const response: GetPassengersResponse = await rawRespnse.json();
    ({ totalPages, totalPassengers } = response);
    currentPage++;
    allPassengers.push(...response.data);
    updateList(response.data);
  } while (currentPage <= totalPages)
  console.log({ totalPages, totalPassengers, allPassengers });
}

function updateList(passengers: Passenger[]) {
  if (!listElement) return;
  passengers.forEach(passenger => {
    const newLi = document.createElement('li');
    newLi.appendChild(document.createTextNode(passenger.name));
    listElement.appendChild(newLi);
  });
}

function createPaginationUrl(page, size) {
  const passengersUrl = 'https://api.instantwebtools.net/v1/passenger';
  return `${passengersUrl}?page=${page}&size=${size}`;
}


interface GetPassengersResponse {
  totalPassengers: number;
  totalPages: number;
  data: Passenger[];
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: any[];
}

