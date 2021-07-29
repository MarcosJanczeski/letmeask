import { useState, useEffect, createContext, ReactNode } from 'react'
import { firebase, auth } from '../services/firebase'

type TUser = {
  id: string
  name: string | undefined //alterado de null para undefined para compatibilizar com atributos de elementos html
  avatar: string | undefined //alterado de null para undefined para compatibilizar com atributos de elementos html
}

type TAuthCtx = {
  user: TUser | undefined
  signInWithGoogle: () => Promise<void>
}

type TAuthCtxProvider = {
  children: ReactNode
}
export const AuthCtx = createContext({} as TAuthCtx)

export function AuthCtxProvider(props: TAuthCtxProvider) {
  const [user, setUser] = useState<TUser>()

  function loadUser(user: firebase.User | null) {
    if (user) {
      const { displayName, photoURL, uid } = user
      setUser({
        id: uid,
        name: displayName ? displayName : undefined,
        avatar: photoURL ? photoURL : undefined
      })
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      loadUser(user)
    })
    return () => unsubscribe()
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const res = await auth.signInWithPopup(provider)
    loadUser(res.user)
  }
  return (
    <AuthCtx.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthCtx.Provider>
  )
}