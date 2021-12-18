const GuessForm = ({guess, handleSubmit, handleChange}) => {
  return (
    <form onSubmit={handleSubmit} id="form">
      <input value={guess} onChange={handleChange} type="text" id="guess-input" placeholder="country" autoComplete="off"></input>
    </form>
  )
}

export default GuessForm;
