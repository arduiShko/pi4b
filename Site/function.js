$(document).ready(function() 
{
  $(function()
  {
  	$('.topo').click(function()
	{
  		$('html,body').animate({
  			scrollTop:$('#cabecalho').offset().top
  		},'slow')
  	})
  })
  $(function()
  {
  	$('.leituraSensor').click(function()
	{
  		$('html,body').animate({
  			scrollTop:$('#tabela').offset().top
  		},'slow')
  	})
  })
  $(function()
  {
  	$('.sobreProjeto').click(function()
	{
  		$('html,body').animate({
  			scrollTop:$('#descricao').offset().top
  		},'slow')
  	})
  })
  $(function()
  {
  	$('.graficos').click(function()
	{
  		$('html,body').animate({
  			scrollTop:$('#graficoseanalises').offset().top
  		},'slow')
  	})  
  });
});
/*
function deteccaoDado(){
  var spreadsheetID = "1ojyhOLZqJc9LdN12PwsiHmPgC8nT2H112111Gu21Oek";
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
  //setInterval(function(){
    $.getJSON(url, function(data) {
      var entry = data.feed.entry;
      var observer = new MutationObserver(callback);        
    }
  //},1000);
}*/
function desenhaGrafico()
{
  var matriz = new Array();  
  $(function()
  {
            var spreadsheetID = "1ojyhOLZqJc9LdN12PwsiHmPgC8nT2H112111Gu21Oek";
            var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";     
            $.getJSON(url, function(data) 
			{
              var entry = data.feed.entry;
              var table='';
              table +='<table id="spreadSheet" style="text-align:center" class="table table-bordered table-responsive" border="1px" cellpadding=5 cellspacing=0>';
              table += '<tr><th colspan="5"  style="text-align:center" class="tituloTabela">Leitura Consumo de Energia</th></tr>'
              table += '<tr  style="text-align:center" class="linhaTabela" >';
              table += '<th  style="text-align:center" class="subtitulo">' + "Data" + '</th>';
              table += '<th  style="text-align:center" class="subtitulo">' + "Horário" + '</th>';
              table += '<th  style="text-align:center" class="subtitulo">' + "Potência (w)" + '</th>';
              table += '<th  style="text-align:center" class="subtitulo">' + "Corrente (A)" + '</th>';
              table += '<th  style="text-align:center" class="subtitulo">' + "Valor (R$)" + '</th>';
              table += '</tr>';
			  
              for(var i=0; i<entry.length; i++)  //10
			  {
                 table += '<tr class="linhaTabela">';
                 table += '<td class="dataCell">' + entry[i]['gsx$data']['$t'] + '</td>';   //entry.length - i
                 table += '<td class="dataCell">' + entry[i]['gsx$horário']['$t'] + '</td>';
                 table += '<td class="dataCell">' + entry[i]['gsx$potênciaw']['$t'] + '</td>';
                 table += '<td class="dataCell">' + entry[i]['gsx$correntea']['$t'] + '</td>';
                 table += '<td class="dataCell">' + entry[i]['gsx$valorr']['$t'] + '</td>';
                 table += '</tr>';
              }


              google.charts.load('current', {'packages':['corechart', 'controls']});
              google.charts.setOnLoadCallback(drawChart);
              
              function drawChart() 
			  {
                
                var lineChartElement = document.getElementById("lineChart");
                var areaChartElement = document.getElementById("areaChart");
                var comboChartElement = document.getElementById("comboChart");

                var chart = new google.visualization.DataTable(data);
                chart.addColumn('string','Horário');
                chart.addColumn('number','Potência (W)');
                chart.addColumn('number','Corrente (A)');
                chart.addColumn('number','Valor (R$)');

               

                for(var j=0; j<entry.length; j++)
				{
                  chart.addRows([[entry[j]['gsx$horário']['$t'],Number(entry[j]['gsx$potênciaw']['$t']),Number(entry[j]['gsx$correntea']['$t']),Number(entry[j]['gsx$valorr']['$t'])]]);
                }

                var lineChart = new google.visualization.LineChart(lineChartElement);
                var areaChart = new google.visualization.AreaChart(areaChartElement);
                var comboChart = new google.visualization.ComboChart(comboChartElement);
                
                var options1 = 
				{
                  'title' : 'Grafico de linha',
                  'is3D'  : false,
                  hAxis: {title: 'Horário',  titleTextStyle: {color: '#333'}},
                  vAxis: {title: 'Leitura do Consumo de Energia',minValue: 0}
                };
                var options2 = 
				{
                  title: 'Gráfico de Área',
                  hAxis: {title: 'Horário',  titleTextStyle: {color: '#333'}},
                  vAxis: {title: 'Leitura do Consumo de Energia',minValue: 0}
                };
                var options3 = 
				{
                  title : 'Gráfico de Barras',
                  vAxis: {title: 'Leitura do Consumo de Energia'},
                  hAxis: {title: 'Horário'},
                  seriesType: 'bars',
                  series: {3: {type: 'line'}}
                };
                

                lineChart.draw(chart,options1);
                areaChart.draw(chart, options2);
                comboChart.draw(chart, options3);
              }
               
              table+='</table>';
              $('#tabela').html(table); 

            });
  });
}
function reload()
{
  desenhaGrafico();
}
var aux=0;
$(document).ready(function()
{
	$("#forward").click(function()
	{
		aux=aux-(100);
		if(aux>=(-200))
		{
		    $("#slider").css("margin-left",aux + "%" );
		}
		else if(aux<(-200))
		{
		    aux=-200;
		}
	});
	$("#backward").click(function()
	{
		aux=aux+(100);
		if(aux<=(0))
		{
		    $("#slider").css("margin-left",aux + "%" );
		}
		else if(aux>(0))
		{
		    aux=0;
		}
	});
	$(".control1").click(function()
	{
		aux=0;
		$("#slider").css("margin-left",aux + "%" );
	});
	$(".control2").click(function()
	{
		aux=-100;
		$("#slider").css("margin-left",aux + "%" );
	});
	$(".control3").click(function()
	{
		aux=-200;
		$("#slider").css("margin-left",aux + "%" );
	});

});


