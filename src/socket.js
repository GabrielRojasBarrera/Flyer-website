const {Chat} = require('./model');

module.exports= function(io){

    io.on('connection', async(socket,req) => {
        console.log('a user connected');
 
        let messages = await Chat.find({})
        .lean({ virtuals: true });
        
        let users = {};

        socket.on('new user', function(data){
            io.sockets.emit('usernames',data)
        });
        socket.emit('load msg', messages)

        socket.on('send message',function (data) {
            
           
            io.sockets.emit('new message',data);
          
        });

        socket.on('disconnect', data => {
            if(!socket.nickname) return;
            delete users[socket.nickname];
            updateNicknames();
        });
        
        function updateNicknames(){
            io.sockets.emit('usernames', Object.keys(users));
        }
    });
}