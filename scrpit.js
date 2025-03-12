//pegar o elemento canvas pelo id
const canvas = document.getElementById('joguinhoClass')
//inicializar o canvas
const ctx = canvas.getContext('2d')

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && personagem.pulando==false) {
        personagem.velocidadey = 21
        personagem.pulando = true
    }
})

class Entidade {

    #gravidade
    constructor(x, y, w, h, img, gravidade) {
        this.x = x;
        this.y = y - h;
        this.w = w;
        this.h = h;
        this.img = img;
        this.#gravidade = gravidade;
    }
        get gravidade() {
            return this.#gravidade;
        }
        set gravidade(gravidade) {
            this.#gravidade = gravidade;
        } 
    

    draw() {
        
    }
    desenhar(){
        ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.w,
        this.h,
        )
    }
    desenhar(cor){
        ctx.fillStyle = cor
        ctx.fillRect(
        this.x,
        this.y,
        this.w,
        this.h,
        )
    }


}

class personagem extends Entidade {

    constructor(x, y, w, h, img, gravidade, speedY) {
        super(x, y, w, h, img, gravidade);
        this.speedY = speedY;
    }

    

}
class obstaculo extends Entidade {
    constructor(x, y, w, h, img, gravidade, speedX) {
        super(x, y, w, h, img, gravidade);
        this.speedX = speedX;
    }
}
const mainC = new personagem(0, 480, 50, 50, "", 1, 0)
function loop () {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    mainC.desenhar('red')
  

     
    
    requestAnimationFrame(loop)

}
loop()
