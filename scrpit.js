//pegar o elemento canvas pelo id
const canvas = document.getElementById('joguinhoClass')
//inicializar o canvas
const ctx = canvas.getContext('2d')



class Entidade {

    #gravidade
    constructor(x, y, w, h, img, gravidade) {
        this.x = x;
        this.y = y;
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
    desenhar(cor, height){
        ctx.fillStyle = cor
        ctx.fillRect(
        this.x,
        this.y - height,
        this.w,
        this.h,
        )
    }


}

class Personagem extends Entidade {
    #speedY
    #pulando
    constructor(x, y, w, h, img, gravidade) {
        super(x, y, w, h, img, gravidade);
        this.#speedY = 21;
        this.#pulando = false;

    }
    get speedY() {
        return this.#speedY;
    }
    set speedY(speedY) {
        this.#speedY = speedY;
    }
    get pulando() {
        return this.#pulando;
    }
    set pulando(pulando) {
        this.#pulando = pulando;
    }

    saltar(){
        this.y -= this.speedY
        this.speedY -= this.gravidade
        if(this.y >= 430){
            this.pulando = false
            this.y = 430
        }
    }

    

}
class Obstaculo extends Entidade {

    constructor(x, y, w, h, img, gravidade, speedX) {
        super(x, y, w, h, img, gravidade);
        this.speedX = speedX;
    }

    move(){
        this.x -= this.speedX
        if(this.x <= -this.w){
            this.x = canvas.width
            let newHeight = (Math.random()) * 100
            this.h = newHeight
        }
    
    }
}
const mainC = new Personagem(60, 480, 50, 50, "", 1, 0)
const Hit1 = new Obstaculo(720, 480, 50, 100, "", 0, 15)
document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && mainC.pulando==false) {
        
        mainC.pulando = true
        mainC.speedY = 21
    }
})
function colisao() {
if (
    mainC.x + mainC.w >  canvas.width - Hit1.x && 
    mainC.x < canvas.width - Hit1.x + Hit1.w &&
    mainC.y + mainC.h >canvas.height - Hit1.h){
    return true;}
    else {
return false; 
    }}
function loop () {

    ctx.clearRect(0,0,canvas.width,canvas.height)
    mainC.desenhar('red', 0)
    Hit1.desenhar('green', Hit1.h)
    mainC.saltar()
    Hit1.move()
    if (colisao() == true){
        alert('colidiu')
        mainC.y = 430
        Hit1.x = canvas.width
        Hit1.h = 100
        
    }
     
    
    requestAnimationFrame(loop)

}
loop()
