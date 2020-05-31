let datasetArr = [
  {
    backgroundColor: "rgba(163, 161, 251)",
    borderColor: "rgba(163, 161, 251)",
    borderWidth: 1,
    hoverBackgroundColor: "rgba(163, 161, 251, 0.8)",
    hoverBorderColor: "rgba(163, 161, 251, 0.8)",
    data: [20,50,80,60]
  }
]

export const ChartData = {
  labels: ['Starters', 'Main Course', 'Dessert', 'Drinks'],
  datasets: datasetArr
}

export const ChartOptions = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
    position: 'top',
  },
  
  type: "bar",
  layout: {
    padding: {
      left: 20
    }
  },
  scales: {
    xAxes: [{
      ticks: {
        autoSkip: false,
        maxRotation: 33,
        minRotation: 0
      },
      // barThickness: 16,
       maxBarThickness: 50
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true

      }
    }]
  }
}