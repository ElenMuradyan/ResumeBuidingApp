export default function TextSpan ({words, className}: {words: string, className: string}) {
    const array = words.split(' ');
    return(
        <p className={className}>
            {
                array.map((word, i) => {
                    return(
                        <span key={i} className={i > 3 ? 'text-[#00ffdd]' : 'text-white'}>{word + ' '}</span>
                    )
                })
            }
        </p>
    )
}