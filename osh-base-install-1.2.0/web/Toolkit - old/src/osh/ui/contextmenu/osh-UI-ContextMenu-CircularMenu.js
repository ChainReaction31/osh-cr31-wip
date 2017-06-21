/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc A circular context menu
 * @class
 * @type {OSH.UI.ContextMenu.CssMenu}
 * @augments OSH.UI.ContextMenu.CssMenu
 * @example
 * var menuItems = [{
        name: "Item 1",
        viewId: viewId,
        css: "someCssClass"
   },{
        name: "Item 2",
        viewId: viewId2,
        css: "someCssClass"
   }];

  var contextCircularMenu = new OSH.UI.ContextMenu.CircularMenu({id : randomId,groupId: randomGroupId,items : menuItems});
 */
OSH.UI.ContextMenu.CircularMenu = OSH.UI.ContextMenu.CssMenu.extend({
    initialize:function(properties) {
        this._super(properties,"circular");
    }
});