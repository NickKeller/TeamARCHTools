/**
 * This file sets up the Sexual act chart and Condom use chart and makes them
 * globally available via the actChart and condomChart variables.
 * The script runs on page load of the Discordant Couples assessment.
 */

    var actChart, condomChart;

    window.onload = function() {
        var ctxAct = "actChart";
        var dataAct = {
            labels: [
            ],
            datasets: [{
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    "#FF6384",
                    "#A098DF",
                    "#CBAD98",
                    "#36A2EB",
                    "#A045F6",
                    "#53B301"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#A098DF",
                    "#CBAD98",
                    "#36A2EB",
                    "#A045F6",
                    "#53B301"
                ]
            }]
        };


        actChart = new Chart(ctxAct, {
            type: 'pie',
            data: dataAct,
            options: {
                legend: {
                    position: 'bottom'
                }
            }
        });

        var ctxCondom = "condomChart";
        var dataCondom = {
            labels: [
                "No condom used",
                "Condom broken/slipped",
                "Condom used without errors"
            ],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
        };

        condomChart = new Chart(ctxCondom, {
            type: 'pie',
            data: dataCondom,
            options: {
                legend: {
                    position: 'bottom'
                }
            }
        });
    }
