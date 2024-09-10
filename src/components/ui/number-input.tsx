import React, { forwardRef } from 'react';
import { Input, InputProps } from './input';

interface NumberInputProps extends Omit<InputProps, 'type'> {
  isInt?: boolean,
  step?: number
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({ isInt = false, step = 1, value='', ...props }, ref) => {

  // Field value changed
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    // Regular expression changes based on the allowDecimal prop
    const decimalPattern = isInt ? /^\d*$/ : /^\d*\.?\d*$/

    // Validate the input value
    if (decimalPattern.test(value) || value === '') {
      props.onChange && props.onChange(event);
    }
  };

  // Increment field's value
  const handleIncrement = () => {
    const currentValue = parseFloat(value as string) || 0;
    // Increment only to multiples of step
    const remainder = currentValue % step
    const newValue = (isInt ? Math.round(currentValue + step - remainder) : currentValue + step - remainder).toString();
    props.onChange?.({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>);
  };

  // Decrement field's value
  const handleDecrement = () => {
    const currentValue = parseFloat(value as string) || 0;
    const remainder = currentValue % step
    // Decrement only to multiples of step
    var newValue = 0
    if(remainder != 0){
      newValue = (isInt ? Math.round(currentValue - remainder) : currentValue - remainder)
    }else{
      newValue = (isInt ? Math.round(currentValue - step) : currentValue - step);
    }
    props.onChange?.({ target: { value: newValue > 0 ? newValue.toString() : 0 } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="relative w-full">
        <button
          type="button"
          onClick={handleDecrement}
          className="absolute left-0 inset-y-0 px-3 py-2 text-sm"
        >
          -
        </button>
        <Input
          {...props}
          value={value}
          type="text"
          onChange={handleInputChange}
          inputMode="decimal"
          pattern="[0-9]*"
          className="text-center px-10" // Add padding to account for buttons
          ref={ref}
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="absolute right-0 inset-y-0 px-3 py-2 text-sm"
        >
          +
        </button>
      </div>
  )
})

export default NumberInput;
