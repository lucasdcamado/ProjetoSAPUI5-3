/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zmmsap/zmm002/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
