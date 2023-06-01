const firebaseConfig = {
    apiKey: "AIzaSyAYiB4jb509qvrqvPhOfBEqkCuzvHD_pKA",
    authDomain: "iotkt-a9c2e.firebaseapp.com",
    databaseURL: "https://iotkt-a9c2e-default-rtdb.firebaseio.com",
    projectId: "iotkt-a9c2e",
    storageBucket: "iotkt-a9c2e.appspot.com",
    messagingSenderId: "121530110327",
    appId: "1:121530110327:web:ebc450057e06417a8a9172",
    measurementId: "G-R4N11VSHX2"
  };
  
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
  // Initialize Realtime Database and get a reference to the service
  var database = firebase.database();

//CALL DEVICE
let barrier_on_button = document.querySelector('#barrier_on_button'); //btn1 is ON button of "call"
let barrier = document.querySelector('#barrier'); //img1 is img of "call"
let barrier_off_button = document.querySelector('#barrier_off_button'); //btn2 is OFF button of "call"

//Change value on firebase when click ON button
barrier_on_button.addEventListener('click', ()=>{ 
    barrier.src = 'image/barrier_on.png'; 
    firebase.database().ref("/GATE").set({state: 1})
})
//Change value on firebase when click OFF button
barrier_off_button.addEventListener('click', ()=>{
    barrier.src = 'image/barrier_off.png';
    firebase.database().ref("/GATE").set({state: 0})
})



//DEN DEVICE
// let led_on_button = document.querySelector('#led_on_button'); //btn3 is ON button of "den"
// let led = document.querySelector('#led'); //img2 is img of "den"
// let led_off_button = document.querySelector('#led_off_button'); //btn4 is OFF button of "den"

//Change value on firebase when click ON button
led_on_button.addEventListener('click', ()=>{
    led.src = 'image/light_on.png'; 
    firebase.database().ref("/LED").update({
        "state":1})
})
//Change value on firebase when click OFF button
led_off_button.addEventListener('click', ()=>{
    led.src = 'image/light_off.png';
    firebase.database().ref("/LED").update({
        "state":0})
})


//LOA DEVICE
let sos_on_button = document.querySelector('#sos_on_button'); //btn5 is ON button of "loa"
let sos = document.querySelector('#sos'); //img2 is img of "loa"
let sos_off_button = document.querySelector('#sos_off_button'); //btn6 is OFF button of "loa"

//Change value on firebase when click ON button
sos_on_button.addEventListener('click', ()=>{
    sos.src = 'image/sos_on.png' ;
    firebase.database().ref("/SOS").set({state:1})
})
//Change value on firebase when click OFF button
sos_off_button.addEventListener('click', ()=>{
    sos.src = 'image/sos_off.png';
    firebase.database().ref("/SOS").update({state: 0})
})

//GAS
database.ref("/GAS").on("value", function (snapshot) 
{
  //get Temp from Firebase (auto update when data changes)- 
  var temp = snapshot.val(); 
  document.getElementById("data_gas").innerHTML = temp;
});


//SLOT
database.ref("/IR2").on("value", function (snapshot) 
{
  //get Temp from Firebase (auto update when data changes)- 
  var temp = snapshot.val(); 
  document.getElementById("data_slot").innerHTML = temp;
});