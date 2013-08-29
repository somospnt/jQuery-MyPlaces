/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * A simple parser for Google Docs documents.
 *
 */
var googleDocsSimpleParser = (function () {

    /** Parses a Google Docs spreadsheet from its url, exported as JSON cells.
     * No empty cells are allowed when using this format.
     * @param settings a set of key/value pairs that configure this call. Valid settings:
     * url the Google Docs spreadsheet URL exported as cells with JSON. This
     * value is mandatory.
     *
     * done a callback to call when finished successfully. The first
     * parameter will be an array of parsed objects from the spreadsheet.
     *
     * fail an optional callback to invoke if the call fails.
     *
     * always an optional callback to always call after finishing
     * (successfully or with error).     */
    function parseSpreadsheetCellsUrl(settings) {
        var jqxhr = $.getJSON(settings.url, function (data) {
            var parsedObjects = parseSpreadsheetCellsObject(data, settings.transformer);
            settings.done(parsedObjects);
        });
        jqxhr.fail(settings.fail)
        jqxhr.always(settings.always);
    }

    /** Parse a Google Docs Spreadsheet object exported as JSON cells.
     * No empty cells are allowed when using this format.
     *
     * @param data a Google Docs spreadsheet object exported as JSON cells.
     * @param transformer an optional function to apply to each object.
     * @return an array of parsed objects.
     */
    function parseSpreadsheetCellsObject(data, transformer) {
        var parsedObjects = [];
        var cells = data.feed.entry;
        var i, j;
        var columnNames = getColumnNamesFromSpreadsheetCellsObject(data);
        var columnCount = columnNames.length;
        var parsedObject;

        //group results into columnCount chunks, each group contains a row
        for (i = columnCount; i < cells.length; i = i + columnCount) {
            parsedObject = {};

            //read the following cells that contain the object data, in order
            for (j = 0; j < columnCount; j++) {
                parsedObject[columnNames[j]] = cells[i + j].content.$t;
            }

            if (transformer) {
                parsedObject = transformer(parsedObject);
            }

            parsedObjects.push(parsedObject);
        }

        return parsedObjects;
    }

    /** Obtain the column names from the spreedsheet. The first row from the
     * data is used as column names.
     * @param data a Google Docs object from a spreedsheet exported as cells.
     * @return an array of names as strings.
     */
    function getColumnNamesFromSpreadsheetCellsObject(data) {
        var columnNames = [];
        var rows = data.feed.entry;
        var cellPosition, cellRowNumber;
        for (i = 0; i < rows.length; i++) {
            cellPosition = rows[i].title.$t;
            cellRowNumber = cellPosition.charAt(cellPosition.length - 1);
            //only the first row contains names for the object
            if (cellRowNumber != 1) {
                break;
            }
            columnNames.push(rows[i].content.$t);
        }
        return columnNames;
    }

    /** Parses a Google Docs spreadsheet from its url, exported as TXT (tab
     * separated values).
     * @param settings a set of key/value pairs that configure this call. Valid settings:
     * url the Google Docs spreadsheet URL exported as TXT (tab separated values).
     * This value is mandatory.
     *
     * done a callback to call when finished successfully. The first
     * parameter will be an array of parsed objects from the spreadsheet.
     *
     * fail an optional callback to invoke if the call fails.
     *
     * always an optional callback to always call after finishing
     * (successfully or with error).
     *
     * transformer an optional transformer to process each object. The first
     * paramter for this function will be a single parsed object.
     */
    function parseSpreadsheetTxtUrl(settings) {
        var jqxhr = $.ajax(settings.url).done(function (data) {
            var parsedObjects = parseSpreadsheetTxt(data, settings.transformer);
            settings.done(parsedObjects);
        });
        jqxhr.fail(settings.fail)
        jqxhr.always(settings.always);
    }

    /** Parse a Google Docs Spreadsheet string exported as TXT (tab separated
     * values).
     *
     * @param data a Google Docs spreadsheet string exported as TXT.
     * @param transformer an optional function to apply to each object.
     * @return an array of parsed objects.
     */
    function parseSpreadsheetTxt(data, transformer) {
        var parsedObjects = [];
        var parsedObject;
        var i, attribute, values;

        //IE seems to add extra whitespaces at the start, lets fix it.
        data = data.trim();

        //get all rows
        var rows = data.split("\n");
        //first row contains attribute names
        var names = rows[0].split("\t");

        for (i = 1; i < rows.length; i++) {
            values = rows[i].split("\t");
            parsedObject = {}

            //populate object with row values
            for (j = 0; j < names.length; j++) {
                attribute = names[j];
                parsedObject[attribute] = values[j];
            }

            if (transformer) {
                parsedObject = transformer(parsedObject);
            }

            parsedObjects.push(parsedObject);
        }

        return parsedObjects;
    }

    return {
        parseSpreadsheetCellsUrl: parseSpreadsheetCellsUrl,
        parseSpreadsheetTxtUrl: parseSpreadsheetTxtUrl
    };

})();