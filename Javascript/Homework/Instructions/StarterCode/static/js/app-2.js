// from data.js
var tableData = data;

// YOUR CODE HERE!
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



var submit = d3.select("#submit");

// function to take input and recreate table
submit.on("click", function() {
  // stops page from refreshing
  d3.event.preventDefault();

  d3.select(".summary").html("");

  // user input as variable
  var inputDate = d3.select("#datetime").property("value");
  var inputCity = d3.select("#city").property("value");

  // Filter Data
  var filteredData = tableData.filter(tableData => tableData.datetime === inputDate);
  var filteredData1 = tableData.filter(tableData => tableData.city === inputCity);
  // loop through
  filteredData.forEach((dateData) => {
    var row = tbody.append("tr");
    Object.entries(dateData).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });

  filteredData1.forEach((dateData) => {
    var row = tbody.append("tr");
    Object.entries(dateData).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });
});






