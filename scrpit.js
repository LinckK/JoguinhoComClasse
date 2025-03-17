const canvas = document.getElementById('joguinhoClass');
const ctx = canvas.getContext('2d');
let gameOver = false;
let obstaculos = [];




document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && !mainC.pulando) {
        mainC.saltar();
    }
});

class Entidade {
    #gravidade;
    constructor(x, y, w, h, gravidade) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.#gravidade = gravidade;
    }

    get gravidade() {
        return this.#gravidade;
    }

    desenhar(cor, offsetY) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y - offsetY, this.w, this.h); 
    }
}

class Personagem extends Entidade {
    #pulando;
    #velocidadeY;
    constructor(x, y, w, h, gravidade) {
        super(x, y, w, h, gravidade);
        this.#pulando = false;
        this.#velocidadeY = 0;
    }

    saltar() {
        this.#velocidadeY = 20; 
    }

    get pulando() {
        return this.#pulando;
    }

    atualizarPersonagem() {
        if (this.#pulando) {
            this.#velocidadeY -= this.gravidade; 
            this.y -= this.#velocidadeY;
            if (this.y >= canvas.height - 50) {
                this.#velocidadeY = 0;
                this.#pulando = false;
                this.y = canvas.height - 50; 
            }
        }
    }
}


class Obstaculo extends Entidade {
    constructor(x, y, w, h, velocidadeX ) {
        super(x, y, w, h, 0);
        this.velocidadeX = velocidadeX;
        this.obstaculos = [
            {x: this.x,  y: this.y, h: this.h}
        ]
    }

    atualizarObstaculo() {
        this.obstaculos.forEach(element => {
            element.x = element.x + this.velocidadeX
        });
        if (this.obstaculos[this.obstaculos.length-1].x + this.w < 320){
            this.obstaculos.push({x:  canvas.width, y: this.y, h: Math.random()* 50 +this.h})
        }
        if (this.obstaculos[0].x <= 0){
            this.obstaculos.shift()
        }
    }
    desenhar(cor) {
        console.log("obstaculo", this.obstaculos)
        this.obstaculos.forEach(element => {
            ctx.fillStyle = cor;
            ctx.fillRect(element.x, element.y, this.w, element.h);
        });
    }

}
const mainC = new Personagem(60, 480, 50, 50, 0)
const Hit1 = new Obstaculo(720, 480, 50, 20, 7)
function verificarColisao(personagem, obstaculos) {
    let margem = 10;
    obstaculos.forEach(element => {
        if (
            personagem.x + personagem.w - margem > element.x &&
            personagem.x + margem < element.x + element.w &&
            personagem.y + personagem.h - margem > element.y &&
            personagem.y + margem < element.y + element.h
        ) {
            gameOver = true;
        }
    });
    }


function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mainC.atualizarPersonagem();
        Hit1.atualizarObstaculo();
        mainC.desenhar('black', 0);
        Hit1.desenhar('green'); 
        verificarColisao(mainC, Hit1.obstaculos);
        requestAnimationFrame(loop); 
    }
    else{
        alert("Game Over!");
    }
}

loop();
    