export default function Rematching({winner, onRematch}){
    return (
    <>
    <div className="final-winner">
    <button onClick={onRematch}>RESTART</button>
    Yeah! {winner.toUpperCase()} won! 🎉
    </div>
    </>)

}