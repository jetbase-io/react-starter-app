import { useEffect, useState } from 'react'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { getAccessToken, parseJwt } from '../../helpers/user'
import { useUser } from '../../hooks/user/useUser'

interface Message {
  id: string
  content: string
  timestamp: string
  imageUrls: string[]
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
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const token = getAccessToken()
  const userToken = parseJwt(token || '')
  const { user } = useUser(userToken?.id)

  useEffect(() => {
    if (!user || socket) {
      return undefined
    }

    const newSocket = io('http://localhost:3003', {
      transports: ['websocket'],
      query: { token },
    })

    setSocket(newSocket)

    newSocket.on('message', data => {
      setMessages(prevMessages => {
        if (prevMessages.some(msg => msg.id === data.id)) return prevMessages

        return [...prevMessages, data]
      })
    })

    return () => {
      newSocket.disconnect()
    }
  }, [user, token, socket])

  useEffect(() => {
    fetch('http://localhost:3003/api/chats', {
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

      fetch(`http://localhost:3003/api/chats/messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error('Error fetching messages:', err))
    }
  }

  const sendMessage = async () => {
    if (!socket || !user || (message.trim() === '' && files.length === 0)) {
      setError('Please enter a message or upload a file')

      return
    }

    setError(null)

    const formData = new FormData()
    formData.append('chatId', chatId)
    formData.append('content', message)
    formData.append('userId', user.id)
    files.forEach(file => formData.append('files', file))

    try {
      const response = await fetch(
        `http://localhost:3003/api/chats/messages/${chatId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      )

      const data = await response.json()

      // socket.emit('message', {
      //   chatId,
      //   userId: user.id,
      //   message: data.content,
      //   imageUrls: data.imageUrls,
      // })

      setMessage('')
      setFiles([])
    } catch (error) {
      setError('Failed to send the message')
      console.error('Error sending message:', error)
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
                      } mb-4`}
                    >
                      <div
                        className={`p-3 rounded-lg max-w-sm ${
                          msg.user.id === user?.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm font-semibold mb-1">
                          {msg.user.username}
                        </p>
                        {msg.content && <p className="mb-2">{msg.content}</p>}
                        {msg.imageUrls?.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {msg.imageUrls.map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                alt="attachment"
                                className="w-32 h-32 object-cover rounded-md"
                              />
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
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
                  type="file"
                  multiple
                  onChange={e => setFiles(Array.from(e.target.files || []))}
                  className="p-2 border rounded-md text-sm"
                />
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
              {files.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {files.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <button
                        onClick={() =>
                          setFiles(prev => prev.filter((_, i) => i !== index))
                        }
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {error && <p className="text-red-500 mt-2">{error}</p>}
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
