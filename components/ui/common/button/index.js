


export default function Button({
    children,
    className,
    hoverable=true,
    variant="purple",
    ...rest
}){

    const variants={
        purple:`text-white bg-indigo-600 ${hoverable && "hover:bg-indigo-700"}`,
        red:`text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
        green:`text-white bg-green-600 ${hoverable && "hover:bg-green-700"}`
    }

    return(
        <button
        {...rest} 
        className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border rounded-md text-base ${className} ${variants[variant]}`}>
            {children}

        </button>
    )
}