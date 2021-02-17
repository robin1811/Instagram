// let Obj = {
//     name : "Kunwar",
//     sayHi : function(){
//         console.log("Inside SayHi");
//         console.log(this);
//         function inside(){
//             console.log("inside inside function");
//             console.log(this);
//         }
//         let newFun = inside.bind(Obj);
//         newFun();
//     }
//     // ,class  : "pepcoding"

// }

// Obj.sayHi();

let Obj = {
    name : "Kunwar",
    sayHi : function(){
        console.log("Inside SayHi");
        console.log(this);
        // arrow Function
        inside =()=>{
            console.log("inside inside function");
            console.log(this);
        }
        inside();
    }
    // ,class  : "pepcoding"

}

Obj.sayHi();

fun =()=>{
    console.log(this);
} 
fun();

// in simple funtion call, this points to global objects
function fun(){
    console.log("Indise fun ");
//     console.log(this);
//     console.log(global);
}
// fun();