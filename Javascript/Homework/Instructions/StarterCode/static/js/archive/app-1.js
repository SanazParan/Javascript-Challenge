// from data.js
var tableData = data;

var tbody = d3.select("tbody");

console.log(data);

// // Step 5: Use d3 to update each cell's text with
// // report values (datetime, city, state, country,shape, durationminutes,comments)
data.forEach(function(Report) {
    console.log(Report);
    var row = tbody.append("tr");
    Object.entries(Report).forEach(function([key, value]) {
      console.log(key, value);
     // Append a cell to the row for each value
 //     // in the report object
     var cell = row.append("td");
      cell.text(value);
    });
  });
// Get references to the elements of the DOM
var tbody = d3.Select("tbody");
var dateTimeInput = d3.Select("#datetime");
var searchBtn = d3.Select("#search");
var recordCounter = d3.Select("#recordCounter");
var pages = d3.Select("#pages");
var loadBtn = d3.Select("#load");


// Add event listeners
searchBtn.addEventListener("click", handleSearchButtonClick);
loadBtn.addEventListener("click", handleReloadButtonClick);
pages.addEventListener("change", handlePagesChange);

// Initialize global variables
var filteredData = data;
var count = 0;

// Define Event handler functions

// handlePagesChange renders for new record count selected
function handlePagesChange() {
    renderTable();
}

// handleSearchButtonClick handles search button click:
//    cleans input data
//    checks for non-empty search fields and adds to filter
//    renders table
function handleSearchButtonClick() {
    var filterDate = dateTimeInput.value.trim();

    if (filterDate != "") {
        filteredData = filteredData.filter(function (date) {
        var dataDate = date.datetime;
        return dataDate === filterDate;
    });

    }

    renderTable();
}

// handleReloadButtonClick resets count and search fields, and renders
function handleReloadButtonClick() {
    count = 0;
    filteredData = data;
    dateTimeInput.value = '';
    renderTable();
}


// Provides initial render on open
renderTable();