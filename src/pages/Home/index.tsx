import { useHistory } from 'react-router-dom'
import { useContext, FormEvent, useState } from 'react'

import { database } from '../../services/firebase'

import { AuthCtx } from '../../contexts/AuthCtx'

import { Button } from '../components/Button'
import { Aside } from '../components/Aside'

import logo_img from '../assets/images/logo.svg'
import google_icon_img from '../assets/images/google-icon.svg'
import './style.scss'

export function Home() {
  const history = useHistory()
  const [room, setRoom] = useState('')
  const { user, signInWithGoogle } = useContext(AuthCtx)

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault()
    if (!room.trim()) return

    const roomRef = await database.ref(`rooms/${room}`).get()

    if (!roomRef.exists()) {
      alert('Código de sala inexistente.')
      return
    }

    history.push(`/rooms/${room}`)
  }

  return (
    <div id='page-auth'>
      <Aside />
      <main>
        <section className='main-content'>
          <img src={logo_img} alt="logo letmeask" />
          <Button onClick={handleCreateRoom}>
            <img src={google_icon_img} alt="logo do Google" />
            Crie sua sala com o Google
          </Button>
          <div>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={room}
              onChange={e => setRoom(e.target.value)}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </section>
      </main>
    </div>
  )
}