$(function(){
   
    const socket = io();
    //obtain Dom elements
    const $messageForm= $('#message-form');
    const $messageBox= $('#message');
    const $chat= $('#chat');
    //obtain users
    const $email= $('#email');
    const $users= $('#usernames');
    //events
    $messageForm.submit( e => {
        e.preventDefault();
       socket.emit('send message',$messageBox.val())
       $messageBox.val('');
    });
   
    socket.on('new message', function(data){
        $chat.append (data + '<br/>');
    });

    socket.on('usernames', data =>{
        let html='';
       
    });

    socket.on('load msg', data=>{
       for(let i = 0; i< data.lenght; i++){
        displayMsg(data[i])
       }
    });

    function displayMsg(data){
        $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>');
    }
})


