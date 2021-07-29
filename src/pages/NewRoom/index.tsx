import { Link, useHistory } from 'react-router-dom'
import { useState, useContext, FormEvent } from 'react'

import { AuthCtx } from '../../contexts/AuthCtx'
import { database } from '../../services/firebase'

import { Aside } from '../components/Aside'
import { Button } from '../components/Button'

import logo_img from '../assets/images/logo.svg'
//import './assets/styles/home.scss'
import './style.scss'

export function NewRoom() {
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('')
  const { user } = useContext(AuthCtx)

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault()
    if (newRoom.trim() === '') return
    const roomsRef = database.ref('rooms')
    const room = await roomsRef.push({
      title: newRoom,
      author: user?.id
    })
    history.push(`/rooms/${room.key}`)
  }

  return (
    <div id='page-auth'>
      <Aside />
      <main>
        <section className='main-content'>
          <img src={logo_img} alt="logo letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o nome da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
        </section>
      </main>
    </div>
  )
}