class Inicio extends Phaser.Scene{
    constructor(){
        super({
            key: 'Inicio'
        });
    }

    init() {
        console.log('Escena Inicio');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('fondo', 'fondo.png');  
        this.load.image('nube1','nube.png'); 
        this.load.image(['play','info','conf','logo','sound','noSound','infoCuadro']);
        this.load.audio('pasar', ['./pop.mp3']);
        this.load.audio('InicioM', ['./InicioM2.mp3']);
    }

    create(){
        //Banderas
        this.click1 = false;
        this.click2 = false;
        this.noSound = false;
        //Imagen de fondo
        this.fondo = this.add.image(800,370, 'fondo').scaleX=1.25;
        this.logo = this.add.image(750,100, 'logo').setScale(.25).setDepth(4);
        this.play = this.add.image(750,300, 'play').setScale(.25).setInteractive().setDepth(4);
        this.config = this.add.image(200,620, 'conf').setScale(.25).setInteractive().setDepth(4);
        this.info = this.add.image(1300,620, 'info').setScale(.25).setInteractive().setDepth(4);
        this.infoCuadro = this.add.image(1300,380, 'infoCuadro').setScale(.42).setDepth(4).setAlpha(0);
        this.soundIcon = this.add.image(300,500, 'sound').setScale(.25).setInteractive().setDepth(4).setAlpha(0);
        this.noSoundIcon = this.add.image(400,620, 'noSound').setScale(.25).setInteractive().setDepth(4).setAlpha(0);
        // Musica de fondo
        this.mainmenu = this.sound.add('InicioM', {loop:false,volume: 0.8});
        this.mainmenu.play();
        //MÚSICA PASAR SOBRE TARJETA
        this.pasar = this.sound.add('pasar', {loop:false,volume: 0.3});
        //CONSTANTE EVENTOS
        const eventos = Phaser.Input.Events;
        //Nubes derecha
        this.nube1 = this.add.image(-200,150, 'nube1').setAlpha(0.2).setScale(0.6);
        this.nube2 = this.add.image(50,150, 'nube1').setAlpha(0.2).setScale(0.3);
        this.nube3 = this.add.image(200,600, 'nube1').setAlpha(0.2).setScale(0.6);
        this.nube6 = this.add.image(90,580, 'nube1').setAlpha(0.2).setScale(0.2);
        this.nube7 = this.add.image(-90,580, 'nube1').setAlpha(0.2).setScale(0.8);
        this.nube9 = this.add.image(-50,460, 'nube1').setAlpha(0.2).setScale(0.3);

        //Nube izquierda
        this.nube4 = this.add.image(1800,580, 'nube1').setAlpha(0.2);
        this.nube5 = this.add.image(1500,360, 'nube1').setAlpha(0.2).setScale(0.5);
        this.nube8 = this.add.image(1600,50, 'nube1').setAlpha(0.2).setScale(0.3);
        this.timeline = this.tweens.createTimeline(); 
        this.timeline2 = this.tweens.createTimeline(); 

        this.timeline = this.tweens.timeline({
            targets: [this.nube1,this.nube2,this.nube3,this.nube6,this.nube7,this.nube9],
            paused: true,
            loop: -1,
            totalDuration: 80000,
            tweens: [
                {
                    x: 1800,
                    yoyo:true,
                    repeat:-1,
                },
            ]
        });
        this.timeline.play();

        this.timeline2 = this.tweens.timeline({
            targets: [this.nube4,this.nube5,this.nube8],
            paused: true,
            loop: -1,
            totalDuration: 90000,
            tweens: [
                {
                    x: -300,
                    yoyo:true,
                    repeat:-1,
                },
            ]
        });
        this.timeline2.play();
        
        //EVENTOS PARA MOUSE
        this.input.on(eventos.GAMEOBJECT_OVER,(event,gameObject)=>{
            gameObject.setScale(.3);
        });
        this.input.on(eventos.GAMEOBJECT_OUT,(event,gameObject)=>{
            gameObject.setScale(.25);
        });
        this.input.on(eventos.GAMEOBJECT_DOWN,(event,gameObject)=>{
            if(this.noSound == false){
                this.pasar.play();
            }
        });
        //EVENTO SÓLO PARA PLAY
        this.play.on(eventos.POINTER_DOWN, function () {
            console.log('Se dió click en play');
            //this.pasar.play();
            this.scene.start("EscenaParque");
            // this.mainmenu.stop();
            this.sound.pauseAll();
        }, this);
        //EVENTO SÓLO PARA PLAY
        this.config.on(eventos.POINTER_DOWN, function () {
            console.log('Se dió click en config');
            if(this.click1 == false)
            {
                this.click1 = true;
                this.soundIcon.setAlpha(1);
                this.noSoundIcon.setAlpha(1);
                console.log(this.click1)
            }else{
                this.click1 = false;
                this.soundIcon.setAlpha(0);
                this.noSoundIcon.setAlpha(0);         
            }
        }, this);
        //EVENTO SÓLO PARA INFO
        this.info.on(eventos.POINTER_DOWN, function () {
            if(this.click2 == false){
                this.infoCuadro.setAlpha(1);
                this.click2 = true;
            }else{
                this.infoCuadro.setAlpha(0);
                this.click2 = false;
            }
        }, this);
        //EVENTO SÓLO PARA SOUND
        this.soundIcon.on(eventos.POINTER_DOWN, function () {
            console.log('Se dió click en Sound');
            this.noSound = false;
            this.mainmenu.play();
        }, this);
        //EVENTO SÓLO PARA NO SOUND
        this.noSoundIcon.on(eventos.POINTER_DOWN, function () {
            console.log('Se dió click en noSound');
            this.noSound = true;
            this.mainmenu.stop();
        }, this);
    }

    update(time, delta) {
        // ESTA FUNCION CREA UN CICLO INFINITO
    }
}

export default Inicio;