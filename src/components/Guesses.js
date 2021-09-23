const Guesses = ({countries}) => {
  return (
    <div className="guesses">
      {countries.map((country) => (
        <div className="country">{country}</div>
      ))}
    </div>
  )
}

export default Guesses;
