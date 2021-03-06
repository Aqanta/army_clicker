/**
 * Created by OrangeJedi on 2/20/2017.
 */
var game = {
    "pop" : {
        "size" : 0,
        "data" : [],
        "pmd" : {},
        "lables" :["105+","100-104","95-99","80-84","75-79","70-74","65-69","60-64","55-59","50-54","45-49","40-44","35-39","30-34","25-29","20-24","15-19","10-14","5-9","0-4"]
    },
    "demo" :{
        "cbr" : 11,
        "cdr" : 10
    }
};
function start() {
    //game.pop.data.push(new PopSeg(-1,100));
    var startingPop = 1000;
    for(var i = 0;i < 34;i++){
        game.pop.data.push(new PopSeg(i, ((startingPop/5)/5)));
    }
    tick();
}
function tick(){
    var popSize = 0;
    var pmdM = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var pmdF = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i = 0;i < game.pop.data.length;i++){
        //ages population
        game.pop.data[i].age++;
        //build population pmd data
        if(game.pop.data[i].age < 105) {
            pmdM[Math.floor(game.pop.data[i].age / 5)] -= game.pop.data[i].male;
            pmdF[Math.floor(game.pop.data[i].age / 5)] += game.pop.data[i].female;
        }else{
            pmdM[20] -= game.pop.data[i].male;
            pmdF[20] += game.pop.data[i].female;
        }
        //kills off population
       var d = Math.floor(game.pop.data[i].size * ((game.demo.cdr / 1000) * (1 + (game.pop.data[i].age))));
        var rando = Math.floor((Math.random() * 2));
        for(var j = 0;j < d;j++) {
            if (rando == 1 && game.pop.data[i].male > 0) {
                game.pop.data[i].male--;
                rando = 0;
            } else if (rando == 0 && game.pop.data[i].female > 0) {
                game.pop.data[i].female--;
                rando = 1;
            }
        }
        game.pop.data[i].size = game.pop.data[i].male + game.pop.data[i].female;

        //totals up population
        popSize += game.pop.data[i].size;
        //removes blank pop
        if(game.pop.data[i].size == 0){
            game.pop.data.splice(i,1);
        }
    }
	game.pop.data.push(new PopSeg(0,Math.floor(popSize * (game.demo.cbr / 1000))));

    console.log(game.pop.data.length);

    for(i = 0;i < pmdM.length;i++){
        pmdM[i] = pmdM[i] / popSize;
        pmdF[i] = pmdF[i] / popSize;
    }

    game.pop.size = popSize;
    game.pop.pmd.male = pmdM.reverse();
    game.pop.pmd.female = pmdF.reverse();
    printOut();
    setTimeout(tick,250);
}
function printOut(){
    $('#output').text(game.pop.data[0].age + "  " + game.pop.size);
    var max = .15;
    var mPMD = new Chart(ctxM, {
        type: 'horizontalBar',
        data: {
            yLabels: game.pop.lables,
            datasets: [{
                data: game.pop.pmd.male,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    position: "left"
                }],
                xAxes: [{
                    ticks: {
                    min : -1 * max
                    }
                }]
            },
            legend : {
                display : false
            },
            tooltip : {
                display : false
            },
            animation : {
                duration : 0
            }
        }
    });
    var fPMD = new Chart(ctxF, {
        type: 'horizontalBar',
        data: {
            yLabels: game.pop.lables,
            datasets: [{
                data: game.pop.pmd.female,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true

                    },
                    position: "right"
                }],
                xAxes: [{
                    ticks: {
                        max : max
                    }
                }]
            },
            legend : {
                display : false
            },
            tooltip : {
                display : false
            },
            animation : {
                duration : 0
            }

        }
    });
}
function PopSeg(age,size){
    this.age = age;
    this.size = size;
    this.male = Math.floor(size * (Math.floor((Math.random() * 3) + 49) / 100));
    this.female = size - this.male;
    this.edu = 0;
}
function foo(){
    var total = 0;
    for(var i = 0;i < 10000000000;i++){
        total += Math.floor((Math.random() * 2));
    }
    return total / 100000000;
}
var ctxM = document.getElementById("malePMD");
var ctxF = document.getElementById("femalePMD");
