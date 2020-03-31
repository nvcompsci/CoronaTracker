let table
let data

function preload() {
  table = loadTable('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv','csv','header')
}

function setup() {
  createCanvas(400, 400);
  data = table.getArray()
  noLoop()
}

function draw() {
  background(220);
  console.log(data)
}