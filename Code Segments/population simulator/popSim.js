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
        "cbr" : 40
    }
};
function start() {
    game.pop.data.push(new PopSeg(-1,100));
    tick();
}
function tick(){
    var popSize = 0;
    var pmdM = [0,0,0,0,0,0,0,0,0,0,0,0];
    var pmdF = [0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i = 0;i < game.pop.data.length;i++){
        game.pop.data[i].age++;
        popSize += game.pop.data[i].size;
        if(game.pop.data[i].age < 55) {
            pmdM[Math.floor(game.pop.data[i].age / 5)] -= game.pop.data[i].male;
            pmdF[Math.floor(game.pop.data[i].age / 5)] += game.pop.data[i].female;
        }
    }

    for(i = 0;i < pmdM;i++){
        pmdM[i] = pmdM[i] / popSize;
        pmdF[i] = pmdF[i] / popSize;
    }

    game.pop.data.push(new PopSeg(0,Math.floor(popSize * game.demo.cbr / 1000)));

    game.pop.size = popSize;
    game.pop.pmd.male = pmdM.reverse();
    game.pop.pmd.female = pmdF.reverse();
    printOut();
    setTimeout(tick,1000);
}
function printOut(){
    $('#output').text(game.pop.data[0].age + "  " + game.pop.size);
    var max = 60;
    var mPMD = new Chart(ctxM, {
        type: 'horizontalBar',
        data: {
            yLabels: game.pop.lables,
            datasets: [{
                data: game.pop.pmd.male,
                backgroundColor: [
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
    this.male = Math.floor(size * (Math.floor((Math.random() * 10) + 45) / 100));
    this.female = size - this.male;
    this.edu = 0;
}
var ctxM = document.getElementById("malePMD");
var ctxF = document.getElementById("femalePMD");