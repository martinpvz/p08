class EscenaParque extends Phaser.Scene{
    constructor(){
        super({
            key: 'EscenaParque'
        });
    }

    init() {
        console.log('Escena EscenaParque');
    }
    preload() {
        this.load.path = './assets/';
        //IMÁGENES      
        this.load.image('fondopark2', 'fondopark2.jpg');
        this.load.image('chihuahua', 'chihuahua4.png');
        this.load.image('abeja', 'bee.png');
        this.load.image('huesito', 'bone.png');
        this.load.image('hidrante', 'hidrante.png');
        this.load.image('instrucciones', 'instrucciones.png');
        this.load.image('corazon', 'heart.png');
        // AUDIO
        this.load.audio('Parque', ['./Parque2.mp3']);
        //CONSTANTE DE TECLADO E INPUTS
        const teclado = Phaser.Input.Keyboard.KeyCodes;
        this.d = this.input.keyboard.addKey(teclado.D);
        this.a = this.input.keyboard.addKey(teclado.A);
        this.saltar = this.input.keyboard.addKey(teclado.SPACE);
        this.salir = this.input.keyboard.addKey(teclado.ESC);
    }

    create() {
        //FONDO
        this.fondo = this.add.image(750, 360, 'fondopark2').setScale(2.2).setDepth(0);
        //INSTRUCCION
        this.instrucciones = this.add.image(750, 680, 'instrucciones').setScale(.17).setDepth(4);
        this.cora= this.add.image(1330, 50, 'corazon').setScale(.3).setDepth(1);
        this.cora2= this.add.image(1380, 50, 'corazon').setScale(.3).setDepth(1);
        this.cora3= this.add.image(1430, 50, 'corazon').setScale(.3).setDepth(1);

        this.parque = this.sound.add('Parque', {loop:false,volume: 0.5});
        this.parque.play();
        
        this.physics.world.setBounds(0, 0, 1500, 640, true, true, true, true);

        this.huesito = this.physics.add.group({
            key: 'huesito',
            repeat: 5,
            setXY: {
                x: 1000,
                y: 550,
                stepX: 50
                }
            });

        this.chihuahua = this.physics.add.group({
            key: 'chihuahua',
            // repeat: 5,
            setXY: {
                x: 500,
                y: 590,
                // stepX: 50
                },
            });
        
        this.hidrante = this.physics.add.group({
            key: 'hidrante',
            // repeat: 5,
            setXY: {
                x: 100,
                y: 595,
                // stepX: 50
                }
            });

        this.abejas = this.physics.add.group({
            key: 'abeja',
            repeat: 1,
            setXY: {
                x: 100,
                y: 450,
                stepY: -60,
                stepX:300
                }
            });

        this.huesito.children.iterate( (hueso) => {
                hueso.setScale(0.1);
                hueso.setAngle(45);
                hueso.body.setAllowGravity(false);
            } );

        this.chihuahua.children.iterate( (chihuahua) => {
                chihuahua.setScale(1.2);
                // chihuahua.body.setAllowGravity(false);
                chihuahua.setCollideWorldBounds(true);
                chihuahua.onWorldBounds = true;
                chihuahua.setBounce(0, 0);
                // chihuahua.setFriction(10);
            } );

        this.hidrante.children.iterate( (hidrante) => {
                hidrante.setScale(0.5);
                // hidrante.body.setAllowGravity(false);
                // hidrante.setVelocity(10,10);
                // hidrante.setBounce(1, 1);
                // hidrante.setFriction(1);
                hidrante.setCollideWorldBounds(true);
            } );

        this.abejas.children.iterate( (abejas) => {
            abejas.setScale(0.2);
            abejas.body.setAllowGravity(false);
            abejas.setCollideWorldBounds(true);
        } );

        this.add.tween({
            targets: this.huesito.getChildren(),
            y: 520,
            yoyo: true,
            duration: 500,
            repeat: -1,
            easy: 'Power1'
            });

    
        this.add.tween({
            targets: this.abejas.getChildren(),
            x: 1200,
            yoyo: true,
            duration: 8000,
            repeat: -1,
            easy: 'Power1',
            onYoyo: () => {
                this.abejas.children.iterate( (abeja) => {
                    abeja.flipX = 1;
                    } );
                },
            onRepeat: () => {
                this.abejas.children.iterate( (abeja) => {
                    abeja.flipX = 0;
                    } );
                }
            });

        
        // this.bandera=0;
        // this.huesito.getChildren()[1].destroy();
    }
    
    update(time, delta) {
        // ESTA FUNCION CREA UN CICLO INFINITO
        var bandera;
        if(this.abejas.getChildren()[0].y>600){
            this.abejas.getChildren()[0].disableBody(true,true);
        }
        function choque(hueso, chihuahua) {
            // moneda.kill();
            // this.huesito.getChildren()[1].destroy();
            //this.tomarhueso.play();
            hueso.disableBody(true, true); //De aqui saque disableBody http://phaser.io/tutorials/making-your-first-phaser-3-game/part9
            // this.huesito.destroy();
            chihuahua.clearTint();

        }
        
        function choqueAbeja(chihuahua, abeja) {
            chihuahua.setTint(0xff0000);
            // bandera+=1;
            // console.log(bandera);
            // quitarCora();
        }
        
        // if(bandera>0){
        //     this.cora.setAlpha(0);
        // }

        function choqueHidrante(chihuahua, hidrante) {
            chihuahua.clearTint()
        }

        if( this.salir.isDown ){
            this.scene.start("Inicio");
            // this.mainmenu.stop();
            this.sound.pauseAll();
        }

        if( this.d.isDown ){
            this.chihuahua.children.iterate( (chihuahua) => {
                        chihuahua.x += 3;
                        chihuahua.flipX= 0;
            } );
        }
        if( this.a.isDown ){
            this.chihuahua.children.iterate( (chihuahua) => {
                        chihuahua.x -= 3;
                        chihuahua.flipX= 1;
            } );
        }
        if( this.saltar.isDown ){
            this.chihuahua.children.iterate( (chihuahua) => {
                        chihuahua.y -= 8;
            } );
        }
        this.physics.add.collider(this.huesito, this.chihuahua);
        this.physics.add.collider(this.chihuahua, this.hidrante);
        this.physics.add.collider(this.chihuahua, this.abejas);
        this.physics.collide(this.huesito, this.chihuahua, choque);
        this.physics.collide(this.chihuahua, this.abejas, choqueAbeja);
        this.physics.collide(this.chihuahua, this.hidrante, choqueHidrante);

    }
    
    
}

export default EscenaParque;