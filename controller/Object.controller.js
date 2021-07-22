/*global location*/
sap.ui.define([
	"hr/teach/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"hr/teach/model/formatter",
	"sap/m/MessageBox"
], function(
	BaseController,
	JSONModel,
	History,
	formatter,
	MessageBox
) {
	"use strict";

	return BaseController.extend("hr.teach.controller.Object", {

		formatter: formatter,

		/*
		 * Inicjalizacja
		 */
		onInit: function() {
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy: true,
					delay: 0,
					commentsCount: 0,
					studentsCount: 0
				});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "objectView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function() {
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});
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
				this.getRouter().navTo("schedule", {}, true);
			}
		},

		/*
		 * Funkcja otwierająca Select Dialog z listą studentów 
		 */
		onAddStudentPress: function() {
			var oFilter;
			if (!this._oStudDialog) {
				this._oStudDialog = sap.ui.xmlfragment("hr.teach.view.fragment.AddStudent", this);
			}
			this.getView().addDependent(this._oStudDialog);
			/* 
			 * Filtrowanie elementów Select Dialogu
			 */
			this._oStudDialog.open();
		},

		/*
		 * Funkcja do wyszukiwania studentów w Select Dialogu
		 * @param {Object} [oEvent] zdarzenie 
		 */
		searchStudent: function(oEvent) {
			var sValue = oEvent.getParameter("value").toUpperCase(),
				oBinding = oEvent.getSource().getBinding("items");
			/* 
			 * Filtrowanie studentów
			 */
		},

		/*
		 * Funkcja, w której tworzony jest zapis dodający studenta do danej lekcji
		 * @param {Object} [oEvent] zdarzenie 
		 */
		addStudentToLesson: function(oEvent) {
			var oSource = oEvent.getSource(),
				oContext = oSource.getBindingContext(),
				oSelectedItem = oEvent.getParameter("selectedItem"),
				sStudentId = oSelectedItem.getProperty("description"),
				sLessonId = oContext.getProperty("LessonId"),
				sPath = "/Grades",
				oData = {
					LessonId: sLessonId,
					StudentId: sStudentId
				};

			/* 
			 * Tworzenie wpisu ze studentem 
			 */
		},

		/*
		 * Funkcja obsługująca akcje po kliknięciu na przycisk "Edytuj" w widoku szczegółowym kursu
		 */
		onEditDetails: function() {
			var oViewModel = this.getModel("objectView");

		},

		/*
		 * Funkcja obsługująca akcje po kliknięciu na przycisk "Zapisz" w widoku szczegółowym kursu
		 */
		onSaveDetails: function() {
			var oModel = this.getModel(),
				oViewModel = this.getModel("objectView");

			/*
			 * Sprawdzenie, czy w modelu istnieją oczekujące zmiany
			 * Zatwierdzenie tych zmian
			 */
		},

		/*
		 * Funkcja zliczająca ilość elementów w tabelach ze studentami i komentarzami
		 * @param {Object} [oEvent] zdarzenie 
		 */
		countItems: function(oEvent) {
			var oSource = oEvent.getSource(),
				sItemsLength = oSource.getItems().length,
				sSourceId = oSource.getId(),
				oViewModel = this.getModel("objectView");

			if (sSourceId.includes("idStudentsTable")) {
				oViewModel.setProperty("/studentsCount", sItemsLength);
			} else if (sSourceId.includes("idCommentsList")) {
				oViewModel.setProperty("/commentsCount", sItemsLength);
			}
		},

		/*
		 * Funkcja służąca do zapisu komentarzy
		 * @param {Object} [oEvent] zdarzenie 
		 */
		onPost: function(oEvent) {
			var oData = {
					LessonId: oEvent.getSource().getBindingContext().getProperty("LessonId"),
					CommValue: oEvent.getParameter("value")
				},
				sMsgSuccess = this.getResourceBundle().getText("commentSuccessMsg");
			/*
			 * Zapis komentarza
			 */
		},

		/* =========================================================== */
		/* Metody wewnętrzne                                           */
		/* =========================================================== */

		/*
		 * Funkcja prywatna, rozpoznająca obiekt
		 * @param {Object} [oEvent] zdarzenie 
		 */
		_onObjectMatched: function(oEvent) {
			var oArguments = oEvent.getParameter("arguments"),
				sId = oArguments.LessonId;
			this.getModel().metadataLoaded().then(function() {

				var sObjectPath = this.getModel().createKey("Lessons", {
					LessonId: sId
				});
				this._bindView("/" + sObjectPath);

			}.bind(this));
		},

		/*
		 * Funkcja łącząca widok na podstawie otrzymanej ścieżki
		 * @param {String} [sObjectPath] ścieżka obiektu
		 */
		_bindView: function(sObjectPath) {
			var oViewModel = this.getModel("objectView"),
				oDataModel = this.getModel();

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oDataModel.metadataLoaded().then(function() {
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		/*
		 * Funkcja prywatna do tworzenia obiektu filtrującego dla Select Dialogu
		 */
		_filterStudents: function() {
			var oItems = this.byId("idStudentsTable").getItems();

			var oFilter = new sap.ui.model.Filter({
				filters: [],
				and: true
			});
			var i = 0;
			if (oItems.length > 0) {
				for (i; i < oItems.length; i++) {
					var iId = oItems[i].getBindingContext().getProperty("StudentId");
					var oFilterSingle = new sap.ui.model.Filter("StudentId", sap.ui.model.FilterOperator.NE, iId);
					oFilter.aFilters.push(oFilterSingle);
				}
			} else {
				oFilter = new sap.ui.model.Filter("StudentId", sap.ui.model.FilterOperator.NE, "");
			}

			return oFilter;
		},

		/*
		 * Funkcja wywoływana w momencie zmiany bindingu, wyświetla widok "Not found" w przypadku nie odnalezienia celu
		 */
		_onBindingChange: function() {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}

			oViewModel.setProperty("/busy", false);
		}

	});

});