const canvas= document.querySelector('canvas')
const c= canvas.getContext('2d')

canvas.width=1024
canvas.height=576

c.fillRect(0,0,canvas.width, canvas.height)

const gravity=0.4

const background= new sprite(
    {
       position: {
        x:0,
        y:0
       },
   imagesrc: './img/background.png',
    }
)
//shop

const shop= new sprite(
    {
       position: {
        x:600,
        y:149
       },
   imagesrc: './img/shop.png',
  scale :2.6,
  freshmax:6
    }
)

const player= new fighter(
    { position: {
        x: 0,
        y: 0
    },
    velocity: 
    {
        x: 0,
        y:0
    },
    
    offset:
    {
        x:0,
        y:0
    },

    imagesrc: 'player1.png',
   
}    
    )
    player.draw()
 

    const enemy= new fighter(
        { position: {
            x: 400,
            y: 100
        },
        velocity: 
        {
            x: 0,
            y:0
        },
        
         offset:
         {
            x:-50,
            y: 0
         },
         imagesrc: 'player2.png',

    }
        )

       
        
enemy.draw()

console.log(player)

const keys=  {
    a:{
    pressed: false
    },
    d:   {
    pressed: false
    },
    w:  {
        pressed:false
    },
    ArrowRight:
    {
        pressed:false
    },
    ArrowLeft:
    {
        pressed:false
    }
}

let lastkey

function rectanglecollision({ rectangle1, rectangle2 }
)
{
    return (
     rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.position.x && rectangle1.attackbox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y
    && rectangle1.attackbox.position.y <= rectangle2.position.y +rectangle2.height  && rectangle1.isattacking
    )
}

function tellwinner({player,enemy,timerid})
{
    clearTimeout(timerid)
    document.querySelector("#ties").style.display="flex"
    document.querySelector("#play-again").style.display = "block";
    if( timer===0)
    {
        document.querySelector("#ties").innerHTML = "time over";
    }
    else if(player.health === enemy.health)
    {
       document.querySelector("#ties").innerHTML="tie"
      
    }
    else if(player.health> enemy.health)
    {
       document.querySelector("#ties").innerHTML="player1 won"
    }
    else{
       document.querySelector("#ties").innerHTML="player2 won"
    }

}


//timer
let timer=60
let timerid
function decreasetimer()
{
 if(timer>0){
  timerid = setTimeout(decreasetimer,1000)
 timer--
    document.querySelector("#time").innerHTML=timer
 }
 if(timer===0){
    
  tellwinner({player,enemy,timerid})
}
}
decreasetimer()



function animate()
{
    window.requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
   shop.update()
   player.update()
   enemy.update()

   player.velocity.x=0
   enemy.velocity.x=0

   //player movement

   if(keys.a.pressed && player.lastkey=== 'a' )
   {
    player.velocity.x = -5
   }
   else if(keys.d.pressed && player.lastkey==='d')
   {
    player.velocity.x = 5
   }

   ///enemy moves

   if(keys.ArrowLeft.pressed && enemy.lastkey=== 'ArrowLeft' )
   {
    enemy.velocity.x = -5
   }
   else if(keys.ArrowRight.pressed && enemy.lastkey==='ArrowRight')
   {
    enemy.velocity.x = 5
   }

   //detect the collision
   if(
     rectanglecollision(
        {
            rectangle1: player,
            rectangle2: enemy,
        }
     ) && player.isattacking
   )
   {
    player.isattacking=false
    enemy.health -=20
    document.querySelector("#enemys").style.width=enemy.health +'%'
   }
   // for enemy collision
   if(
    rectanglecollision(
       {
           rectangle1: enemy,
           rectangle2: player,
       }
    ) &&
     enemy.isattacking
  )
  {
   enemy.isattacking=false
   player.health -=20
   document.querySelector("#players").style.width=player.health +'%'
   
  }
  //enemy game based on health
  if(enemy.health <=0 || player.health <=0)
  {
   tellwinner({player,enemy,timerid})
  }
}
animate()

window.addEventListener('keydown', (event) => {
    
    switch(event.key)
    {
        case 'd':
            keys.d.pressed=true
            player.lastkey='d'
            break

            case 'a':
           keys.a.pressed = true
           player.lastkey='a'
            break
            case 'w':
               player.velocity.y = -12
                break
                  case ' ':
                    player.attack()
                    break

                case 'ArrowRight':
                    keys.ArrowRight.pressed=true
                    enemy.lastkey='ArrowRight'    
                    break
        
                    case 'ArrowLeft':
                   keys.ArrowLeft.pressed = true
                   enemy.lastkey='ArrowLeft'
                    break

                    case 'ArrowUp':
                       enemy.velocity.y = -12
                        break

                        case 'ArrowDown':
                          enemy.isattacking= true
                             break;
    }
    
});

window.addEventListener('keyup', (event) => {
    switch(event.key)
    {
        case 'd':
            keys.d.pressed=false
            break

            case 'a':
            keys.a.pressed=false
            break
    }
    //enemy keys
    switch(event.key)
    {
        case 'ArrowRight':
            keys.ArrowRight.pressed=false
            break

            case 'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break
    }
    console.log( event.key);
});

//resetting the game
function resetGame() {
    // Reset player and enemy health
    player.health = 100;
    enemy.health = 100;
    document.querySelector("#players").style.width = player.health + '%';
    document.querySelector("#enemys").style.width = enemy.health + '%';

    // Reset positions
    player.position = { x: 0, y: 0 };
    enemy.position = { x: 400, y: 100 };

    // Hide the "Play Again" button
    document.querySelector("#play-again").style.display = "none";
    document.querySelector("#ties").style.display = "none";

    // Reset the timer
    timer = 60;
    document.querySelector("#time").innerHTML = timer;
    decreasetimer(); // Restart the timer

    // Clear any ongoing animations or effects
    player.isattacking = false;
    enemy.isattacking = false;

    // Restart the animation loop
    animate();
}
document.querySelector("#play-again").addEventListener("click", resetGame);