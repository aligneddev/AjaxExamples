
// my controller 'class'
function indexController(button, postButton, postWithDataButton, jsonPButton, resultArea) {
	// property
	this.id = 10;
	this.resultArea = resultArea;
	this.response = "";
	
	// setup the click, need bind(this) so the this in getWithAjax is not button
	button.addEventListener("click", this.getWithAjax.bind(this));
	jsonPButton.addEventListener("click", this.getWithJsonP.bind(this));
	postButton.addEventListener("click", this.postWithAjax.bind(this));
	postWithDataButton.addEventListener("click", this.postDataWithAjax.bind(this));
}

// prototype to add the method
indexController.prototype.getWithAjax = function () {
	debugger;
	// Typescript and ES6 helps avoid self = this with the () => 
	var self = this;
	return $.ajax({
		type: "GET",
		url: "api/Stuff",
		// default is xml
		// contentType is sending to the server
		//contentType: "application/json;charset=utf-8",
		//dataType: "xml" // ask for xml, default is json
	}).then(function (data) {
		self.response = data;
		self.resultArea.textContent = data;
	}).fail(function () {
		self.resultArea.innerHTML = "<h1 style=\"color:red\">error</h1>";
		console.log("error from promise in indexController");
	});

	// shorthand it $.getJson
}

indexController.prototype.postWithAjax = function () {
	// Typescript and ES6 helps avoid self = this with the () => 
	var self = this;
	return $.ajax({
		type: "Post",
		url: "api/Stuff/PostSimple",

		// JSON.stringify?
		data: "=" + "test" //  { id: 1, name: 'gyroscope' }
	}).then(function (resp) {
		self.response = resp;
		self.resultArea.textContent = resp;
	}).fail(function () {
		self.resultArea.innerHTML = "<h1 style=\"color:red\">error</h1>";
		console.log("error from POST promise in indexController");
	});
}

indexController.prototype.postDataWithAjax = function () {
	// JSON.stringify
	// Typescript and ES6 helps avoid self = this with the () => 
	var self = this;
	return $.ajax({
		type: "Post",
		url: "api/Stuff/Post",
		data: { id: 1, name: 'gyroscope' }
	}).then(function (resp) {
		self.response = resp;
		self.resultArea.textContent = resp;
	}).fail(function () {
		self.resultArea.innerHTML = "<h1 style=\"color:red\">error</h1>";
		console.log("error from POST with data promise in indexController");
	});
}


indexController.prototype.getWithJsonP = function () {
	debugger;
	// Typescript and ES6 helps avoid self = this with the () => 
	var self = this;
	return $.ajax({
		//type: 'GET',
		//dataType: 'jsonp',
		//// url: 'api/Stuff/',
		////url: "http://domainname.com/json.php?callback=?", // ?callback=?
		////url: 'http://ajax.googleapis.com/ajax/services/search/webv=1.0&q=AAA&callback=?',
		//url: 'http://www.jquery4u.com/scripts/jquery4u-sites.json?callback=?',
		//jsonpCallback: 'jsonCallback',
		//data: 'value' // { id: 1, name: 'gyroscope' }
		url: "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=logk34&count=2",
		dataType: "jsonp",
	}).then(function (resp) {
		debugger;
		self.response = resp;
		self.resultArea.textContent = resp;
	}).fail(function () {
		self.resultArea.innerHTML = "<h1 style=\"color:red\">error</h1>";
		console.log("error from POST promise in indexController");
	});
}

// go even further with KO and binding, then we have the start of a ViewModel
