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
  {"name": "Hoe","class" : "Farming Tools", "classNum" : 1, "preRec" : [0], "grants" : {}, "have" : false, "tier" : 2, "id" : 7}
               ];
function checkTechTree(){
  var valid = [];
  for(var i = 0;i < techTree.length;i++){
    if(techTree[i].preRec.length == 0 && !techTree[i].have){
      valid.push(i);
    }else if(!techTree[i].have){
        var c = 0;
        for(var j = 0; j < techTree[i].preRec.length;j++){
            if(techTree[techTree[i].preRec[j]].have){
                c++;
            }
        }
        if(c == techTree[i].preRec.length){
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