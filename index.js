var request = require('request');
var appName = process.env.name || '';
var time = 1000 * 60 * 30;
var timeout;
var route = '';

function ping(){
	var url = 'https://{appName}.herokuapp.com/';
	if (!appName) return null;
	url = url.replace('{appName}', appName) + route;
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    timeout = setTimeout(ping, time);
	  }
	})
}

ping();

module.exports = function(options){
	if (typeof options === 'string'){
		appName = options;
	} else if (typeof options === 'object'){
		time = option.time || time;
		appName = option.name || appName;
		route = option.route || '';
		route = (route.length > 0 && route[0] === '/') ? route.substr(1, route.length) : route;
	}
	clearTimeout(timeout);
	ping();
}
