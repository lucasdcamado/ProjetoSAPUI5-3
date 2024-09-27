sap.ui.define([], function () {
    "use strict";

    return {

        formataMoeda: function (valor) {
            var oLocale = new sap.ui.core.Locale("pt-BR");
            var oFormatOptions = {
                showMeasure: true,
                currencyCode: false,
                currencyContext: 'standard'
            };

            var oCurrencyFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance(oFormatOptions, oLocale);
            return oCurrencyFormat.format(valor, "BRL");
        },

        formataValMoeda: function (valor) {
            var oLocale = new sap.ui.core.Locale("pt-BR");
            var oFormatOptions = {
                showMeasure: false,
                currencyCode: false,
                currencyContext: 'standard'
            };

            var oCurrencyFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance(oFormatOptions, oLocale);
            return oCurrencyFormat.format(valor, "BRL");
        },

        formataPorcentagem: function (valor) {
            var oLocale = new sap.ui.core.Locale("pt-BR");
            var oFormatOptions = {
                minIntegerDigits: 1,
                maxIntegerDigits: 5,
                minFractionDigits: 2,
                maxFractionDigits: 4
            };

            var oCurrencyFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance(oFormatOptions, oLocale);
            var oPercentFormat = sap.ui.core.format.NumberFormat.getPercentInstance(oFormatOptions, oLocale);

            var valFrac = 0;

            valFrac = valor/100;

            return oPercentFormat.format(valFrac, "BRL");
        },

        formataFloat: function (valor) {
            var oLocale = new sap.ui.core.Locale("pt-BR");
            var oFormatOptions = {
                minIntegerDigits: 1,
                maxIntegerDigits: 5,
                minFractionDigits: 2,
                maxFractionDigits: 4
            };

            var oFloatFormat = sap.ui.core.format.NumberFormat.getFloatInstance(oFormatOptions, oLocale);

            return oFloatFormat.format(valor, "BRL");
        },

        formataData: function (valor) {
            var sFromatedDate = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "dd/MM/YYYY"
            }).format(valor);

            return sFromatedDate;
        },

        formataDataTempo: function (valor) {
            var sFromatedDate = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "dd/MM/YYYY HH:mm:ss"
            }).format(valor);

            return sFromatedDate;
        }
        
    }
});