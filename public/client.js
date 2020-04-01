//define variables
let table
let data

function preload() {
  //import covid-19 data as CSV
  table = loadTable('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv','csv','header')
}

function setup() {
  createCanvas(400, 400);
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
}

function drawBars(smallData) {
  const SCALING = 380 / smallData[smallData.length-1].cases
  const SPACING = 400 / smallData.length
  smallData.forEach( (row, i) => {
    const cases = row.cases
    rect(i * SPACING, 400, -5, -cases * SCALING)
  })
}