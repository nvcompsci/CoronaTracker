//define variables
let table
let data

function preload() {
  //import covid-19 data as CSV
  table = loadTable('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv','csv','header')
}

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('chart')
  //convert to JSON
  data = Object.values(table.getObject())
  noLoop()
}

function draw() {
  background(220);
  //see all data in console
  console.log(data)

  //filter out only Ohio data
  const data_OH = data.filter(row => row.state == "Ohio")
  
  //draw Ohio data
  drawBars(data_OH)
  createStatesTable()
  updateSummaryData()
}

function createStatesTable() {
  //select table element
  const $table = document.querySelector('section#statesData table')
  
  //filter out only the ~50 rows for the most recent date
  const lastDate = data[data.length-1].date
  const recentData = data.filter(row => row.date == lastDate)
    //order by cases, descending
    .sort( (a,b) => b.cases - a.cases )
  
  //write HTML for each row of data
  const newRowsHTML = recentData.map(row => 
    `<tr>
      <td>${row.state}</td>
      <td>${row.cases}</td>
      <td>${row.deaths}</td>
    </tr>`
  ).join('')
  //add new HTML to the table
  $table.innerHTML += newRowsHTML
}

function drawBars(smallData) {
  const SCALING = 380 / smallData[smallData.length-1].cases
  const SPACING = 400 / smallData.length
  smallData.forEach( (row, i) => {
    const cases = row.cases
    rect(i * SPACING, 400, -5, -cases * SCALING)
  })
}

function submitUserInfo(event) {
  //prevent the page from reloading on submit
  event.preventDefault()

  //create reference to form
  const $userForm = document.querySelector("form#userInfo")

  //create user object with all attributes from form#userInfo
  //note how .value actually gives the user input for that element
  let user = {}
  user.first = $userForm.first.value
  user.last = $userForm.last.value
  user.email = $userForm.email.value
  user.password = $userForm.password.value
  //parseInt() to get integer not string
  user.age = parseInt($userForm.age.value)
  user.gender = $userForm.gender.value

  //or let user = new FormData( $userInfo ) - but this isn't JSON

  //POST on /login
  
  //place user inside package for consistency
  const package = {
    user
    //OR "user": user
  }
  //build the HTTP request
  const config = {
    method: "POST",
    body: JSON.stringify( package ),
    headers: {
        "Content-Type":"application/json"
    }
  }
  //make HTTP request on /login
  fetch("/login",config)
      .then( response => response.json() )
      //just for now...
      .then( response => console.log(response) )
      .catch(err => console.error(err))
}

function updateSummaryData() {
  //variable references to elements in HTML
  //# means id attribute in HTML tag
  const $totalCases = document.querySelector('td#totalCases')
  const $totalDeaths = document.querySelector('td#totalDeaths')
  const $deathRatio = document.querySelector('td#deathRatio')

  $totalCases.innerHTML = calcSummaryData()
  //OR $totalCases.innerHTML = calcSummaryData()
  //OR $totalCases.textContent = 34000 if I had a concrete number
  //TODO calculate other values
}

function calcSummaryData() {
  const lastDate = data[data.length-1].date
  const cases = data
    //include only data from the 1 last date
    .filter( row => row.date == lastDate)
    //sum cases, parse as integers since they are strings
    .reduce( (sum, row) => 
      sum + parseInt(row.cases)
    , 0)
  return cases
  //TODO calculate deaths also
}