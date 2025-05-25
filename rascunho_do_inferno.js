exibeMenu()
selecionaAOpcao()
	novaPagina()
		criarPersonagem()
		selecionarPersonagem()
			comecaAventura()
				sorteiaClima()
				sorteiaTerreno()
					sorteiaCaracteristicaUnica()					
				sorteiaCidade()
					sorteiaNomeCidade()
					sorteiaTamanhoCidade()
					sorteiaTipoCidade()
				defineDificuldade() // sempre começa em fácil
				defineBesta()
					sorteia(dificuldade)
					sorteiaElemento(terreno)
					sorteiaFraqueza(elemento)
					sorteiaFuria()
					carregaAtributos()
						emFuria = false
						tamanho = 2 // metros
						vida = 10
						maxVida = 15
						ataqueAtual = 3						
						caracteristica = {
							descricao: "bolda de fogo",
							efeito: 
						}
						partes = {
							cabeca = { sensivel : true, altura : 1, sensibilidade: defineSensibilidade(sensivel), couraca: 30, danoSofrido: 0 },
							tronco = { sensivel : false, altura : 1, sensibilidade: defineSensibilidade(sensivel), couraca: 30, danoSofrido: 0 },
							patas = { sensivel : true, altura : 1, sensibilidade: defineSensibilidade(sensivel), couraca: 30, danoSofrido: 0 },
							caudas = { sensivel : false, altura : 1, sensibilidade: defineSensibilidade(sensivel), couraca: 30, danoSofrido: 0 }
						}
						ataquesDisponiveis = [null,null,ataqueEspecia, ataqueFodase, null, null]
						defineOutrosAtaques(ataquesDisponiveis)
							sorteiaNovosAtaquesParaEspacosVazios
						equipamentosForjaveis = [{ parte : cabeca, objeto : escudoDosDeuses }, { parte : patas, objeto : chineloHavaianas }]
				iniciaFase()
					exibeInformacoesPersonagem()
					exibeInformacoesCidade()
					permiteAbrirInventario()
					iniciaInvestigacao()
						obterInformacoes()
						exibeInformacoesObtidas()
						iniciarCacada()
							rastrearBesta()
								contadorDeRastros = 0
								sorteiaAtividadeDoDia() // define o que foi encontrado
									se atacado_animal 
										sorteiaAnimal(terreno)
										comecarLuta()
									se econtrou_item
										sorteiaItem(terreno)
										adicionaNoInventario()
									se encontrar_rastro
										contadorDeRastros++;
									se contadorDeRastros >= 3
										lutarContraBesta(atacaPrimeiro = true)
									se foiEncontradoPelaBesta
										lutarContraBesta(atacaprimeiro = false)
								sorteiaAtividadeDaNoite() // define o quanto recuperou de vida
									se atacado_animal
										sorteiaAnimal(terreno)
										comecarLuta()