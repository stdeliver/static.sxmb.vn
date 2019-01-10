/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function dateNowFirebase(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd;
    } 

    if(mm<10) {
        mm = '0'+mm;
    } 

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function loadConfig(){
     var config = {
        apiKey: "AIzaSyDqy31SKVWYp4Duu4IH4qIullwq2Odb7es",
        authDomain: "mascom-865bf.firebaseio.com",
        databaseURL: "https://mascom-865bf.firebaseio.com",
        projectId: "mascom-865bf",
        storageBucket: "",
        messagingSenderId: "827774519905"
    };
    firebase.initializeApp(config);
}

function loadKQLiveCompany(db){   
    var messagesRef=firebase.database().ref('messages/'+db);
    messagesRef.limitToLast(1).on('child_added', setMessageCompany);
    messagesRef.limitToLast(1).on('child_changed', setMessageCompany);
}

function setMessageCompany(data){
//    console.log(data.val().text);
    try {
        var messages=JSON.parse(data.val().text);
        var today=dateNowFirebase();
        console.log(messages);
        if(messages[38].message===today){
            for(var i=0;i<messages.length;i++){
                var item=messages[i];
                // console.log(item);
                var id='#'+item.id;
                if(item.message!==''){
                    console.log("id==="+item.id+"...meg=="+item.message);
                    $(id).html(item.message);    
                }
            }
        }
    } catch (e) {
        console.log('setMessage');
    }

    
}


function startLiveFirebase(region){
    
    //load config
    loadConfig();
    var arrComp='';
    if(region==='MN'){arrComp=arrCompMN.split(',');}
    else if(region==='MT'){arrComp=arrCompMT.split(',');}
    
    if(arrComp!==''&&arrComp.length>0){
        for (var i in arrComp) {
            if(arrComp[i]!==''){
                loadKQLiveCompany(arrComp[i]);
            }
        }
    }
    
}