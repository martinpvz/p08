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
        this.load.image('fondopark2', 'fondopark2.jpg');
        this.load.image('chihuahua', 'chihuahua3.png');
        this.load.image('huesito', 'bone.png');
        this.load.image('hidrante', 'hidrante.png');
        this.load.atlas('monedas', 'moneda/monedas.png', 'moneda/monedas_atlas.json');
        this.load.animation('monedaAnim','moneda/monedas_anim.json');
        // AUDIO
        this.load.audio('Parque', ['./Parque.mp3']);
        this.load.audio('pasar', ['./pop.mp3']);

        const teclado = Phaser.Input.Keyboard.KeyCodes;
        this.d = this.input.keyboard.addKey(teclado.D);
        this.a = this.input.keyboard.addKey(teclado.A);
        this.saltar = this.input.keyboard.addKey(teclado.SPACE);
        this.salir = this.input.keyboard.addKey(teclado.ESC);
    }

    create() {
        // this.grupo = this.physics.add.staticGroup({
        // para usar este de arriba hay que comentar setAllowGravity 
        this.fondo = this.add.image(750, 360, 'fondopark2').setScale(2.2).setDepth(0);
        // this.chihuahua = this.add.image(300, 580, 'huesito').setScale(1).setDepth(1);
        // this.chihuahua = this.physics.add.image(300, 580, 'chihuahua').setScale(1).setDepth(1);
        // this.chihuahua.setAllowGravity(false);

        this.parque = this.sound.add('Parque', {loop:false,volume: 0.5});
        this.parque.play();
        this.tomarhueso = this.sound.add('pasar', {loop:false,volume: 0.8});
        
        this.physics.world.setBounds(0, 0, 1500, 640, true, true, true, true);

        this.grupo = this.physics.add.group({
            key: 'huesito',
            repeat: 5,
            setXY: {
                x: 1000,
                y: 550,
                stepX: 50
                }
            });

        this.grupo1 = this.physics.add.group({
            key: 'chihuahua',
            // repeat: 5,
            setXY: {
                x: 500,
                y: 580,
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

        this.grupo.children.iterate( (hueso) => {
                hueso.setScale(0.1);
                hueso.setAngle(45);
                hueso.body.setAllowGravity(false);
            } );
        this.grupo1.children.iterate( (chihuahua) => {
                chihuahua.setScale(0.2);
                // chihuahua.body.setAllowGravity(false);
                chihuahua.setCollideWorldBounds(true);
                chihuahua.onWorldBounds = true;
                chihuahua.setBounce(0, 0);
                // chihuahua.setFriction(10);
            } );

        this.hidrante.children.iterate( (hidrante) => {
                hidrante.setScale(0.5);
                // hidrante.body.setAllowGravity(false);
                // hidrante.setVelocity(10,0);
                // hidrante.setBounce(1, 0);
                // hidrante.setFriction(10);
                hidrante.setCollideWorldBounds(true);
            } );

        // this.grupo.playAnimation('moneda');

        this.add.tween({
            targets: this.grupo.getChildren(),
            y: 500,
            yoyo: true,
            duration: 500,
            repeat: -1,
            easy: 'Power1'
            });
        
        

        // this.salir.on('down', function () {
        //     this.scene.start("Inicio");
        //     // this.mainmenu.stop();
        //     this.sound.pauseAll();
        // },this);
        // this.grupo.getChildren()[1].destroy();
    }
    
    update(time, delta) {
        // ESTA FUNCION CREA UN CICLO INFINITO

        function choque(hueso, chihuahua) {
            // moneda.kill();
            // this.grupo.getChildren()[1].destroy();
            this.tomarhueso.play();
            hueso.disableBody(true, true); //De aqui saque disableBodyhttp://phaser.io/tutorials/making-your-first-phaser-3-game/part9
            // this.grupo.destroy();

        }

        if( this.salir.isDown ){
            this.scene.start("Inicio");
            // this.mainmenu.stop();
            this.sound.pauseAll();
        }

        if( this.d.isDown ){
            this.grupo1.children.iterate( (chihuahua) => {
                        chihuahua.x += 3;
                        chihuahua.flipX= 0;
            } );
        }
        if( this.a.isDown ){
            this.grupo1.children.iterate( (chihuahua) => {
                        chihuahua.x -= 3;
                        chihuahua.flipX= 1;
            } );
        }
        if( this.saltar.isDown ){
            this.grupo1.children.iterate( (chihuahua) => {
                        chihuahua.y -= 8;
            } );
        }
        this.physics.add.collider(this.grupo, this.grupo1);
        this.physics.add.collider(this.grupo1, this.hidrante);
        this.physics.collide(this.grupo, this.grupo1, choque);

    }
    
    
}

export default EscenaParque;