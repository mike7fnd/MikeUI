import { cn } from '../../utils/cn'
import type { InputProps } from '../../types/schema'

const sizeMap = {
  sm: 'h-9  px-3.5 text-sm',
  md: 'h-11 px-4   text-[15px]',
  lg: 'h-13 px-5   text-base',
}

const labelSizeMap = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

const borderRadiusMap = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

export function InputComponent({ props }: { props: InputProps }) {
  const radius = borderRadiusMap[props.borderRadius ?? 'md']

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label */}
      <label
        className={cn('font-semibold text-text-primary', labelSizeMap[props.size])}
        htmlFor={props.ariaLabel ? undefined : props.label}
      >
        {props.label}
        {props.required && (
          <span className="text-danger ml-1 font-normal" aria-hidden>*</span>
        )}
      </label>

      {/* Input wrapper (for prefix/suffix) */}
      <div className={cn(
        'flex items-center w-full border bg-white transition-all duration-200',
        'focus-within:ring-2 focus-within:ring-accent/20 focus-within:border-accent',
        'shadow-inner-soft',
        radius,
        props.error
          ? 'border-danger bg-danger-light'
          : 'border-border hover:border-text-tertiary',
        props.disabled && 'opacity-50 cursor-not-allowed bg-surface-secondary',
      )}>
        {props.prefix && (
          <span className="pl-3 pr-1 text-sm text-text-tertiary flex-shrink-0">{props.prefix}</span>
        )}
        <input
          id={props.label}
          type={props.type}
          placeholder={props.placeholder}
          disabled={props.disabled}
          readOnly={props.readonly ?? true}
          maxLength={props.maxLength}
          autoComplete={props.autocomplete ?? 'off'}
          aria-label={props.ariaLabel}
          aria-describedby={props.ariaDescribedBy}
          className={cn(
            'flex-1 min-w-0 bg-transparent outline-none leading-none',
            sizeMap[props.size],
            // when there's prefix/suffix, adjust padding
            props.prefix && 'pl-1',
            props.suffix && 'pr-1',
            props.error ? 'text-danger' : 'text-text-primary',
          )}
        />
        {props.suffix && (
          <span className="pr-3 pl-1 text-sm text-text-tertiary flex-shrink-0">{props.suffix}</span>
        )}
      </div>

      {/* Helper / error */}
      {props.error ? (
        <p className="text-danger text-xs font-medium flex items-center gap-1">
          <span>&#9888;</span> {props.errorMessage}
        </p>
      ) : props.helperText ? (
        <p className="text-text-tertiary text-xs leading-snug">{props.helperText}</p>
      ) : null}
    </div>
  )
}
