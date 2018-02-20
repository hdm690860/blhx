var _ = require('underscore')
//处理skill技能
exports.skill = function(obj){
	var skill=[]
	var skillname=[]
	var skillmain=[]
	var objskill=_.pick(obj, 'skillname1', 'skillmain1','skillname2', 'skillmain2','skillname3', 'skillmain3','skillname4', 'skillmain4');
  	var objskillvalue=_.values(objskill)
  	objskillvalue.forEach(function(val,index){
      var d= index%2?true:false
      if(d && val && val.length>0){
        skillmain.push(val)}
      else if(val && val.length>0){
        skillname.push(val)
       }
    })
    for(var i=0;i<5;i++){
      if(skillname[i] && skillmain[i] ){
      skill.push({
        name:skillname[i],
        main:skillmain[i]
        })
      }
      else{
        continue
      }
    }
    return skill
}

exports.isNum_search = function(obj){
  var reg = /^[0-9]*$/
   return reg.test(obj);
} 