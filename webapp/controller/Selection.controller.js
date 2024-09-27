sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageBox",
    'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
    "../model/formatter",
    "sap/ui/core/Fragment",
    'sap/ui/model/Sorter'


], function (Controller, ODataModel, MessageBox, Filter, FilterOperator, formatter, Fragment, Sorter) {
    "use strict";

    return Controller.extend("zmm.sap.zmm002.controller.Selection", {
        // Declaração da variável de formatação de Data.
        formatter: formatter,

        // Botão de pesquisa, pega os parâmetros inseridos e manda para o Backend para retorno da tabela.
        onSearch: function () {
            let ofiltros = [];

            var oMapaCotacao = this.getView().byId("table");
            
            var oRFQ = this.byId("inputRFQ").getValue();
            var oFor = this.byId("inputFornecedor").getValue();
            var oOrg = this.byId("inputOrg").getValue();
            var oGru = this.byId("inputGrupo").getValue();
            var oDoc = this.byId("inputDoc").getValue();
            var oDat = this.byId("datePickerDocumento").getValue();
            var oEmp = this.byId("inputEmpresa").getValue();

            // if (oRFQ.trim() === "" || oEmp.trim() === "") {
            //     MessageBox.warning("Por favor, preencha os campos obrigatórios.");
            //     return;
            // }

            if (oRFQ)
                {
                    ofiltros.push(new Filter("Submi", FilterOperator.EQ , oRFQ));
                }

            if (oFor)
                {
                    ofiltros.push(new Filter("Lifnr", FilterOperator.EQ, oFor));
                }
            
            if (oOrg)
                {
                    ofiltros.push(new Filter("Ekorg", FilterOperator.EQ, oOrg));
                }
            
            if (oGru)
                {
                    ofiltros.push(new Filter("Bkgrp", FilterOperator.EQ, oGru));
                }
                
            if (oDoc)
                {
                    ofiltros.push(new Filter("Esart", FilterOperator.EQ, oDoc));
                }
            if (oDat)
                {
                    ofiltros.push(new Filter("MmpurErdat", FilterOperator.EQ, oDat));
                }
            if (oEmp)
                {
                    ofiltros.push(new Filter("Bukrs", FilterOperator.EQ, oEmp));
                }
    
    
            // Executa filtro
            if (ofiltros){
                    oMapaCotacao.getBinding("items").filter(ofiltros);
                }

            // Setar as linhas da coluna como true
            oMapaCotacao.setVisible(true);

        },

        onClear: function() {
            var view = this.getView();
            view.byId("inputRFQ").setValue("");
            view.byId("inputFornecedor").setValue("");
            view.byId("inputOrg").setValue("");
            view.byId("inputGrupo").setValue("");
            view.byId("inputDoc").setValue("");
            view.byId("datePickerDocumento").setValue("");
            view.byId("inputEmpresa").setValue("");
        },

        onHelp: function(){
            MessageBox.information("As Cotações que já foram enviadas por e-mail e já cadastradas, poderão ser exibidas ao clicar no botão 'Cotações Enviadas'");
        },

        getCotacoes: function(oEvent){
            var oButton1 = oEvent.getSource(),
			oView = this.getView();

			if (!this._pDialogCotacoes) {
				this._pDialogCotacoes = Fragment.load({
					id: oView.getId(),
					name: "zmm.sap.zmm002.view.getCotacoes",
					controller: this
				}).then(function(oDialog){
					oView.addDependent(oDialog);
					return oDialog;
				});
			}

			this._pDialogCotacoes.then(function(oDialog){
				oDialog.open();
			}.bind(this));
        },

        
        //Ajuda de pesquisa para o RFQ Coletiva
        onInfoRFQ: function(oEvent){
            var oButton1 = oEvent.getSource(),
			oView = this.getView();

			if (!this._pDialogRFQ) {
				this._pDialogRFQ = Fragment.load({
					id: oView.getId(),
					name: "zmm.sap.zmm002.view.InfoRFQ",
					controller: this
				}).then(function(oDialog){
					oView.addDependent(oDialog);
					return oDialog;
				});
			}

			this._pDialogRFQ.then(function(oDialog){
				oDialog.open();
			}.bind(this));
        },

        //Botão Confirmar do Value Help - RFQ
        ConfirmRFQ: function (oEvent) {
			// reset the filter
            var inputRFQ = this.getView().byId("inputRFQ");
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([]);

			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				aContexts.map(function (oContext) { 
                    var ValueRFQ = oContext.getObject().Submi;
                    inputRFQ.setValue(ValueRFQ);
                });
			}

		},

        //Botão Pesquisar do Value Help - RFQ
        SearchRFQ: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Submi", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

        //Ajuda de pesquisa para os fornecedores.
        onInfoForn: function(oEvent){
            var oButton2 = oEvent.getSource(),
            oView = this.getView();

			if (!this._pDialogForn) {
				this._pDialogForn = Fragment.load({
					id: oView.getId(),
					name: "zmm.sap.zmm002.view.InfoForn",
					controller: this
				}).then(function(oDialog){
					oView.addDependent(oDialog);
					return oDialog;
				});
			}

			this._pDialogForn.then(function(oDialog){
				oDialog.open();
			}.bind(this));
        },

        //Botão Confirmar do Value Help - Fornecedores
        ConfirmForn: function (oEvent) {
			// reset the filter
            var inputFornecedor = this.getView().byId("inputFornecedor");
			var oBinding1 = oEvent.getSource().getBinding("items");
			oBinding1.filter([]);

			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				aContexts.map(function (oContext) { 
                    var ValueForn = oContext.getObject().Lifnr;
                    inputFornecedor.setValue(ValueForn);
                });
			}

		},
        
        //Botão Pesquisar do Value Help - Fornecedores
        SearchForn: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Lifnr", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

        

        // Ajuda de pesquisa para encontrar a Empresa
        Help1: function() {
            var inputEmpresa = this.getView().byId("inputEmpresa");
            var oSelectDialog = new sap.m.SelectDialog({
                title: "Empresas",
                items: [
                    new sap.m.StandardListItem({ title: "0100", description: "Ama Holding Ltda - Ribeirão Preto - BRL" }),
                    new sap.m.StandardListItem({ title: "0200", description: "Bom Sucesso Agroindústria - Goiatuba - BRL" }),
                    new sap.m.StandardListItem({ title: "0205", description: "Asolo Energia Renovável - Goiatuba - BRL" }),
                    new sap.m.StandardListItem({ title: "0300", description: "Tamboril Agro Ltda - Ribeirão Preto - BRL" })
                ],
                confirm: function(oEvent) {
                    var oSelectedItem = oEvent.getParameter("selectedItem");
                    if (oSelectedItem) {
                        var sSelectedValue = oSelectedItem.getTitle();
                        inputEmpresa.setValue(sSelectedValue);
                    }
                    this.oSelectDialog.close();
                },
                cancel: function(oEvent) {
                    this.oSelectDialog.close();
                }
            });
            oSelectDialog.open();
        },

        // Ajuda de pesquisa para o tipo de Documento
        Help2: function() {
            var inputDoc = this.getView().byId("inputDoc");
            var oSelectDialog = new sap.m.SelectDialog({
                title: "Tipo de Documento",
                items: [
                    new sap.m.StandardListItem({ title: "AB",  description: "Solicitação cotação" }),
                    new sap.m.StandardListItem({ title: "AN",  description: "Solicitação cotação" }),
                    new sap.m.StandardListItem({ title: "CPL", description: "Consulta de estoque" }),
                    new sap.m.StandardListItem({ title: "RAN", description: "Consulta de estoque" })
                ],
                confirm: function(oEvent) {
                    var oSelectedItem = oEvent.getParameter("selectedItem");
                    if (oSelectedItem) {
                        var sSelectedValue = oSelectedItem.getTitle();
                        inputDoc.setValue(sSelectedValue);
                    }
                    this.oSelectDialog.close();
                },
                cancel: function(oEvent) {
                    this.oSelectDialog.close();
                }
            });
            oSelectDialog.open();
        },

        // Ajuda de pesquisa para o Grupo de Compradores
        Help3: function() {
            var inputGrupo = this.getView().byId("inputGrupo");
            var oSelectDialog = new sap.m.SelectDialog({
                title: "Grupo de Compradores",
                items: [
                    new sap.m.StandardListItem({ title: "C10", description: "Material Indústria - (64)3051-5090" }),
                    new sap.m.StandardListItem({ title: "C15", description: "Serviços Indústria - (64)3051-5090"}),
                    new sap.m.StandardListItem({ title: "C20", description: "Agrícola - (64)3051-5090" }),
                    new sap.m.StandardListItem({ title: "C21", description: "Automotiva - (64)3051-5090" }),
                    new sap.m.StandardListItem({ title: "C30", description: "Controladoria - (64)3051-5090" }),
                    new sap.m.StandardListItem({ title: "C31", description: "Recursos Humanos - (64)3051-5090" }),
                    new sap.m.StandardListItem({ title: "C32", description: "Financeiro - (64)3051-5090" }),
                    new sap.m.StandardListItem({ title: "C40", description: "Materiais Projetos - (64)3051-5090" }),
                    new sap.m.StandardListItem({ title: "C45", description: "Serviços Projetos - (64)3051-5090" }),
                    new sap.m.StandardListItem({ title: "C50", description: "Administrativo - (64)3051-5090" }),
                    new sap.m.StandardListItem({ title: "C55", description: "Regularização - (64)3051-5090" })
                ],
                confirm: function(oEvent) {
                    var oSelectedItem = oEvent.getParameter("selectedItem");
                    if (oSelectedItem) {
                        var sSelectedValue = oSelectedItem.getTitle();
                        inputGrupo.setValue(sSelectedValue);
                    }
                    this.oSelectDialog.close();
                },
                cancel: function(oEvent) {
                    this.oSelectDialog.close();
                }
            });
            oSelectDialog.open();
        },

        // Ajuda de Pesquisa para Organização de Compras
        Help4: function() {
            var inputOrg = this.getView().byId("inputOrg");
            var oSelectDialog = new sap.m.SelectDialog({
                title: "Organização de Compra",
                items: [
                    new sap.m.StandardListItem({ title: "BSAG", description: "Org. Compras BSA" })
                ],
                confirm: function(oEvent) {
                    var oSelectedItem = oEvent.getParameter("selectedItem");
                    if (oSelectedItem) {
                        var sSelectedValue = oSelectedItem.getTitle();
                        inputOrg.setValue(sSelectedValue);
                    }
                    this.oSelectDialog.close();
                },
                cancel: function(oEvent) {
                    this.oSelectDialog.close();
                }
            });
            oSelectDialog.open();
        },

        //Função para abrir a caixa de confirmação de envio de email.
        getEmail: function(){

            var aSelectedItems = this.getView().byId("table").getSelectedItems();

            if (aSelectedItems.length === 0) {
                MessageBox.warning("Por favor, selecione pelo menos 1 linha para envio do email!");
                return;
            }
            
            if (!this.pDialogEmail) {
                this.pDialogEmail = this.loadFragment({
                name: "zmm.sap.zmm002.view.EnvioEmail"
                });
            }
            this.pDialogEmail.then(function (oDialog) {
                oDialog.open();
            });
        },

        //Botão de volta do Dialog
        voltarEmail: function () {
            if (!this.pDialogEmail) {
                this.pDialogEmail = this.loadFragment({
                name: "zmm.sap.zmm002.view.FileUploader"
                });
            }
            this.pDialogEmail.then(function (oDialog) {
                oDialog.close();
            });
        },
        
        // Função para pegar os dados das linhas selecionadas e enviar para o Backend
        getData: function() {
            
            var aSelectedItems = this.getView().byId("table").getSelectedItems();
            var Url = "/sap/opu/odata/SAP/ZMM_MAPA_COTACAO_SRV/";
            var oModel = new ODataModel({
                serviceUrl: Url
            });

            var vsubmi = [];
            var vebeln = [];
            var vlifnr = [];
            var vebelp = [];

            aSelectedItems.forEach(oItem => {
                const sContext = oItem.getBindingContext().sPath;
                const SelectedData = this.getView().getModel().getProperty(sContext);
                vsubmi.push(SelectedData.Submi);
                vebeln.push(SelectedData.Ebeln);
                vlifnr.push(SelectedData.Lifnr);
                vebelp.push(SelectedData.Ebelp);
            });

            oModel.callFunction("/getDados", {
                method: "GET",
                urlParameters:{
                    ebeln:vebeln,
                    lifnr:vlifnr,
                    submi:vsubmi,
                    ebelp:vebelp,
                },
                success: function (Response) {
                    MessageBox.success("Email enviado, verificar a SOST e o programa de 'Lista de cotações registradas' para conferir o envio!.");
                },
                error: function (Error) {
                    MessageBox.error("E-mail não enviado, verificar se cotação já foi enviada ou cadastrada ou se está disponivel para revisão!.");
                }
            });

            this.pDialogEmail.then(function (oDialog) {
                oDialog.close();
            });
        },

        // Botão para abrir o Dialog
        getImport: function(){
            
            if (!this.pDialogUpload) {
                this.pDialogUpload = this.loadFragment({
                name: "zmm.sap.zmm002.view.FileUploader"
                });
            }
            this.pDialogUpload.then(function (oDialog) {
                oDialog.open();
            });
        },

        // Botão para fechar o Dialog
        voltar: function () {
            if (!this.pDialogUpload) {
                this.pDialogUpload = this.loadFragment({
                name: "zmm.sap.zmm002.view.FileUploader"
                });
            }
            this.pDialogUpload.then(function (oDialog) {
                oDialog.close();
            });
        },
        
        //Função para ler o arquivo excel que vai ser importado
        onStartUpload: function(oItem, aHeaders) {
            var oAttachmentUpl = this.byId("attachmentUpl");
            var aIncompleteItems = oAttachmentUpl.getIncompleteItems();
            this.iIncompleteItems = aIncompleteItems.length; 
                if (this.iIncompleteItems !== 0) {
                oAttachmentUpl.setBusy(true);
                this.i = 0;
                    for (var i = 0; i < this.iIncompleteItems; i++) {
                        var sFileName = aIncompleteItems[i].getProperty("fileName");
                        var oXCSRFToken = new sap.ui.core.Item({
                        key: "X-CSRF-Token",
                        text: this.getOwnerComponent().getModel().getSecurityToken()
                        });
                        var oSlug = new sap.ui.core.Item({
                        key: "SLUG",
                        text: sFileName
                        });
                        oAttachmentUpl.addHeaderField(oXCSRFToken).addHeaderField(oSlug).uploadItem(aIncompleteItems[i]);
                        oAttachmentUpl.removeAllHeaderFields();
                    }
                }
        },
    
        //Função para executar o pós-envio.
        onUploadCompleted: function() {
            var Url = "/sap/opu/odata/SAP/ZMM_MAPA_COTACAO_SRV/";
            var oModelUpload = new ODataModel({
                serviceUrl: Url
            });
            this.i += 1;
            if (this.i === this.iIncompleteItems) {
                this.byId('attachmentUpl').setBusy(false);
                this.onClose();
            }

            oModelUpload.read("/ArquivoSet", {
                context: {},
                urlParamters: {},
                async: true,
                filters: [],
                sorters: [],
                success: function(data, response){
                    MessageBox.information("Cotação carregada, verificar o programa de 'Lista de Cotações registradas'");
                },
                error: function(oError){
                    MessageBox.Error("Cotação não atualizada, verificar arquivo enviado ou se a cotação já foi atualizada!")
                }
            });

        },  
        
        //Botão para fechar o Dialog ao finalizar o upload do arquivo.
        onClose: function(){
            if (!this.pDialogUpload) {
                this.pDialogUpload = this.loadFragment({
                name: "zmm.sap.zmm002.view.FileUploader"
                });
            }
            this.pDialogUpload.then(function (oDialog) {
                oDialog.close();
            });
        },
        

        handleSortButtonPressed: function () {

            var oTable = this.byId("table");
            if (!oTable.getVisible()) {
                MessageBox.warning("Realize a busca das cotações para exibir as ordenações.");
                return;
            }

            if (!this.pDialogSortItem) {
                this.pDialogSortItem = this.loadFragment({
                    name: "zmm.sap.zmm002.view.SelectionSort"
                });
            }

            this.pDialogSortItem.then(function (oSortItem) {
                oSortItem.open();
            });
        },

        handleSortDialogConfirm: function (oEvent) {
            var oTableSelect = this.byId("table"),
                mParams = oEvent.getParameters(),
                oBinding = oTableSelect.getBinding("items"),
                sPath,
                bDescending,
                aSorters = [];
            
            sPath = mParams.sortItem.getKey();
            bDescending = mParams.sortDescending;
            aSorters.push(new Sorter(sPath, bDescending));

            oBinding.sort(aSorters);
        },

        getFornecedores: function(oEvent){
            var oButton1 = oEvent.getSource(),
			oView = this.getView();

			if (!this._pDialogLifnr) {
				this._pDialogLifnr = Fragment.load({
					id: oView.getId(),
					name: "zmm.sap.zmm002.view.getFornecedores",
					controller: this
				}).then(function(oDialog){
					oView.addDependent(oDialog);
					return oDialog;
				});
			}

			this._pDialogLifnr.then(function(oDialog){
				oDialog.open();
			}.bind(this));
        },

    });
});     