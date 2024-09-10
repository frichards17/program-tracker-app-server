// List given errors in divs

type FormErrorsProps = {
    errors: string[],
    className?: string
};

export function FormErrors({ 
    errors,
    className = ""
}: FormErrorsProps 
){
    if (!errors) return null;
    return (
        <div className={`${className} my-2 text-pink-500 text-xs`}>
            {errors.map((err: string, index: number) => (
                <div key={index} className='my-1'>
                    {err}
                </div>
            ))}
        </div>
        )
  }