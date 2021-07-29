import { TRoom } from "../../Room";
import copyImg from '../../assets/images/copy.svg'
import './style.scss'

export function RoomCode({ code }: TRoom) {
  return (
    <button
      className='room-code'
      onClick={() => navigator.clipboard.writeText(code)}
    >
      <div>
        <img src={copyImg} alt="Copiar o código da sala" />
      </div>
      <span>Sala: {code}</span>
    </button>
  )
}