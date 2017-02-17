/**
 * Created by OrangeJedi on 2/15/2017.
 */
var techTree = [
  {"name": "Farming","class" : "Food", "classNum" : 1, "preRec" : [], "grants" : {}, "have" : false, "tier" : 1, "id" : 0},
  {"name": "Herbs","class" : "Health Care", "classNum" : 1, "preRec" : [], "grants" : {}, "have" : false, "tier" : 1, "id" : 1},
  {"name": "Trails","class" : "Infrastructure", "classNum" : 1, "preRec" : [], "grants" : {}, "have" : false, "tier" : 1, "id" : 2},
  {"name": "Tent","class" : "Housing", "classNum" : 1, "preRec" : [], "grants" : {}, "have" : false, "tier" : 1, "id" : 3},
  {"name": "Chisel","class" : "Tools", "classNum" : 1.2, "preRec" : [], "grants" : {}, "have" : false, "tier" : 1, "id" : 4},
  {"name": "Axe","class" : "Tools", "classNum" : 1.1, "preRec" : [], "grants" : {}, "have" : false, "tier" : 1, "id" : 5},
  {"name": "Woodcutter","class" : "Professions", "classNum" : 1, "preRec" : [], "grants" : {}, "have" : false, "tier" : 1, "id" : 6},
  {"name": "Hoe","class" : "Farming Tools", "classNum" : 1, "preRec" : [0], "grants" : {}, "have" : false, "tier" : 2, "id" : 7},
  {"name": "Millitary","class" : "Military", "classNum" : 1, "preRec" : [[0,2]], "grants" : {}, "have" : false, "tier" : 2, "id" : 8}
               ];
function checkTechTree(){
  var valid = [];
  for(var i = 0;i < techTree.length;i++){
    if(techTree[i].preRec.length == 0 && !techTree[i].have){
      valid.push(i);
    }else if(!techTree[i].have){
        var c = 0;
        var d = techTree[i].preRec.length;
        for(var j = 0; j < techTree[i].preRec.length;j++){
          if(!Array.isArray(techTree[i].preRec[j])){
            if(techTree[techTree[i].preRec[j]].have){
                c++;
            }
          }else{
            d = d + 1;
            var e = 0;
            for(var k = 0; k < techTree[i].preRec[j].length;k++){
              if(techTree[techTree[i].preRec[j][k]].have && e == 0){
                c++;
                e++;
              }
            }
          }
        }
        if(c == d){
            valid.push(i);
        }
    }
  }
  return valid;
}
function updateTechTree(){
  var tech = checkTechTree();
  var list = "";
  for(var i = 0;i < tech.length;i++){
    list = list + "<button onclick='getTech(" + tech[i] + ")'>" + techTree[tech[i]].name + "</button><br>";
  }
  list = list + "";
  $("#tree").html(list);
}
updateTechTree();
function getTech(tech){
    techTree[tech].have = true;
    updateTechTree();
}
