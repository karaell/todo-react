export function PriorityTitle(props) {
    const priority = props.priority;

    if (priority === "high") {
        return <PriorityTitleHigh/>;
    }
    return <PriorityTitleLow />;
}

function PriorityTitleHigh() {
    return ( 
        <h2 className='high'>High</h2> 
    )
}

function PriorityTitleLow() {
    return ( 
        <h2 className='low'>Low</h2> 
    )
}