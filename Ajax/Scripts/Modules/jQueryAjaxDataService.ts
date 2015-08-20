// if we had modules and jQuery hooked up..., import $ = require("jquery");
// TypeScript, instead of functions for classes
class JQueryAjaxDataService {
    constructor(private $: JQuery, private loginUrl = "/Home/Login?ReturnUrl=") {

    }

    private commonFailHandling(errorMessage) {
        // this can be improved
        // User notification could be done in the global window.onerror call
        // could log as well
        window.console.log(errorMessage);
        throw new Error(errorMessage);
    }

    /**
     * Get JSON through a GET request.
     * @param url - the url of the api
     * @param data -
     * @returns {} 
     */
    public ajaxGetJson(url: string, cache?: boolean) {
        var self = this;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            accepts: {
                json: "application/json"
            },
            cache: cache === undefined ? false : cache,
            statusCode: {
                401: function () {
                    // un-authorized, the session timed out
                    // re-direct to the login page
                    // this needs to be tested
                    window.location.href = self.loginUrl + window.location.pathname;
                }
            }
        }).fail((jqXhr, textStatus, errorThrown) => {
            // textStatus: "timeout", "error", "abort", "parsererror"
            var errorMessage = jqXhr.responseText + " " + textStatus + ": " + errorThrown;
            this.commonFailHandling(errorMessage);
        });
    }

    public ajaxPostJson(url: string, data: Object) {
        var self = this;
        return $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "json",
            statusCode: {
                401: function () {
                    // un-authorized, the session timed out
                    // re-direct to the login page
                    window.location.href = self.loginUrl + window.location.pathname;
                }
            }
        }).fail((jqXhr, textStatus, errorThrown) => {
            // textStatus: "timeout", "error", "abort", "parsererror"
            var errorMessage = jqXhr.responseText + " " + textStatus + ": " + errorThrown;
            this.commonFailHandling(errorMessage);
        });
    }

    public ajaxGetScript(url: string, cache?: boolean) {
        return $.ajax({
            type: 'GET',
            url: url,
            dataType: 'script',
            cache: cache
        }).fail((jqXhr, textStatus, errorThrown) => {
            // textStatus: "timeout", "error", "abort", "parsererror"
            var errorMessage = jqXhr.responseText + " " + textStatus + ": " + errorThrown;
            this.commonFailHandling(errorMessage);
        });
    }
}

// if require/modules export = jQueryAjaxDataService;