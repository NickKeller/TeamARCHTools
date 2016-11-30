    var actChart, condomChart;

    window.onload = function() {
        var ctxAct = "actChart";
        var dataAct = {
            labels: [
                "Insertive vaginal sex",
                "Receiving vaginal sex",
                "Receiving oral sex",
                "Giving oral sex",
                "Receiving anal sex",
                "Insertive anal sex"
            ],
            datasets: [{
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    "#FF6384",
                    "#A098DF",
                    "#CBAD98",
                    "#36A2EB",
                    "#FFCE56",
                    "#BBA2EB"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#A098DF",
                    "#CBAD98",
                    "#36A2EB",
                    "#FFCE56",
                    "#BBA2EB"
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
                "Condom used, but used incorrrectly OR the condom broke/slipped during use",
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
            data: dataCondom
        });
    }
