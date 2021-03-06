sap.ui.define([
		"sap/ui/test/opaQunit"
	], function (opaTest) {
		"use strict";

		module("FLP Integration");

		opaTest("Should open the share menu and display the share buttons on the schedule page", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();

			// Actions
			When.onTheschedulePage.iWaitUntilTheTableIsLoaded()
				.and.iPressOnTheShareButton();

			// Assertions
			Then.onTheschedulePage.and.iShouldSeeTheShareTileButton();
		});

		opaTest("Should open the share menu and display the share buttons", function (Given, When, Then) {
			// Actions
			When.onTheschedulePage.iRememberTheItemAtPosition(1).
				and.iPressATableItemAtPosition(1).
				and.iWaitUntilTheListIsNotVisible();
			When.onTheObjectPage.iPressOnTheShareButton();

			// Assertions
			Then.onTheObjectPage.
				and.iShouldSeeTheShareTileButton().
				and.theShareTileButtonShouldContainTheRememberedObjectName().
				and.iTeardownMyAppFrame();
		});

	}
);