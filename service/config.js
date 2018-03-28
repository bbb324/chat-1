var youtusdk = require('tencentyun'),
    youtuconf = youtusdk.conf,
    youtu = youtusdk.youtu;
var appid = '10113393';
	var secretId = 'AKID5D9uY0TZaTEnFXpuiRXWL0Yu42QhEkaD';
	var secretKey = 'nZEyZ1KUTVTIU2ddj3MevJbBPfwHiGGE';
	var userid = '393281694';
function sign() {
	youtuconf.setAppInfo(appid, secretId, secretKey, userid, 1);
	var signstr = youtusdk.auth.appSign('./card1.png',new Date().getTime())
	return {signstr: signstr, youtu: youtu}
}
	exports = module.exports = sign;
