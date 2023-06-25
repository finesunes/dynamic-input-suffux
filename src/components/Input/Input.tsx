import {
  FC,
  InputHTMLAttributes,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import clsx from 'clsx'

import styles from './Input.module.scss'

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'style'
> & {
  suffix?: ReactNode
}

const inputPadding = 20 as const
const suffixGap = 10 as const

export const Input: FC<InputProps> = ({
  value,
  placeholder,
  suffix,
  className,
  ...props
}) => {
  const suffixRef = useRef<HTMLSpanElement>(null)

  const [inputRightPadding, setInputRightPadding] = useState<number>(0)

  useLayoutEffect(() => {
    const suffixWidth = suffixRef.current?.offsetWidth
    setInputRightPadding(
      suffix && suffixWidth
        ? suffixWidth + (inputPadding + suffixGap)
        : inputPadding,
    )
  }, [suffix])

  return (
    <div className={styles.inputWrapper}>
      <input
        className={clsx(styles.input, className)}
        style={{
          padding: inputPadding,
          paddingRight: inputRightPadding,
        }}
        value={value}
        placeholder={placeholder}
        {...props}
      />
      <div
        className={styles.inputFakeValueWrapper}
        style={{ gap: suffixGap, padding: inputPadding }}
      >
        <span className={styles.inputFakeValue}>{value || placeholder}</span>
        <span ref={suffixRef} className={styles.suffix}>
          {suffix}
        </span>
      </div>
    </div>
  )
}
