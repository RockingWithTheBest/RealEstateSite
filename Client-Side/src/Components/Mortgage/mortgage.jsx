import React, {useState}from 'react'
import './mortgage.css';


const  mort=()=> {
    const [propertyPrice, setPropertyPrice] =useState('')
    const [downPayment, setDownPayment] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [loanTerm, setLoanTerm] = useState('')
    const [monthlyPayment, setMonthlyPayment] = useState('')
    const [checkCorrect, setCheckCorrect] = useState(false)
    const [monthlyPaymentError, setMonthlyPaymentError] = useState(false)

    const calculateMortgage = (e) => {
        e.preventDefault();

        const principal = propertyPrice -downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const totalPayment = loanTerm* 12;

        const monthly = (principal * (monthlyRate * Math.pow( 1 + monthlyPayment , totalPayment))) / 
                        (Math.pow( 1 + monthlyRate, totalPayment) -1 )

        if (!isFinite(monthly) || monthly.toString().includes('e')) {
                setMonthlyPaymentError('Correct the values righfull'); // Set to empty if invalid
                setCheckCorrect(true)
                setMonthlyPayment('')
        } else {
            setMonthlyPayment(monthly.toFixed(2));
            setMonthlyPaymentError('')
        }
    }

  return (
    <>
      
      <form action="" className='form-mortgage' onSubmit={calculateMortgage}>
          <h2>Mortgage Calculator</h2>
          <div>
            <label for='propertyPrice'>Property Price:</label>
            <input 
                  value ={propertyPrice}
                  type='number' 
                  id='propertyPrice' 
                  placeholder='Enter property price' 
                  onChange={(e) => setPropertyPrice(e.target.value)} 
                  required 
                  />
          </div>
          <div>
            <label for='downPayment'>Down Payment:</label>
            <input 
                    value={downPayment}
                    type='number' 
                    id='downPayment' 
                    placeholder='Enter down payment' 
                    onChange={(e) => setDownPayment(e.target.value)} 
                    required />
          </div>
          <div>
            <label for='interestRate'>Interest Rate:</label>
            <input 
                    value={interestRate}
                    type='number' 
                    id='interestRate' 
                    placeholder='Enter interest rate (as a decimal)' 
                    onChange={(e) => setInterestRate(e.target.value)} 
                    required 
                    />
          </div>
          <div>
            <label for='loanTerm'>Loan Term:</label>
            <input 
                    value={loanTerm}  
                    type='number' 
                    id='loanTerm' 
                    placeholder='Enter loan term (in years)' 
                    onChange={(e) => setLoanTerm(e.target.value)} 
                    required />
          </div>
          <button type='submit'>Calculate</button>
          {monthlyPayment &&
                <h3>Estimated MonthlyPagment : {monthlyPayment}</h3>
          }
          {checkCorrect &&
                <h3 className='error-d'>{monthlyPaymentError}</h3>
          }
      </form>
    </>
  )
}

export default mort
