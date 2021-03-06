sap.ui.define([
		"sap/ui/test/opaQunit"
	], function (opaTest) {
		"use strict";

		QUnit.module("Object");

		opaTest("Should see the busy indicator on object view after metadata is loaded", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();

			//Actions
			When.onTheSchedulePage.iRememberTheItemAtPosition(1);
			When.onTheBrowser.iRestartTheAppWithTheRememberedItem({
				delay: 1000
			});
			When.onTheAppPage.iWaitUntilTheAppBusyIndicatorIsGone();

			// Assertions
			Then.onTheObjectPage.iShouldSeeTheObjectViewsBusyIndicator().
				and.theObjectViewsBusyIndicatorDelayIsRestored().
				and.iShouldSeeTheRememberedObject();
		});

		opaTest("Should open the share menu and display the share buttons", function (Given, When, Then) {
			// Actions
			When.onTheObjectPage.iPressOnTheShareButton();

			// Assertions
			Then.onTheObjectPage.iShouldSeeTheShareEmailButton().
				and.iTeardownMyAppFrame();
		});

	}
);