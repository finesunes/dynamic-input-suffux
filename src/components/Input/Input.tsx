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
    const suffixWidth = suffixRef.current?.getBoundingClientRect()
    setInputRightPadding(suffix && suffixWidth ? suffixWidth.width + 15 : 10)
  }, [suffix])

  return (
    <div className={styles.inputWrapper}>
      <input
        className={clsx(styles.input, className)}
        style={{
          paddingRight: inputRightPadding,
        }}
        value={value}
        placeholder={placeholder}
        {...props}
      />
      <div className={styles.inputFakeValueWrapper}>
        <span className={styles.inputFakeValue}>{value || placeholder}</span>
        <span ref={suffixRef} className={styles.suffix}>
          {suffix}
        </span>
      </div>
    </div>
  )
}
