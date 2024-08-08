import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { clsx } from '../../utils'

const TextInput = forwardRef(({ label, ...props }, ref) => {
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
          label ? "pt-6 pb-2" : "py-4 ",
        ])}
        type="text"
        {...props}
      />
    </div>
  )
})

TextInput.displayName = 'TextInput'

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
}

export default TextInput
