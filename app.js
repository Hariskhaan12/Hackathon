const auth=firebase.auth();
const firestore=firebase.firestore();
let id_counter=0;
// let colors=["#FF5733","#93E917","#099CF4","#3E09F4","#F409B9" ]
let colors=["purple","orange","pink","purple","grey",'maroon','olive','teal']
popcolor_picker();
// window.onload=()=>{
//     randomcolor=Math.floor(Math.random()*5)
//     pop_color=document.getElementById("popcolor").innerHTML=colors[randomcolor];
// }
function popcolor_picker(){
    randomcolor=Math.floor(Math.random()*5)
    pop_color=document.getElementById("popcolor").innerHTML=colors[randomcolor];
}

let life=3;
let score=00;

for(i=0;i<20;i++){
    id_counter++;
    let c=document.getElementsByClassName("balloon_1");
    c[i].setAttribute("id",id_counter)
    // color=Math.floor(Math.random()*16777215).toString(16)
    randomcolor=Math.floor(Math.random()*8)
    c[i].style.backgroundColor=colors[randomcolor];
    c[i].addEventListener("mouseover",(event)=>{
        if(event.target.style.backgroundColor==document.getElementById("popcolor").innerHTML){
            score+=10;
            document.getElementById("score_life").innerHTML=`SCORE : ${score} Life: ${life} Remaining`
            event.target.style.display='none'

        }
        else{
            life--
            document.getElementById("score_life").innerHTML=`SCORE : ${score}  LIFE: ${life} Remaining`
        }
        setTimeout(()=>{
            let color=afterpop_color();
            event.target.style.display="block"
            event.target.style.backgroundColor=color;
        },1000)
        if(life==0)
        {
            alert("Loose")
        }
        if(score==40)
        {
            let user=auth.currentUser;
            console.log(firestore.collection('Users').doc(user.uid))
            firestore.collection('Users').doc(user.uid).update({
                "HighestScore":score
            })
            .then(()=>{
                console.log("SCore Updated");
                level2();
            })
            .catch((error)=>{
                alert(error.message)
            })
            
        }
        
            
        
    })
  
}
const afterpop_color=()=>{
    randomcolor=Math.floor(Math.random()*8)
    return colors[randomcolor];
}
const score_reset=(score)=>{
    let life=0;
    document.getElementById("score_life").innerHTML=`SCORE : ${score}  LIFE: ${life} Remaining`
}
const level2=()=>{
    alert("Congratulations Move to next Level")
    location.href="levelUpgrade.html";
    

}


