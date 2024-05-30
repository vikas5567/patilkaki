const dateFilter = document.getElementById('date-filter');

dateFilter.addEventListener('change', () => {
  const selectedDate = dateFilter.value;
  const rows = document.querySelectorAll('#financial-data tbody tr');

  rows.forEach((row) => {
    const dateCell = row.querySelector('td:nth-child(2):not([rowspan])');
    const date = dateCell.textContent;

    if (selectedDate!== 'all' && date!== selectedDate) {
      row.style.display = 'none';
    } else {
      row.style.display = '';
    }
  });
});

const tbody = d3.select("#financial-data tbody");

financialData.forEach((data) => {
  const row = tbody.append("tr");

  Object.values(data).forEach((value) => {
    row.append("td").text(value);
  });
});

// Prepare data for the bar chart
const stakeData = [50, 100, 150];

// Set up the bar chart
const chart = d3.select("#chart");
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = +chart.attr("width") - margin.left - margin.right;
const height = +chart.attr("height") - margin.top - margin.bottom;

const x = d3.scaleBand()
 .rangeRound([0, width])
 .padding(0.1);

const y = d3.scaleLinear()
 .rangeRound([height, 0]);

const g = chart.append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(stakeData.map((d, i) => i));
y.domain([0, d3.max(stakeData)]);

g.append("g")
 .attr("class", "axis")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(x));

g.append("g")
 .attr("class", "axis")
 .call(d3.axisLeft(y).tickFormat(d => "$" + d));

g.selectAll(".bar")
 .data(stakeData)
 .enter().append("rect")
   .attr("class", "bar")
   .attr("x", (d, i) => x(i))
   .attr("y", d => y(d))
   .attr("width", x.bandwidth())
   .attr("height", d => height - y(d));