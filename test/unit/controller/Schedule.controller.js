sap.ui.define([
		"hr/teach/controller/schedule.controller",
		"hr/teach/controller/BaseController",
		"sap/ui/base/ManagedObject",
		"test/unit/helper/FakeI18nModel",
		"sap/ui/thirdparty/sinon",
		"sap/ui/thirdparty/sinon-qunit"
	], function(ScheduleController, BaseController ,ManagedObject, FakeI18n) {
		"use strict";

		QUnit.module("Table busy indicator delay", {

			beforeEach : function () {
				this.oScheduleController = new ScheduleController();
				this.oTableStub = new ManagedObject();
				this.oTableStub.getBusyIndicatorDelay = sinon.stub();
				this.oViewStub = new ManagedObject();
				this.oComponentStub = new ManagedObject();
				this.oComponentStub.setModel(new FakeI18n(), "i18n");

				sinon.stub(this.oScheduleController, "getOwnerComponent").returns(this.oComponentStub);
				sinon.stub(this.oScheduleController, "getView").returns(this.oViewStub);
				sinon.stub(this.oScheduleController, "byId").returns(this.oTableStub);
			},

			afterEach : function () {
				this.oScheduleController.destroy();
				this.oTableStub.destroy();
				this.oViewStub.destroy();
				this.oComponentStub.destroy();
			}
		});

		QUnit.test("Should set the initial busyindicator delay to 0", function (assert) {
			// Act
			this.oScheduleController.onInit();

			// Assert
			assert.strictEqual(this.oScheduleController.getModel("scheduleView").getData().tableBusyDelay, 0, "The original busy delay was restored");
		});

		QUnit.test("Should reset the busy indicator to the original one after the first request completed", function (assert) {
			// Arrange
			var iOriginalBusyDelay = 1;

			this.oTableStub.getBusyIndicatorDelay.returns(iOriginalBusyDelay);

			// Act
			this.oScheduleController.onInit();
			this.oTableStub.fireEvent("updateFinished");

			// Assert
			assert.strictEqual(this.oScheduleController.getModel("scheduleView").getData().tableBusyDelay, iOriginalBusyDelay, "The original busy delay was restored");
		});

	}
);