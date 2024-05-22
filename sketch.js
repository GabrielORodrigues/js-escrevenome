function setup() {
    createCanvas(600, 400);
    trilha.loop();
  }
  
  ///Informações Da Bolinha
    //Variáveis Da Bolinha
      let xBolinha = 290;
      let yBolinha = 195;
      let diametro = 23;
      let raio = diametro / 2;
  
    //Velocidade Da Bolinha
      let velocidadeXBolinha = 6;
      let velocidadeYBolinha = 6;
  
  ///Informação Da Raquete
    //Variáveis Da Raquete
      let xRaquete = 5;
      let yRaquete = 150;
      let raqueteComprimento = 10;
      let raqueteAltura = 90;
  
    //Variavel Do Oponente
      let xRaqueteOponente = 585;
      let yRaqueteOponente = 150;
      let velocidadeYOponente;
  
      let colidiu = false; 
  
  ///Placar Do Jogo
      let meusPontos = 0;
      let pontosDoOponente = 0;
  
  ///Sons Do Jogo
      let raquetada;
      let ponto;
      let trilha;
  
  function preload(){
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
  }
      
  function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    //verificaColisãoRaquete();
    verificaColisãoRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    verificaColisãoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
  }
  
  function mostraBolinha(){
    circle(xBolinha, yBolinha, diametro);
    
  }
  
  function movimentaBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
    
  }
  
  function verificaColisaoBorda(){
    if (xBolinha + raio > width ||
        xBolinha - raio < 0){
       velocidadeXBolinha *= -1;
    }
    
    
    if (yBolinha + raio > height ||
        yBolinha - raio < 0){
       velocidadeYBolinha *= -1;
    }
  }
  
  function mostraRaquete(x, y){
    rect(x, y, raqueteComprimento, raqueteAltura);
    
  }
  
  function movimentaMinhaRaquete(){
    if (keyIsDown(UP_ARROW)){
      yRaquete -= 10;
    }
    
    if (keyIsDown(DOWN_ARROW)){
      yRaquete += 10;
    }
    
  }
  //    !!!
  function verificaColisãoRaquete(){
    if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
      velocidadeXBolinha *= -1;
      raquetada.play();
      
    }
  }
  //    !!!
  
  function verificaColisãoRaquete(x, y){
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if(colidiu){
      velocidadeXBolinha *= -1;
      raquetada.play();
    }
  }
  
  function movimentaRaqueteOponente(){
      if (keyIsDown(87)){
      yRaqueteOponente -= 10;
    }
    
    if (keyIsDown(83)){
      yRaqueteOponente += 10;
    }
    
  }
  
  function incluiPlacar(){
    stroke(255)
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
  }
  
  function marcaPonto(){
    if(xBolinha > 585){
      meusPontos += 1;
      ponto.play();
    }
    if(xBolinha < 10){
      pontosDoOponente += 1;
      ponto.play();
    }
  }