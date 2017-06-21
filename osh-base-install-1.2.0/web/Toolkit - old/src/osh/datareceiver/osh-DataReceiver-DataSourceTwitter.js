/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Joshua Wolfe <developer.wolfe@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides parsing to Twitter Data.
 * @class OSH.DataReceiver.Twitter
 * @augments OSH.DataReceiver.DataSource
 */
OSH.DataReceiver.DataSourceTwitter = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.DataSourceTwitter
   * @instance
   */
  parseTimeStamp: function(data) {
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    return new Date(tokens[0]).getTime();
  },

  /**
   * Extract data from the message.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @memberof OSH.DataReceiver.DataSourceTwitter
   * @instance
   */
  parseData: function(data) {
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");

    var parsedData = {
      timestamp: tokens[0],
      lat: tokens[1],
      lon: tokens[2],
      user: tokens[3],
      text: tokens[4]
    };

    return parsedData;
  }
});
