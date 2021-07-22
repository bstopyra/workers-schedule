jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"hr/teach/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"hr/teach/test/integration/pages/Schedule",
		"hr/teach/test/integration/pages/Object",
		"hr/teach/test/integration/pages/NotFound",
		"hr/teach/test/integration/pages/Browser",
		"hr/teach/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "hr.teach.view."
	});

	sap.ui.require([
		"hr/teach/test/integration/ScheduleJourney",
		"hr/teach/test/integration/ObjectJourney",
		"hr/teach/test/integration/NavigationJourney",
		"hr/teach/test/integration/NotFoundJourney",
		"hr/teach/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});