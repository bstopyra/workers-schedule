sap.ui.define([
	"sap/ui/core/format/DateFormat"
], function(DateFormat) {
	"use strict";

	return {


		/*
		 * Formatowanie godziny
		 * @param {object} [oTime] obiekt z godziną 
		 * @returns {String} godzina w formacie HH:mm
		 *
		 */
		formatTime: function(oTime) {
			if (oTime) {
				var oDate = new Date(oTime.ms),
					sMsTime = oDate.getTime(),
					sTZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000,
					sTimeStr;
				var oTimeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
					pattern: "HH:mm"
				});
				sTimeStr = oTimeFormat.format(new Date(sMsTime + sTZOffsetMs));
				return sTimeStr;
			} else {
				return "";
			}
		},

		/*
		 * Formatowanie nazwy studenta
		 * @param {String} [sString] Nazwa studenta
		 * @returns {String} [sChangedString] Sformatowana nazwa studenta
		 *
		 */
		formatToProperName: function(sString) {
			var sRegEx = /\w\S*/g,
				sChangedString = sString.replace(sRegEx, function(sTxt) {
					return sTxt.charAt(0).toUpperCase() + sTxt.substr(1).toLowerCase();
				});
			return sChangedString;
		},

		/*
		 * Formatowanie daty i czasu z uwzględnieniem przesunięcia czasowego
		 * @param {Object} [oDate] data kursu
		 * @returns {Object} Data w formacie UTC
		 *
		 */
		formatDates: function(oDate) {
			var oDateOff,
				nUserOffset;
			if (oDate) {

				nUserOffset = oDate.getTimezoneOffset() * 60 * 1000;
				oDateOff = new Date(oDate.getTime() - nUserOffset);
				var oFormatOptions = {
						vJSDate: Date,
						bUTC: false
					},
					oConstraints = {
						nullable: true
					},
					oDate2 = new sap.ui.model.odata.type.Date(oFormatOptions, oConstraints);

				return oDate2.formatValue(oDateOff, "any");
			}
		},

		/*
		 * Formatowanie daty i czasu dla wyświetlania komentarza
		 * @param {Object} [oDate] data dodania komentarza
		 * @param {Object} [oTime] godzina dodania komentarza
		 * @returns {String} informacja o dniu i godzinie dodania komentarza
		 *
		 */
		formatDateTime: function(oDate, oTime) {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();
			if (oDate && oTime) {
				var oDateFormat = DateFormat.getDateTimeInstance({
					pattern: "dd.MM.YYYY"
				});
				var oTimeFormat = DateFormat.getTimeInstance({
					pattern: "HH:mm"
				});
				var nTZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000,
					sTime = oTimeFormat.format(new Date(oTime.ms + nTZOffsetMs));
				return oDateFormat.format(new Date(oDate)) + " " + oResourceBundle.getText("formatDateTimeWhen") + " " + sTime;
			} else {
				return oResourceBundle.getText("statusTextNever");
			}
		},

		/*
		 * Formatowanie tytułu z nazwą kursu i salą
		 * @param {String} [sCourse] nazwa kursu 
		 * @param {String} [sRoom] nazwa sali
		 * @returns {String} konkatynacja w formacie "Kurs (sala)"
		 *
		 */
		formatTitle: function(sCourse, sRoom) {
			if (sCourse && sRoom) {
				return sCourse + " (" + sRoom + ")";
			} else {
				return sCourse + sRoom;
			}
		},


		/*
		 * Formatowanie daty i czasu z wyodrębnieniem dnia tygodnia
		 * @param {Object} [oDate] data kursu
		 * @param {Object} [oTime] godzina kursu
		 * @returns {String} Data w formacie: Dzień tygodnia, data, godzina
		 *
		 */
		formatDateTitle: function(oDate, oTime) {
			if (oDate && oTime) {
				var sDay = oDate.toLocaleString("pl-pl", {
					weekday: "long"
				});
				sDay = sDay.charAt(0).toUpperCase() + sDay.slice(1);
				var sDate = oDate.toLocaleString("pl-pl", {
					day: "numeric",
					month: "long",
					year: "numeric"
				});
			}
			var sTime = this.formatter.formatTime(oTime);
			return sDay + ", " + sDate + ", " + sTime;
		},

		/*
		 * Parsowanie ciągu znaków do zmiennej typu Number
		 * @param {String} [sString] ocena jako wartość typu String 
		 * @returns {Number} ocena w formacie liczbowym
		 *
		 */
		stringToFloat: function(sString) {
			return parseFloat(sString);
		}

	};

});