function generatingComponent(vardata){
var Attacks = dc.rowChart('#attacks') ;
var Killed = dc.rowChart('#killed') ;
var Kidnapped = dc.rowChart('#kidnapped') ;
var Damaged_or_Destroyed = dc.rowChart('#damaged_or_destroyed') ;
var Injured = dc.rowChart('#injured') ;
var Year = dc.pieChart ("#year") ;
var numberDisplayAttacks = dc.numberDisplay("#number-display-attacks"); 

var colors = ['#FAE61E','#03a9f4','#E67800','#C80000','#E6E6FA', '#023858', '#a6bddb','#3690c0'] ;

var cf = crossfilter(vardata);
var all = cf.groupAll();
var colors = ['#2C5197','#0B0B61'] ;
var YearDimension = cf.dimension(function(d) { return d.Year});
var YearGroup = YearDimension.group();
/*var RtypeDim = cf.dimension(function(d) { return d.data_type});
var RtypeGroup = RtypeDim.group();
var statusDim = cf.dimension(function(d) {return d.status});
var statusGroup = statusDim.group();*/
var AttacksDimension = cf.dimension(function(d) {return d.Country});
var AttacksGroup = AttacksDimension.group().reduceSum(function(d){ return d.Attacks_on_Health_Care});

//var useDim = cf.dimension(function(d) {return d.purposes});
var KilledGroup = AttacksDimension.group().reduceSum(function(d){ return d.Health_Workers_Killed});
var KidnappedGroup = AttacksDimension.group().reduceSum(function(d){ return d.Health_Workers_Kidnapped});
var InjuredGroup = AttacksDimension.group().reduceSum(function(d){ return d.Health_Workers_Injured});
var Damaged_or_DestroyedGroup = AttacksDimension.group().reduceSum(function(d){ return d.Health_Facilities_Damaged_or_Destroyed});
    
//numbers display
    /*var numberDisplayAttacksU = AttacksDimension.groupAll().reduce(
    function (p, v) { //add
      if(p[v.quote]) {
        p[v.quote]++;
      } else {
        p[v.quote] = 1;
      }
      return p;
    },
    function (p, v) { //remove
      p[v.quote]--;
      if(p[v.quote] === 0) {
        delete p[v.quote];
      }
      return p;
    },
    function () { //init
      //initial p 
      return {};
    }
  );
 numberDisplayAttacks
    .group(numberDisplayAttacksU)
    .valueAccessor(
      function (d) { return Object.keys(d).length; }
    );*/
//pie charts
  Year.width(300).height(350)
        .dimension(YearDimension)
        .group(YearGroup);
    
  /* Rstatus.width($('#status').width()).height(150)
        .dimension(statusDim)
        .group(statusGroup); 
    Rtype.width($('#type').width()).height(150)
        .dimension(RtypeDim)
        .group(RtypeGroup); */
// rowCharts
  Attacks.width(300).height(350)
            .dimension(AttacksDimension)
            .group(AttacksGroup)
             .elasticX(true)
             .data(function(group) {
                return group.top(15);
            })
            .colors('#2b8cbe')
            .colorAccessor(function(d, i){return 0});
            /*reqs.renderVerticalGridLines(false);
            reqs.renderVerticalGridLines(false);*/

 Killed.width(300)
     .height(350)
            .dimension(AttacksDimension)
            .group(KilledGroup)
            .elasticX(true)
            .data(function(group) {
                return group.top(20);
            })
            .colors('#2b8cbe')
            .colorAccessor(function(d, i){return 0});
            /*use.renderVerticalGridLines(false);
            use.renderVerticalGridLines(false);*/
            
            
 Kidnapped.width(300)
     .height(350)
            .dimension(AttacksDimension)
            .group(KidnappedGroup)
            .elasticX(true)
            .data(function(group) {
                return group.top(20);
            })
            .colors('#2b8cbe')
            .colorAccessor(function(d, i){return 0});           
    
Injured.width(300)
       .height(350)
            .dimension(AttacksDimension)
            .group(InjuredGroup)
            .elasticX(true)
            .data(function(group) {
                return group.top(20);
            })
            .colors('#2b8cbe')
            .colorAccessor(function(d, i){return 0});  

Damaged_or_Destroyed.width(300)
       .height(350)
            .dimension(AttacksDimension)
            .group(Damaged_or_DestroyedGroup)
            .elasticX(true)
            .data(function(group) {
                return group.top(20);
            })
            .colors('#2b8cbe')
            .colorAccessor(function(d, i){return 0});   

  dc.dataCount('count-info')

    .dimension(cf)

    .group(all);

  
  dc.renderAll();
     

}

var dataCall = $.ajax({

    type: 'GET',

    url: 'data/data.json',

    dataType: 'json',

});

var geomCall = $.ajax({

    type: 'GET',

    url: 'data/cmr.geojson',

    dataType: 'json',

});

$.when(dataCall, geomCall).then(function(dataArgs, geomArgs){

    var geom = geomArgs[0];

    geom.features.forEach(function(e){

        e.properties['NAME'] = String(e.properties['NAME']);

    });

    generatingComponent(dataArgs[0],geom);

});
 