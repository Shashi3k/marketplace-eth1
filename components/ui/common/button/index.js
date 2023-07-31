


export default function Button({
    children,
    className="text-white bg-indigo-500 hover:bg-indigo-700",
    ...rest
}){
    return(
        <span 
        {...rest} 
        className={`px-8 py-3 border rounded-md text-base ${className}`}>
            {children}

        </span>
    )
}