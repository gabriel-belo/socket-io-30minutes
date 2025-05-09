//Esta é uma função que podemos chamar para obter um socket individual
import {io} from 'socket.io-client'

const joinRoomButton= document.getElementById('room-button')
const messageInput= document.getElementById('message-input')
const roomInput= document.getElementById('room-input')
const form= document.getElementById('form')

const socket= io('http://localhost:3000')
//Verificar a conexão entre servidor e cliente
//o método on() com atributo 'connect' faz com que toda vez que um cliente 
//conect ao site ele executa o callback
socket.on('connect', () =>{
    displayMessage(`You connect with id: ${socket.id}`)
})

//Como enviar eventos do cliente para o servidor
//emit vai pegar qualquer evento que quisermos e enviá-lo ao servidor
//para que possamos nomear o evento como quisermos
//socket.emit('send-message', message)

socket.on('receive-message', message =>{
    displayMessage(message)
})


form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const message= messageInput.value 
    const room = roomInput.value

    if(message ===  '') return 
    displayMessage(message)
    socket.emit('send-message', message, room)

    messageInput.value=''
})

joinRoomButton.addEventListener('click', (e) =>{
    const room= roomInput.value
    socket.emit('join-room', room, message =>{
        displayMessage(message)
    })
})

function displayMessage(message){
    const div= document.createElement('div')
    div.textContent= message
    document.getElementById('message-container').append(div)
}
