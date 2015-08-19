/**
 * A knockout view model for the index page.
 * @returns {} 
 */
function indexViewModel() {
	// make observable so the UI will update
	// that means we need to use parentheses
	this.results = ko.observableArray([]);
	this.errorMessage = ko.observable("");
}

// prototype to add the method
indexViewModel.prototype.getWithAjax = function () {
	// Typescript and ES6 helps avoid self = this with the () => 
	var self = this;
	return $.ajax({
		type: "GET",
		url: "api/Stuff"
		// default is xml
		// contentType is sending to the server
		//contentType: "application/json;charset=utf-8",
		//dataType: "xml" // ask for xml, default is json
	}).then(function (data) {
		self.results(data);
	}).fail(function () {
		self.errorMessage("error in get with Ajax");
		console.log("error from promise in indexViewModel");
	});

	// shorthand it $.getJson
}

indexViewModel.prototype.postWithAjax = function () {
	// Typescript and ES6 helps avoid self = this with the () => 
	var self = this;
	return $.ajax({
		type: "Post",
		url: "api/Stuff/PostSimple",

		// JSON.stringify?
		data: "=" + "test" //  { id: 1, name: 'gyroscope' }
	}).then(function (data) {
		self.results(['success']);
	}).fail(function () {
		self.errorMessage("error in post with Ajax");
		console.log("error from POST promise in indexViewModel");
	});
}

indexViewModel.prototype.postDataWithAjax = function () {
	// JSON.stringify
	// Typescript and ES6 helps avoid self = this with the () => 
	var self = this;
	return $.ajax({
		type: "Post",
		url: "api/Stuff/Post",
		data: { id: 1, name: 'gyroscope' }
	}).then(function (data) {
		self.results(['success']);
		self.results(data);
	}).fail(function () {
		self.errorMessage("error in post data with Ajax");
		console.log("error from POST with data promise in indexViewModel");
	});
}