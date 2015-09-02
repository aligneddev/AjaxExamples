/// <reference path="../typings/knockout.d.ts" />
// http://stackoverflow.com/questions/30173638/where-to-specify-module-flag-in-vs-2015

import {JQueryAjaxDataService} from"../Modules/jQueryAjaxDataService";

 /**
 * Typescript example of a Knockout ViewModel using the dataService.
 * You'll need the TS 1.5 extension for VS installed.
 */
export class IndexTsViewModel {
    // make observable so the UI will update
	// that means we need to use parentheses
	public results = ko.observableArray([]);
    public errorMessage = ko.observable("");

    public id = ko.observable("1");
    public name = ko.observable("Test");
    private url = "api/Stuff";
    constructor(private dataService: JQueryAjaxDataService) {
    }

    public getWithAjax() {
        return this.dataService.ajaxGetJson(this.url).then((results) => {
            this.results(results);
        });
    }

    public postDataWithAjax() {
        return this.dataService.ajaxPostJson(this.url + "/post", { id: this.id, name: this.name });
        
    }
}