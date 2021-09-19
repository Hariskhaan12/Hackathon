const auth=firebase.auth();
const firestore=firebase.firestore();
const SignUp = () => {
    
    document.getElementById("SignUp").addEventListener('submit',(event)=>{
        event.preventDefault();
    })
    
        email= document.getElementById("em").value,
        pass=document.getElementById("password").value
    

    auth.createUserWithEmailAndPassword(email,pass)
    .then(()=>{
        var user=auth.currentUser;
        firestore.collection('Users').doc(user.uid).set({
            name:document.getElementById("name").value,
            email:document.getElementById("em").value,
            pass:document.getElementById("password").value,
            LastLogin:new Date(),
            HighestScore:0
        })
        
        alert("SignUp succesfully")
        
    })
    .catch((error)=>{
        alert(error.message);
    })
}

// login fucntionality
    const login = () => {
    
    document.getElementById("login").addEventListener('submit',(event)=>{
        event.preventDefault();
    })
    let loginEmail = document.getElementById("loginEmail").value;
    let loginPass = document.getElementById("loginPass").value;

auth.signInWithEmailAndPassword(loginEmail,loginPass)
.then(()=>{
    var user=auth.currentUser;
    firestore.collection('Users').doc(user.uid).update({
        "LastLogin":new Date()
    })
    alert("Login Succesfully..!");
    location.href="Game.html"
})
.catch((error)=>{
    alert(error.message);
})
}


