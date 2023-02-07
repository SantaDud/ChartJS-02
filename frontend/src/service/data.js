export async function getCovidData() {
  try {
    // Use the fetch api method to get the data of the covid cases
    const response = await fetch("http://localhost:2001/covid-api");
    // Return the data in json format
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getColdData() {
  try {
    // Use the fetch api method to get the data of the cold cases
    const response = await fetch("http://localhost:2001/cold-api");
    // Return the data in json format
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getFluData() {
  try {
    // Use the fetch api method to get the data of the flu cases
    const response = await fetch("http://localhost:2001/flu-api");
    return await response.json();
    // Return the data in json format
  } catch (error) {
    console.log(error);
  }
}
