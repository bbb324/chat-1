var fs = require('fs');
var https = require('https');
var apiKey = "9f0f5296e5b945158ea9d31b2a389877";      
var signer = require('./service/config.js');
var requestImageSize = require('request-image-size');
//var youtu = require('./service/config.js');

/*function tcTest() {
	youtu.generalocr('./card1.png', function(data) {
            console.log(data)
           
        });
}*/


function ocrTest(){
	console.log("Optical Character Recognition");
	var userid = '393281694';
	
    var image = fs.readFileSync("./card1.png");
    

    var bs = new Buffer(image).toString('base64');  
    console.log('---------')
    
    console.log('---------')
    var bodyString = JSON.stringify({
			"app_id":userid,
   			/*"image": bs,*/
   			url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514357744943&di=c4bf53bf422490ca1cbe79c4a94c277e&imgtype=0&src=http%3A%2F%2Fimg002.hc360.cn%2Fy1%2FM05%2F60%2F25%2FwKhQc1SUqSuET0rSAAAAADEp7xk405.jpg'
		})
	
	var options = {
		method: 'POST',
		json: true,
		host: 'api.youtu.qq.com',
		path: '/youtu/ocrapi/generalocr',
		headers: {
				//'Content-Type': 'application/octet-stream',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(bs, 'utf8'),
				'Authorization': signer().signstr
		},
		body: bodyString
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
				console.log(text);
			} catch (e) {
      		}
      		
	    });
	});
	ocrReq.on('error', function(e) {
		console.log('+++++')
	  	console.error(e);
	});

	ocrReq.write(image);
	ocrReq.end();
}

function base64encode(str){
    var out, i, len;
    var c1, c2, c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

ocrTest();
//tcTest();