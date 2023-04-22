let danoTotal = [];
let historico = [];
let media = 0;
let ativo = false;
let critico = false;
let up = false;
audio = new Audio("/audio/chainsawSoundEffect.mp3");

function paudio(onButton){
    if(onButton==true){
        audio.currentTime=0;
        audio.autoplay=true;
        audio.loop=true;
        audio.play();
    } else {
        audio.autoplay=false;
        audio.loop=false;
        audio.pause();
    }
}

function rolarDados(){
   
    let d1 = Math.floor(Math.random()*6)+1;
    let d2 = Math.floor(Math.random()*6)+1;
    let d3 = Math.floor(Math.random()*6)+1;

    d1 = isExtraDmg(d1);
    d2 = isExtraDmg(d2);
    d3 = isExtraDmg(d3);

    let dano = d1+d2+d3;

    //maldição
    if(up==true){
        let d8 = Math.floor(Math.random()*8)+1;
        dano += d8;
    }

    //critico
    if(critico==true){
        dano = dano*2;
    }

    String(dano);

    document.getElementById("ultDano").innerHTML = "Ultimo dano rolado: "+dano;

    //media do dano
    danoTotal.push(dano);
    if(dano<10){
        historico.unshift("_" + dano + "DMG ")
    } else{
        historico.unshift(dano + "DMG ");
    }

    if(historico.length%3==0){
        historico[0] = historico[0].replace(' ', '\n');
    }

    //apagar historico muito alto
    if(historico.length>=100){
        historico.pop();
    }

    for(let i = 0; i<danoTotal.length; i++){
        media += danoTotal[i];
    }

   media = media/danoTotal.length;
    
   document.getElementById("danoMedio").innerHTML = 'O dano medio foi: '+media.toFixed(2);
   media=0;

   //maior numero

   document.getElementById("maiorDano").innerHTML = "O maior dano foi: "+Math.max.apply(Math, danoTotal);

   //menor numero

   document.getElementById("menorDano").innerHTML = "O menor dano foi: "+Math.min.apply(Math, danoTotal);

   if(ativo==true){
    document.getElementById("historico").innerHTML = historico.join();
   }
}

function cemDados(){
    for(let i = 1; i<=100;i++){
        rolarDados();
    }
}

function isExtraDmg(dado) {

    if (dado == 6) {
        let extra;
        let total;

        do {
            let extra = Math.floor(Math.random() * 6) + 1;
            total = dado + extra;
        } while (extra == 6);

        return total;
    } else {
        return dado;
    }
}

function hist(){
    if(ativo==false){
        ativo=true;
        document.getElementById("historico").innerHTML = historico.join();
    } else {
        ativo=false;
        document.getElementById("historico").innerHTML = " ";
    }
}

function ativarCritico(){
    if(critico == false){
        critico = true;
        document.getElementById("btnCritico").innerHTML = "Desativar dano critico"
    } else {
        critico = false;
        document.getElementById("btnCritico").innerHTML = "Ativar dano critico"
    }
}

function reset(){
    danoTotal.length=0;
    historico.length=0;
    document.getElementById("ultDano").innerHTML = "Ultimo dano rolado: ";
    document.getElementById("danoMedio").innerHTML = "O dano medio foi: ";
    document.getElementById("maiorDano").innerHTML = "O maior dano foi: ";
    document.getElementById("menorDano").innerHTML = "O menor dano foi: ";
    document.getElementById("historico").innerHTML = " ";
    document.getElementById("motoserraImg").src = "/img/motoserra.png"
    up=false;
}

function upgrade(){
    if(up==false){
        up=true;
        document.getElementById("motoserraImg").src = "/img/motoserra2.png"
    } else {
        up=false;
    }
}