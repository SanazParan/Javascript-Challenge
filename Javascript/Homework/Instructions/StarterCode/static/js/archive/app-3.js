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
var cityInput = d3.Select("#city");
var stateInput = d3.Select("#state");
var countryInput = d3.Select("#country");
var shapeInput = d3.Select("#shape");
var searchBtn = d3.Select("#search");
var recordCounter = d3.Select("#recordCounter");
var pages = d3.Select("#pages");
var loadBtn = d3.Select("#load");
var nextBtn = d3.Select("#next");
var prevBtn = d3.Select("#prev");

// Add event listeners
searchBtn.addEventListener("click", handleSearchButtonClick);
loadBtn.addEventListener("click", handleReloadButtonClick);
nextBtn.addEventListener("click", handleNextButtonClick);
prevBtn.addEventListener("click", handlePrevButtonClick);
pages.addEventListener("change", handlePagesChange);

// Initialize global variables
var filteredData = data;
var count = 0;

// Define Event handler functions
// handleNextButtonClick increments count and renders
function handleNextButtonClick() {
    count++;
    renderTable();
}
// handlePrevButtonClick decrements count and renders
function handlePrevButtonClick() {
    count--;
    renderTable();
}

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
    var filterCity = cityInput.value.trim().toLowerCase();
    var filterState = stateInput.value.trim().toLowerCase();
    var filterCountry = countryInput.value.trim().toLowerCase();
    var filterShape = shapeInput.value.trim().toLowerCase();

    if (filterDate != "") {
        filteredData = filteredData.filter(function (date) {
        var dataDate = date.datetime;
        return dataDate === filterDate;
    });

    }

    if (filterCity != "") {
        filteredData = filteredData.filter(function (city) {
        var dataCity = city.city;
        return dataCity === filterCity;
    });
    }

    if (filterState != "") {
        filteredData = filteredData.filter(function (state) {
            var dataState = state.state;
            return dataState === filterState;
        });
    }

    if (filterCountry != "") {
        filteredData = filteredData.filter(function (country) {
            var dataCountry = country.country;
            return dataCountry === filterCountry;
        });
    }

    if (filterShape != "") {
        filteredData = filteredData.filter(function (shape) {
            var dataShape = shape.shape;
            return dataShape === filterShape;
        });
    }

    renderTable();
}

// handleReloadButtonClick resets count and search fields, and renders
function handleReloadButtonClick() {
    count = 0;
    filteredData = data;
    dateTimeInput.value = '';
    cityInput.value = '';
    stateInput.value = '';
    countryInput.value = '';
    shapeInput.value = '';

    renderTable();
}

// Define renderTable function
function renderTable() {
    // clear previously rendered table
    tbody.innerHTML = "";

    // Get number of records to be rendered
    var pages = Number(document.getElementById("pages").value);

    // Initialize local variables
    var start = count * pages + 1;
    var end = start + pages - 1;
    var btn;

    // Adjusts records displayed for end of data and state of Next button
    if (end > filteredData.length) {
      end = filteredData.length;
      btn = document.getElementById("next");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("next");
      btn.disabled = false;
    }

    // Adjusts state of Previous button
    if (start == 1) {
      btn = document.getElementById("prev");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("prev");
      btn.disabled = false;
    }

    // Displays record counts and loads records into table
    recordCounter.innerText = "From Record: " + start + " to: " + end + " of " + filteredData.length;
    // Outer loop loads specified number of records
    for (var i = 0; i < pages; i++) {
        var item = filteredData[i+(count * pages)];
        var fields = Object.keys(item);
        var row = tbody.insertRow(i);
        // Inner loop loads fields in record
        for (var j = 0; j < fields.length; j++) {
            var field = fields[j];
            var cell = row.insertCell(j);
            cell.innerText = item[field];
        }
    }
}

// Provides initial render on open
renderTable();