sap.ui.define([
	"hr/teach/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"hr/teach/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, History, formatter, Filter, FilterOperator, MessageBox) {
	"use strict";

	return BaseController.extend("hr.teach.controller.Schedule", {

		formatter: formatter,

		/*
		 * Inicjowanie widoku
		 */
		onInit: function() {
			var oViewModel,
				iOriginalBusyDelay;

			this._oTable = this.byId("scheduleTable");

			oViewModel = new JSONModel({
				scheduleTableTitle: this.getResourceBundle().getText("scheduleTableTitle"),
				scheduleView: this.getResourceBundle().getText("scheduleView"),
				tableBusyDelay: 0,
				startDate: this._getLastMonday()
			});

			this.setModel(oViewModel, "scheduleView");

			this._oTable.attachEventOnce("updateFinished", function() {
				oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			});

		},

		/*
		 * Funkcja wywoływana przez framework po zakończeniu wykonaniu renderingu widoku
		 */
		onAfterRendering: function() {
			var oViewModel = this.getModel("scheduleView"),
				aItems = this._oTable.getBinding("items"),
				oStartDate = new Date(),
				aFilters = [],
				oFilter;
			/*
			 * Filtrowanie tabeli z kursami - stan początkowy
			 */
		},

		/*
		 * Funkcja wywoływana po zakończeniu aktualizacji w tabeli
		 * @param {Object} [oEvent] zdarzenie 
		 */
		onUpdateFinished: function(oEvent) {
			var sTitle,
				oTable = oEvent.getSource(),
				oViewModel = this.getModel("scheduleView"),
				iTotalItems = oEvent.getParameter("total"),
				oDate;
			oDate = oViewModel.getProperty("/pickedDate");

			if (oDate) {
				jQuery.sap.require("sap.ui.core.format.DateFormat");
				var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "dd.MM.YYYY"
				});
				oDate = oDateFormat.format(new Date(oDate));
			}

			if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
				sTitle = this.getResourceBundle().getText("scheduleTableTitleCount", [iTotalItems]);
			} else {
				sTitle = this.getResourceBundle().getText("scheduleTableTitle");
			}
			this.getModel("scheduleView").setProperty("/scheduleTableTitle", sTitle);
		},

		/*
		 * Funkcja wywoływana po wciśnięciu na element tabeli
		 * @param {Object} [oEvent] zdarzenie 
		 */
		onPress: function(oEvent) {
			this._showObject(oEvent.getSource());
		},

		/*
		 * Funkcja wykonująca nawigację wstecz/do launchpada
		 */
		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash(),
				oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {
				history.go(-1);
			} else {
				oCrossAppNavigator.toExternal({
					target: {
						shellHash: "#Shell-home"
					}
				});
			}
		},

		/*
		 * Funkcja wykonująca nawigację wstecz/do launchpada
		 *  @param {Object} [oEvent] zdarzenie 
		 */
		onSelectDate: function(oEvent) {
			var oSource = oEvent.getSource(),
				oSelectedDate = oSource.getSelectedDates()[0].getProperty("startDate"),
				aFilter = [],
				aItems = this._oTable.getBinding("items");

			/*
			 * Filtrowanie tabeli z kursami
			 */

		},

		/*
		 * Funkcja sprawdzająca, czy pole źródłowe posiada wartość
		 *  @param {Object} [oEvent] zdarzenie 
		 */
		checkForValue: function() {
			/*
			 * Sprawdzenie, czy pole źródłowe posiada wartość
			 */
		},

		/*
		 * Funkcja wywołująca zapis nowego kursu
		 *  @param {Object} [oEvent] zdarzenie 
		 */
		confirmAddCourse: function(oEvent) {
			/*
			 * Obsługa zapisu nowoutworzonego kursu
			 */
		},

		/*
		 * Funkcja wywołująca MessageBox z potwierdzeniem anulowania kursu
		 *  @param {Object} [oEvent] zdarzenie 
		 */
		cancelAddCourse: function(oEvent) {
			/*
			 * Obsługa anulowania dodawania nowego kursu
			 */
		},

		/*
		 * Funkcja do walidacji daty w Date Pickerze
		 *  @param {Object} [oEvent] zdarzenie 
		 */
		validateDate: function(oEvent) {
			var bValid = oEvent.getParameter("valid"),
				oSource = oEvent.getSource(),
				oBundle = this.getResourceBundle(),
				sValStateTxt,
				oToday = new Date(),
				sValue = oSource.getProperty("value"),
				oDate = new Date(sValue.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));

			/*
			 * Walidacja dla daty 
			 */
		},

		/* =========================================================== */
		/*  Metody prywatne                                            */
		/* =========================================================== */

		/*
		 * Funkcja prywatna służąca do nawigacji do widoku "object"
		 *  @param {Object} [oItem] wybrana pozycja z harmonogramu kursów
		 */
		_showObject: function(oItem) {
			/*
			 * Nawigacja do widoku "object" na podstawie 'LessonId'
			 */
		},

		/*
		 * Funkcja prywatna przypisująca domyślne wartości do modelu "Course"
		 */
		_setInitialDialogData: function() {
			var oModel = this.getModel("Course");
			oModel.setProperty("/LessonName", "");
			oModel.setProperty("/LessonDate", new Date());
			oModel.setProperty("/LessonTime", "PT08H00M00S");
			oModel.setProperty("/RoomName", "");
			oModel.setProperty("/CourseDetails", "");
		},
		
		/*
		 * Funkcja prywatna pobierająca obiekt z datą ostatniego poniedziałku
		 * @returns {Object} [oLastMonday] data - ostatni poniedziałek
		 */
		_getLastMonday: function() {
			var oToday = new Date(),
				nDayOfWeek = oToday.getDay(),
				oLastMonday = new Date(oToday.setDate(oToday.getDate() - nDayOfWeek + 1));
			return oLastMonday;
		},

		/*
		 * Funkcja sprawdzająca, czy pola wymagane zostały wypełnione
		 *  @param {Object} [oEvent] zdarzenie 
		 */
		_checkFieldsRequired: function(oEvent) {
			var oSimpleForm = this._oDialog.getContent()[0].getContent(),
				sNoValTxt = this.getResourceBundle().getText("sNoValTxt"),
				bFilledReq = true;

			for (var i = 1; i < oSimpleForm.length; i += 2) {
				var oItem = oSimpleForm[i],
					sValue = oItem.getValue();
				if (oItem.getProperty("required")) {
					if (sValue === "" || !sValue) {
						bFilledReq = false;
						oItem.setValueState("Error");
						oItem.setValueStateText(sNoValTxt);
					}
				}
			}
			if (!bFilledReq) {
				var sTitle = this.getResourceBundle().getText("noReqFilledMsg");
				MessageBox.warning(sTitle, {
						onClose: function() {

						}
					}

				);
				return false;
			} else {
				return true;
			}
		}

	});
});