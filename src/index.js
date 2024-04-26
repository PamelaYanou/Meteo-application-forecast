let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", showSearch);
function showSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-text");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}
