/*global QUnit*/

sap.ui.define([
	"zmmsap/zmm002/controller/Selection.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Selection Controller");

	QUnit.test("I should test the Selection controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
