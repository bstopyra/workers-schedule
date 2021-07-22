sap.ui.define([
		"sap/ui/test/opaQunit"
	], function (opaTest) {
		"use strict";

		QUnit.module("Schedule");

		opaTest("Should see the table with all entries", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();

			//Actions
			When.onTheSchedulePage.iLookAtTheScreen();

			// Assertions
			Then.onTheSchedulePage.theTableShouldHaveAllEntries().
				and.theTitleShouldDisplayTheTotalAmountOfItems();
		});

		opaTest("Search for the First object should deliver results that contain the firstObject in the name", function (Given, When, Then) {
			//Actions
			When.onTheSchedulePage.iSearchForTheFirstObject();

			// Assertions
			Then.onTheSchedulePage.theTableShowsOnlyObjectsWithTheSearchStringInTheirTitle();
		});


		opaTest("Entering something that cannot be found into search field and pressing search field's refresh should leave the list as it was", function (Given, When, Then) {
			//Actions
			When.onTheSchedulePage.iTypeSomethingInTheSearchThatCannotBeFoundAndTriggerRefresh();

			// Assertions
			Then.onTheSchedulePage.theTableHasEntries();
		});

		opaTest("Should open the share menu and display the share buttons", function (Given, When, Then) {
			// Actions
			When.onTheSchedulePage.iPressOnTheShareButton();

			// Assertions
			Then.onTheSchedulePage.iShouldSeeTheShareEmailButton().
				and.iTeardownMyAppFrame();
		});

		opaTest("Should see the busy indicator on app view while schedule view metadata is loaded", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp({
				delay: 5000
			});

			//Actions
			When.onTheSchedulePage.iLookAtTheScreen();

			// Assertions
			Then.onTheAppPage.iShouldSeeTheBusyIndicatorForTheWholeApp();
		});

		opaTest("Should see the busy indicator on schedule table after metadata is loaded", function (Given, When, Then) {
			//Actions
			When.onTheAppPage.iWaitUntilTheAppBusyIndicatorIsGone();

			// Assertions
			Then.onTheSchedulePage.iShouldSeeTheScheduleTableBusyIndicator().
				and.iTeardownMyAppFrame();
		});

	}
);