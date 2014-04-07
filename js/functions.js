function setOndemandOption() {
	check_list = {};
	var select_vCPU = $('#select_vcpu').val();
	var select_ECU = $('#select_ecu').val();
	var select_Memory = $('#select_memory').val();
	var select_Strage = $('#select_strage').val();
	$('#select_vcpu').children().remove();
	$('#select_ecu').children().remove();
	$('#select_memory').children().remove();
	$('#select_strage').children().remove();
	$('#select_vcpu').append($('<option value=""></option>'));
	$('#select_ecu').append($('<option value=""></option>'));
	$('#select_memory').append($('<option value=""></option>'));
	$('#select_strage').append($('<option value=""></option>'));
    var config = obj['config'];
    var regions = config['regions'];
    for (var i = 0; i < regions.length; i++) {
    	var region = regions[i]['region'];
    	$('#select_region').append($('<option value="' + region + '">' + region + '</option>'));
    	if (region == $('#select_region').val()) {
		    var instypes = regions[i]['instanceTypes'];
	        for (var j = 0; j < instypes.length; j++) {
	            var sizes = instypes[j]['sizes'];
	            for (var k = 0; k < sizes.length; k++) {
	        	    var vCPU = sizes[k]['vCPU'];
	                var ECU  = sizes[k]['ECU'];
	                var memoryGiB = sizes[k]['memoryGiB'];
	                var storageGB = sizes[k]['storageGB'];
	                if (
	                	(select_vCPU == undefined || select_vCPU == "" || select_vCPU == vCPU) &&
	                	(select_ECU == undefined || select_ECU == "" || select_ECU == ECU) &&
	                	(select_Memory == undefined || select_Memory == "" || select_Memory == memoryGiB) &&
	                	(select_Strage == undefined || select_Strage == "" || select_Strage == storageGB)
	                ) {
						addUniqueOption("select_vcpu", select_vCPU, vCPU);
						addUniqueOption("select_ecu", select_ECU, ECU);
						addUniqueOption("select_memory", select_Memory, memoryGiB);
						addUniqueOption("select_strage", select_Strage, storageGB);
	            	}
	            }
	        }
    	}
    }
}
function addUniqueOption(box_name, select_val, val) {
	if (!check_list[box_name]) check_list[box_name] = [];
	if(check_list[box_name].indexOf(val) < 0) {
		if (select_val == val) {
			$('#' + box_name).append($('<option value="' + val + '" selected>' + val + '</option>'));
		} else {
			$('#' + box_name).append($('<option value="' + val + '">' + val + '</option>'));
		}
		check_list[box_name].push(val);
	}
}
function setReservedOption() {
    var config = obj['config'];
    var regions = config['regions'];
    for (var i = 0; i < regions.length; i++) {
    	var region = regions[i]['region'];
    	$('#select_region').append($('<option value="' + region + '">' + region + '</option>'));
    }
}
function choiceOndemand() {
    list = toOndemandList();
    setOndemandOption();
    google.load('visualization', '1', {packages:['table']});
    drawOndemandTable();
}
function choiceReserved() {
    list = toReservedList();
    setReservedOption();
    google.load('visualization', '1', {packages:['table']});
    drawReservedTable();
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
function toOndemandList() {
	var select_vCPU = $('#select_vcpu').val();
	var select_ECU = $('#select_ecu').val();
	var select_Memory = $('#select_memory').val();
	var select_Strage = $('#select_strage').val();
    var list = [];
    var config = obj['config'];
    var regions = config['regions'];
    for (var i = 0; i < regions.length; i++) {
        var region = regions[i]['region'];
        var select_region = $('#select_region').val();
        if(region == select_region) {
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
                    if (
	                	(select_vCPU == undefined || select_vCPU == "" || select_vCPU == vCPU) &&
	                	(select_ECU == undefined || select_ECU == "" || select_ECU == ECU) &&
	                	(select_Memory == undefined || select_Memory == "" || select_Memory == memoryGiB) &&
	                	(select_Strage == undefined || select_Strage == "" || select_Strage == storageGB)
                    ) {
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
function toReservedList() {
    var list = [];
    var config = obj['config'];
    var regions = config['regions'];
    for (var i = 0; i < regions.length; i++) {
        var region = regions[i]['region'];
        var select_region = $('#select_region').val();
        if(region == select_region) {
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
    }
    return list;
}