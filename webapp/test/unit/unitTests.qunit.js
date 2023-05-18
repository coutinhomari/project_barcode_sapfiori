/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ConsultaProdutos/projeto_codigo_barras/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
