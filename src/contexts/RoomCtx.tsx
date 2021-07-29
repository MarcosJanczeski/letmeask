import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction
} from "react"

import { database } from "../services/firebase";
import { TQuestion } from '../pages/components'

type TReactElements = {
  children: ReactNode
}

type TRoomCtx = {
  roomId: string
  setRoomId: Dispatch<SetStateAction<string>>
  questions: TQuestion[]
  setQuestions: Dispatch<SetStateAction<TQuestion[]>>
  title: string
  setTitle: Dispatch<SetStateAction<string>>
}

type TFBQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

const RoomCtx = createContext({} as TRoomCtx)

export function RoomCtxProvider({ children }: TReactElements) {
  const [roomId, setRoomId] = useState('')
  const [questions, setQuestions] = useState<TQuestion[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const room = database.ref(`rooms/${roomId}`)
    room.on('value', room => {
      const dbRoom = room.val()
      const questions: TFBQuestions = dbRoom.questions ?? {}
      const arrQuestions = Object.entries(questions).map(([key, value]) => ({
        id: key,
        content: value.content,
        author: value.author,
        isHighlighted: value.isHighlighted,
        isAnswered: value.isAnswered,
      }))
      setQuestions(arrQuestions)
      setTitle(dbRoom.title)
    })
  }, [roomId])

  return (
    <RoomCtx.Provider value={{
      roomId,
      setRoomId,
      questions,
      setQuestions,
      title,
      setTitle
    }}>
      {children}
    </RoomCtx.Provider>
  )
}

export function useRoom(): TRoomCtx {
  const ctx: TRoomCtx = useContext(RoomCtx)
  const {
    roomId,
    setRoomId,
    questions,
    setQuestions,
    title,
    setTitle
  } = ctx
  return {
    roomId,
    setRoomId,
    questions,
    setQuestions,
    title,
    setTitle
  }
}