
// DEFINO CTES

const width = 800
const height = 600
const margin = {
    left: 40,
    right: 10,
    top: 10,
    bottom: 40
}

// DECLARO SVG 

const svg = d3.select("#chart").append("svg").attr("id","svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

// ESCALA 

let x = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(0.2)
let y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

// EJES

const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup")
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

//DATOS

d3.csv("tend_samsung_30paises.csv").then(misDatos => {
    misDatos = Object.values(misDatos.smartphone)
     //console.log(misDatos)

//AÑADIR EL DOMINIO DE LA ESCALA

x.domain(misDatos.map(d => d.geoName))
y.domain([0, 100])

  //console.log(misDatos)

//LLAMO A LOS EJES

xAxisGroup.call(xAxis)
yAxisGroup.call(yAxis)


//DATA BINDING


let bars = elementGroup.selectAll("rect").data(misDatos)
    bars.enter().append("rect") 
        .attr("class", "bar")
        .attr("x", d => x(d.geoName))
        .attr("y", d => y(d.smartphone))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.smartphone) - margin.bottom - margin.top)
       
//ANIMACION

svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.Value); })
  .attr("height", function(d) { return height - y(d.Value); })
  .delay(function(d,i){console.log(i) ; return(i*100)})


})




