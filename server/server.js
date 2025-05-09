const { instrument } = require('@socket.io/admin-ui')
const io= require('socket.io')(3000, {
    cors:{
        origin: "*"
    },
}) 

//Essa função será executada toda vez que um cliente conectar ao servidor
//e forncerá uma instância de socket para cada um deles
io.on('connection', socket =>{
    //Este id é um id aleatório atribuído a cada pessoa quando ela se conecta ao servidor
    console.log(socket.id)
    socket.on('send-message', (message, room)=>{
        //verificação se temos uma sala, se não envia a todos
        if(room === ''){
            //Se quiser enviar a mensagem ou evento pata todos os clientes,
            //exceto para o cliente que enviou a mensagem, deve excrever io.broadcast
            //enviar uma mensagem para todos os clientes conectados, exceto o cliente que 
            //enviou a mensagem.
            //socket: é o cliente atual conectado.
            //.broadcast: diz “para todos os outros clientes, menos eu”.
            //.emit('receive-message', message): envia o evento 'receive-message' com os dados da 
            // variável message.
            socket.broadcast.emit('receive-message', message)
        }else{
            //Porém se quiser criar uma sala privada onde comunicamos com apenas
            //certas pessoas ou se entrarmos em uma sala e recebermos mensagem apenas dentro da sala
            //Por padrão cada usuário do socket.io tem sua própria sala e isso é apenas o ID.
            //Então o usuário esta em uma sala própria sozinho com o ID
            //Então se quiser enviar uma mensagem para outro usuário, posso enviar para uma sala que é o ID 
            //dele(s)
            socket.to(room).emit('receive-message', message)
        }
        
    })
    //Entrando em outra sala, fazendo parte de outra sala
    socket.on('join-room', (room, cb) =>{
        socket.join(room)
        cb(`Joined ${room}`)//O callback (cb) é enviado de volta para quem emitiu o evento.
    })
})

instrument(io, {auth: false, mode: "development"})