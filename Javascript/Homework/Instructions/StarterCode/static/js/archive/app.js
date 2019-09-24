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

// grab references to the input element
var date_input = d3.select("#datetime").property(value);
var filterData = data;



// Function to handle input change
//function handleChange(event) {
  // grab the value of the input field
  //var filterData = d3.event.target.value;

//}

//date_input.on("change", handleChange);


// Input fields can trigger a change event when new text is entered.
date_input.on("change", function() {
  var newText = d3.event.target.value;
  console.log(newText);
});


