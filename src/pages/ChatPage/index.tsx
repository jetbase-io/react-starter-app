import { useEffect, useState } from 'react'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { getAccessToken, parseJwt } from '../../helpers/user'
import { useUser } from '../../hooks/user/useUser'

interface Message {
  id: string
  content: string
  timestamp: string
  user: {
    id: string
    username: string
  }
}

interface Chat {
  id: string
  name: string
}

const ChatsPage = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [chatId, setChatId] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null)

  const token = getAccessToken()
  const userToken = parseJwt(token || '')
  const { user } = useUser(userToken?.id)

  // Ініціалізація WebSocket
  useEffect(() => {
    if (!user) return

    const newSocket = io('http://localhost:3000', {
      transports: ['websocket'],
      query: { token },
    })

    setSocket(newSocket)

    newSocket.on('message', data => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: data.id,
          content: data.content,
          timestamp: data.timestamp,
          user: data.user,
        },
      ])
    })

    // eslint-disable-next-line consistent-return
    return () => {
      newSocket.disconnect()
    }
  }, [user, token])

  // Завантаження чатів
  useEffect(() => {
    fetch('http://localhost:3000/api/chats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setChats(data))
      .catch(err => console.error('Error fetching chats:', err))
  }, [token])

  // Завантаження повідомлень
  const loadMessages = (chatId: string) => {
    setChatId(chatId)

    if (socket) {
      socket.emit('joinChat', chatId)

      fetch(`http://localhost:3000/api/messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error('Error fetching messages:', err))
    }
  }

  // Відправка повідомлення
  const sendMessage = () => {
    if (socket && message.trim() !== '' && user) {
      socket.emit('message', {
        chatId,
        userId: user.id,
        message,
      })

      setMessage('')
    }
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 h-screen">
      <h1 className="text-2xl font-bold mb-4">Chat App</h1>

      <div className="flex w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-1/3 bg-gray-50 p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Chats</h2>
          <ul className="space-y-2">
            {chats.length > 0 ? (
              chats.map(chat => (
                <li key={chat.id}>
                  <button
                    className={`w-full py-2 px-4 rounded-md text-sm ${
                      chatId === chat.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => loadMessages(chat.id)}
                  >
                    {chat.name}
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No chats available</p>
            )}
          </ul>
        </div>

        <div className="w-2/3 flex flex-col p-4">
          <h2 className="text-lg font-semibold mb-4">Messages</h2>
          {chatId ? (
            <>
              <div className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded-md border mb-4">
                {messages.length > 0 ? (
                  messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.user.id === user?.id
                          ? 'justify-end'
                          : 'justify-start'
                      } mb-2`}
                    >
                      <div
                        className={`p-3 rounded-lg max-w-xs ${
                          msg.user.id === user?.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm font-semibold mb-1">
                          {msg.user.username}
                        </p>
                        <p>{msg.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No messages to display</p>
                )}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="flex-1 p-2 border rounded-md text-sm"
                  placeholder="Type your message"
                />
                <button
                  onClick={sendMessage}
                  className="py-2 px-4 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">
              Please select a chat to view messages
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatsPage
