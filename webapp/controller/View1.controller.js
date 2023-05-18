//SAP UI5 carrega bibliotecas sob demanda (com foco em performance)
//Adicione as bibliotecas que vc quer utilizar
//Temos uma biblioteca já definida (linha6) e vamos adicionar outra para a execuçao daURL (linha7)
//No ABAP chamamos isso de includes
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel" //Declaraçao 
],
    /**
     * Após declarar a biblioteca na linha 5, precisamos inicializar essa biblioteca.
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.library} library
     * @param {typeof sap.ui.model.json.JSONModel} JSONmodel
     */
    
    function (Controller, library, JSONmodel) {  //inicializaçao
        "use strict";

       var urlObject = library.URLHelper;
       //vamos usar essa variavel dentro da nossa funçao onClickImg

        return Controller.extend("Consulta.Produtos.projetocodigobarras.controller.View1", {
            onInit: function () {  //onInit equivale a INITIALIZATION no ABAP (rotina executada automaticamente)
               let produto = {}; //criamos uma variável vazia porque inicialmente o objeto estará vazio. Inicializada com nenhum conteúdo
               let productModel = new JSONmodel(produto);  // criaçao do nosso MODELO JSON pelo controller (nao mais no manifest)
                                                                             // entre aspas, defini o nome do modelo, se eu deixo em branco
                                                                             // seria um modelo sem nome
                                                                             // esse modelo tem que responder o conteúdo da variavel retorno que tá lá embaixo  
                                                                             // esse modelo já está sendo exibido na tela e passará a exibir os dados da variavel retorno 
        // Esse JSONModel tem um parametro de inicializaçao (construtor - parametro inicial - a variável vazia)                  
        // Agora precisamos associar esse modelo à tela, fazer a vinculaçao do Model na View. O productModel deve
        //passar a existir dentro da view1.view.xml: this no javascript é igual o ME-> no ABAP (comando para que a classe se referencia a si mesma).
        // vamos entao usar o this.getView() e assim o controlador vai pegar a View correspondete e vamso guardar em uma variável.        
                let view = this.getView();
        // temos agora a instancia da view na nossa variável e, atarves da instancia da view, vamos configurar o modelo:
                view.setModel(productModel, "ModeloProdutos");
        // Com isso estamos vinculando o modelo que criamos à view (á tela). E dentro do modelo temos uma variável vazia (produto).
        //Agora que inicializamos o modelo vazio, vamos implementar a API.
        //Vamos consultar a API, pegar os dados da API e colocar dentro desse modelo.
        //Em vez de preenchermos o modelo com o dado do arquivo (que copiamos e colamos na aula passada), vamos preencher o modelo com os dados da API
        //Vamos para dentro da funçao onPressBuscar porque a API vai ser chamada quando clicarmos no botao.


        
                

            },

           //logica do evento ativado com o botao
           //após function () Parentese - Parametros {} Chaves - Corpo da funçao com a logica de programaçao
            onPressBuscar: function(){
                let input; 
                input = this.byId("inputBusca");
                let valor = input.getValue();
                //alert(valor);

                //Chamada de API: temos cabeçalho, alguns parametros, corpo e alguns parametros de corpo.
                //Vamos criar uma variavel com esses parametros (que vao ser enlecados dentro do Corpo criado com Chaves):
                //Definindo os parametros de cabeçalho da API
                let parameters = {
                    url : "https://world.openfoodfacts.org/api/v2/product/" + valor, //o valor digitado que pegamos através do input
                    method : "GET", //GET é o parametro de leitura. POST criar, PUT alterar e etc. Quando vc se comunica com um servidor da web vc avisa o que vc quer fazer CRUDQ
                    async : true, //comunicaçao assíncrona
                    crossDomain : true //    
                };

              

                // Agora vamos chamar a API através de um conjunto de comandos da WEB chamado AJAX
                // Isso vai disparar a nossa chamada no servirod. Ping.
                $.ajax(parameters).done(function(retorno){
                             //para passar o retorno para o modelo vamos ter 1º a instancia do modelo 
                            // porque as variaveis sao locais. Criamos o modelo com o setModel lá em cima
                            // agora, para resgatar o modelo, daremos o comando invertido: getModel
                    let oDadosModel = this.getView().getModel("ModeloProdutos");
                    //clear - limpa a tela
                    oDadosModel.setData({});
                    //Atualiza o modelo
                    oDadosModel.refresh();
                    //Repassa o conteúdo do promisse para o modelo
                    oDadosModel.setData(retorno);
                    oDadosModel.refresh();

                }.bind(this)) //nao funcionou por conflito de escopos, para anexar essa funçao ao escopo global para que a funçao possa ter acesso às variáveis globais
                    //vamos usar o comando .bind.(this) // This = ME do abao //
                   //done indica que foi encerrada com sucesso
                .fail(function(){   

                    debugger//aqui vc coloca sua msg de rro
                }.bind(this)); //isso é um tratamento de erro, como se fosse o exception

                //Atraves desse comando o programa vai entender que vai fazer uma chamada com os parametros passado.
                //Através desse comando, vimos com o debugger que conseguimos fazer a chamada GET
                //Agora precisamos somente tratar o retorno
                //promisse: quando uma funçao retorna como parametro de exportaçao outra funçao - nao existe no ABAP 
                //ABAP seria como se um modulo de funçao retornasse outro modulo de funçao 
                //para tratar o retorno vamos colocar na linha 69 .done() porque passaremos algo dentro dos parenteses 
                //done significa que a funçao foi encerrada com sucesso.
                //na linha debaixo coloca .fail()
                // done: sucesso; fail: erro.
                // como o promisse retorna uma funçao, colocamos o comnado function (){} dentro deles.
                // relembra que o retorno retorna como parametro da funçao, entao criamos uma variavel retorno que 
                // sera preenchida com os dados da api
                //E agora vamos mostrar esses dados na tela, para isso temos que passar os dados da variavel retorno
                //para o modelo
                //FUNCIONOU :)
                //







               
                //variavel tipo texto - string - aspas duplas ou simples
                let material = "Agua Mineral Natural";
                let unmedida = 'ml';
                //variavel tipo numerico inteiro 
                let quantidade = 500;
                // variavel tipo casas decimais 
                let qtdsodio = 0.05;
                // booleano
                let liguido = true;

                //tabela interna no java script (array) - COLCHETES com cada conteúdo 
                //separado por virgula - c
                // vamos faezr uma tabela interna de 3 linhas - 3 registros:
                let composiçao = ["magnesio", "sulfato", "bicarbonato"];
                //estrutura - com várias propriedades - 1 linha com várias colunas.
                //ou tambem chamado de objeto - objeto com 4 propriedades (estrutura de dados)
                // aqui usamos CHAVES - objeto estruturado.
                let produto = {
                    descricao: "chá verde",
                    marca: "quacker",
                    peso: 130,
                    unmedida: "granas"
                } 
            },
            //evento press traz automaticamente um parametro opcional que faz referencia ao objeto que foi clicado.
            //esse parametro serve para saber qual elemento de tela que está chamando a funçao 
            //você pode passar esse objeto com qlq nome, usamos oEvent (Objeto do Evento)            
            onClickImg: function(oEvent){
                urlObject.redirect(oEvent.getSource().getSrc()), true;
                //ele vai retornar o objeto image (getSource) e a URL vinculada ao objeto image (ambos 
                //estao na view1.xml). Passa true para que ele abra em uma nova janela.


            } 
        });
    });
