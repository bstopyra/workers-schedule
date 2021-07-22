sap.ui.define([
		"hr/teach/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("hr.teach.controller.NotFound", {

			/**
			 * Navigates to the schedule when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("schedule");
			}

		});

	}
);