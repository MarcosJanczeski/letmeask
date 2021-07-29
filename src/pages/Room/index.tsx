import { useState, useContext, useEffect, FormEvent } from 'react'
import { useParams } from "react-router-dom";

import { Button, RoomCode } from '../components'
import { AuthCtx } from "../../contexts/AuthCtx";
import { useRoom } from "../../contexts/RoomCtx";

import './style.scss'
import logoImg from '../assets/images/logo.svg'
import { database } from '../../services/firebase';
import { QuestionsList } from '../components/QuestionsList';

export type TRoom = {
  code: string
}

export function Room() {
  const { code } = useParams<TRoom>()
  const [newQuestion, setNewQuestion] = useState('')
  const [canAsk, setCanAsk] = useState(false)
  const { user, signInWithGoogle } = useContext(AuthCtx)
  const { setRoomId, title, questions } = useRoom()

  useEffect(() => {
    setRoomId(code)
  }, [code, setRoomId])

  useEffect(() => {
    setCanAsk(!!user && !!newQuestion)
  }, [user, newQuestion])

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault()

    /**
     * seguem duas redundâncias de segurança, casos já tratados na
     * desabilitação do botão de envio (submit), caso ocorra houve 
     * manipulação do html ou o código precisa ser revisto
     */
    //1
    if (newQuestion.trim() === '') return
    //2
    if (!user) {
      throw new Error("Você precisa estar logado para enviar uma pergunta!")
    }
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${code}/questions`).push(question)
    setNewQuestion('')
  }

  return (
    <div>
      <header>
        <img src={logoImg} alt="Logo letmeask" />
        <RoomCode code={code} />
      </header>
      <main>
        <header>
          <h1>Sala: {title}</h1>
          {questions.length > 0 && (<span>{questions.length} perguntas</span>)}
        </header>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que deseja saber?"
            name="new-question"
            id="new-question"
            cols={30}
            rows={10}
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
          />
          <footer>
            {!!user ?
              (<span>
                <img src={user.avatar} alt={user.name} />{user.name}
              </span>)
              :
              (<span >Para perguntar
                <button onClick={signInWithGoogle}>
                  faça seu login
                </button>.
              </span>)
            }
            <Button
              type="submit"
              disabled={!canAsk}
            >
              Enviar Pergunta
            </Button>
          </footer>
        </form>
        <QuestionsList />
      </main>
    </div>
  )
}