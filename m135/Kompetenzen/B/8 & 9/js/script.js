const dropdown = document.getElementById('dropdown');
const outputContainer = document.getElementById('outputContainer');

async function getData() {
  try {
    fetch('https://gibm.becknet.ch/warenhaus/getFiliale.php')
    .then(response => response.text())
    .then(data => {dropdown.innerHTML = data;});
   
  
  } catch (error) {
    console.error('Error fetching options:', error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  dropdown.addEventListener('change', function() {
    const selectedShop = dropdown.value;
    fetch('https://gibm.becknet.ch/warenhaus/getFiliale.php?filiale=' + selectedShop)
    .then(response => response.text())
    .then(data => {outputContainer.innerHTML = data;});
  });
  getData();
});