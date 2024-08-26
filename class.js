class sprite
{
    constructor( {position,imagesrc,scale=1,freshmax=1})
    {
        this.position= position;
        this.width= 50;
        this.height=150;
        this.image = new Image();
        this.image.src= imagesrc;
        this.scale=scale;
        this.freshmax=freshmax;
        this.framecurrent=0;
        this.frameelpase=0;
        this.frameshold=8;
        
    }
    draw()
    {
        c.drawImage(this.image, this.framecurrent * (this.image.width/this.freshmax) ,0,this.image.width/this.freshmax,this.image.height, this.position.x,this.position.y, (this.image.width)/this.freshmax * this.scale,this.image.height *this.scale)
   
    }

    update()
    {
        this.draw()   
        this.frameelpase++
        if(this.frameelpase % this.frameshold === 0)
        {
        if(this.framecurrent< this.freshmax - 1)
        { 
        this.framecurrent++
        }  
        else{
            this.framecurrent=0
        } 
    }
  }
 }


 //fighter
 class fighter extends sprite
{
    constructor( {position,velocity,color='red',offset,imagesrc,scale=1,freshmax=1})
    {
        super(
            {   
                position,
                imagesrc,
                scale,
                freshmax, 
            }
        )
        
        this.velocity= velocity
        this.width= 250
        this.height=250
        this.lastkey
        this.attackbox={
            position: {
                x: this.position.x ,
                y:  this.position.y,
            },
            offset,
            width: 100,
            height: 50,
        }
        this.color=color
        this.isattacking
        this.health=100
        this.framecurrent=0
        this.frameelpase=0
        this.frameshold=8 
    }

    draw()
    {// how my species look alike

       c.drawImage(this.image, this.position.x, this.position.y, this.width * this.scale, this.height * this.scale);


        //attack box
        if( this.isattacking){
        c.fillStyle='white'
        c.fillRect(this.attackbox.position.x,
             this.attackbox.position.y,
             this.attackbox.width,
             this.attackbox.height
             )
        }
    }

    update()
    {
        this.draw()
         this.attackbox.position.x = this.position.x + this.attackbox.offset.x

         this.attackbox.position.y = this.position.y

        this.position.x += this.velocity.x;    
        this.position.y +=this.velocity.y
    //boundaries
        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvas.width) {
            this.position.x = canvas.width - this.width;
        }

        if (this.position.y + this.height + this.velocity.y >= canvas.height-60) 
    {this.velocity.y= 0
    }
    
    else{
        this.velocity.y +=gravity
    }
}
attack()
{
    this.isattacking=true
    setTimeout(()=>
    {
        this.isattacking=false
    },100)
}
}