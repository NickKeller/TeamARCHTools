    window.onload = function() {
        var ctxAct = "actChart";
        var dataAct = {
            labels: [
                "Insertive anal sex",
                "Giving oral sex",
                "Insertive vaginal sex",
                "Receiving oral sex"
            ],
            datasets: [{
                data: [300, 50, 100, 300],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#BBA2EB"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#BBA2EB"
                ]
            }]
        };


        var myPieChart = new Chart(ctxAct, {
            type: 'pie',
            data: dataAct,
            options: {
                legend: {
                    position: 'top'
                }
            }
        });

        var ctxCondom = "condomChart";
        var dataCondom = {
            labels: [
                "HIV",
                "Condoms",
                "Drugs"
            ],
            datasets: [{
                data: [300, 50, 100],
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

        var myPieChart = new Chart(ctxCondom, {
            type: 'pie',
            data: dataCondom
        });
    }
