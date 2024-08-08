import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { clsx } from '../../utils'

const TextInput = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="mb-4 inline-block relative">
      {label && (
        <label className="block text-gray-500 pl-4 select-none pt-1 absolute text-sm font-bold mb-2" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx([
          "shadow appearance-none border rounded-[2px] px-4 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
          label ? "pt-6 pb-2" : "py-4",
          error ? "border-red-500" : "border-gray-300"
        ])}
        type="text"
        {...props}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  )
})

TextInput.displayName = 'TextInput'

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,  // Added prop type for error message
}

export default TextInput
