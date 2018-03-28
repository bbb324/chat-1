var fs = require('fs');
var https = require('https');
var apiKey = "9f0f5296e5b945158ea9d31b2a389877";      

function ocrTest(){
	console.log("Optical Character Recognition");

    var image = fs.readFileSync("./card3.png");

	var options = {
		method: 'POST',
		host: 'westus.api.cognitive.microsoft.com',
		path: '/vision/v1.0/ocr?language=zh-Hans&detectOrientation=true',
		headers: {
				'Content-Type': 'application/octet-stream',
                //'Content-Type': 'application/json',
                'Content-Length': image.length,
				'Ocp-Apim-Subscription-Key': apiKey
		}
	};

	var ocrReq = https.request(options, function(res){
	    var chunks = '';
	    res.setEncoding('utf8');
	    res.on('data', function(chunk) {
	      chunks += chunk;
              console.log('data: ' + chunks);
	    });
	    res.on('end', function() {
	        var error, result;
            var text = '';
			try {
				result = JSON.parse(chunks);
				//console.log("result:",JSON.stringify(result));
                if ('regions' in result){
                   for (var i = 0; i < result.regions.length; i++){
                      for (var j = 0; j < result.regions[i].lines.length; j++){
                         for (var k = 0; k < result.regions[i].lines[j].words.length; k++){
                             text += result.regions[i].lines[j].words[k].text + ' ';
                         }
                      }
                   }
                }
                console.log('------------------------')
				console.log(text);
				console.log('------------------------')
			} catch (e) {
      		}
      		
	    });
	});
	ocrReq.on('error', function(e) {
	  	console.error(e);
	});
	ocrReq.write(image);
	ocrReq.end();
}

ocrTest();
