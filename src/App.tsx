import './App.scss'
import { ChangeEvent, ReactNode, useState } from 'react'

import { Input } from './components/Input/Input'

const someExampleSuffix = 'USD' as const

function App() {
  const [value, setValue] = useState<string>('')
  const [suffix, setSuffix] = useState<ReactNode>(someExampleSuffix)

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const onButtonClick = () =>
    setSuffix((prev) => (!prev ? someExampleSuffix : undefined))

  return (
    <div className={'home'}>
      <Input
        placeholder={'Amount...'}
        value={value}
        onChange={onChangeInput}
        suffix={suffix}
      />
      <button onClick={onButtonClick}>
        add / remove "{someExampleSuffix}" suffix
      </button>
    </div>
  )
}

export default App
