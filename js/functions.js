function setRegionOption(obj) {
	var list = [];
    var config = obj['config'];
    var regions = config['regions'];
    for (var i = 0; i < regions.length; i++) {
    	var region = regions[i]['region'];
    	$('#select_region').append($('<option value="' + region + '">' + region + '</option>'));
    }
    return list;
}
function choiceRegion() {
	var region = $('#select_region').val();
	var rows = $("table")[0].rows;
	jQuery.each(rows, function(i) {
		if(i != 0) {
			var cells = rows[i].cells;
			if(cells[1].innerText != region) {
				$(cells).hide();
			} else {
				$(cells).show();
			}
		}
	});
}
function drawOndemandTable() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'region');
    data.addColumn('string', 'size');
    data.addColumn('number', 'vCPU');
    data.addColumn('number', 'ECU');
    data.addColumn('number', 'memoryGiB');
    data.addColumn('string', 'storageGB');
    data.addColumn('number', 'price');
    data.addRows(list);
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {allowHtml: true, showRowNumber: true, sortColumn: 0});
}
function toOndemandList(obj) {
    var list = [];
    var config = obj['config'];
    var regions = config['regions'];
    for (var i = 0; i < regions.length; i++) {
        var region = regions[i]['region'];
        var instypes = regions[i]['instanceTypes'];
        for (var j = 0; j < instypes.length; j++) {
            var sizes = instypes[j]['sizes'];
            for (var k = 0; k < sizes.length; k++) {
                var size = sizes[k]['size'];
                var vCPU = sizes[k]['vCPU'];
                var ECU  = sizes[k]['ECU'];
                var memoryGiB = sizes[k]['memoryGiB'];
                var storageGB = sizes[k]['storageGB'];
                var price     = sizes[k]['valueColumns'][0]['prices']['USD'];
                list.push([
                    region,
                    size,
                    {v: parseInt(vCPU),f: vCPU},
                    {v: parseFloat(ECU), f: ECU},
                    {v: parseFloat(memoryGiB), f: memoryGiB},
                    storageGB,
                    {v: parseFloat(price), f: "$" + price}
                ]);
            }
        }
    }
    return list;
}
function drawReservedTable() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'region');
    data.addColumn('string', 'size');
    data.addColumn('number', 'yrTerm1');
    data.addColumn('number', 'yrTerm1Hourly');
    data.addColumn('number', 'yrTerm3');
    data.addColumn('number', 'yrTerm3Hourly');
    data.addRows(list);
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {allowHtml: true, showRowNumber: true, sortColumn: 0});
}
function toReservedList(obj) {
    var list = [];
    var config = obj['config'];
    var regions = config['regions'];
    for (var i = 0; i < regions.length; i++) {
        var region = regions[i]['region'];
        var instypes = regions[i]['instanceTypes'];
        for (var j = 0; j < instypes.length; j++) {
            var sizes = instypes[j]['sizes'];
            for (var k = 0; k < sizes.length; k++) {
                var valueColumns = sizes[k]['valueColumns'];
                var size = sizes[k]['size'];
                for (var l = 0; l < valueColumns.length; l++) {
                    var priceName = valueColumns[l]['name'];
                    switch(priceName) {
                        case "yrTerm1" :
                            var yrTerm1 = valueColumns[l]['prices']['USD'];
                            break;
                        case  "yrTerm1Hourly" :
                            var yrTerm1Hourly = valueColumns[l]['prices']['USD'];
                            break;
                        case "yrTerm3" :
                            var yrTerm3 = valueColumns[l]['prices']['USD'];
                            break;
                        case  "yrTerm3Hourly" :
                            var yrTerm3Hourly = valueColumns[l]['prices']['USD'];
                            break;
                    }
                }
                list.push([
                    region,
                    size,
                    {v: parseFloat(yrTerm1), f: yrTerm1},
                    {v: parseFloat(yrTerm1Hourly), f: yrTerm1Hourly},
                    {v: parseFloat(yrTerm3), f: yrTerm3},
                    {v: parseFloat(yrTerm3Hourly), f: yrTerm3Hourly}
                ]);
            }
        }
    }
    return list;
}