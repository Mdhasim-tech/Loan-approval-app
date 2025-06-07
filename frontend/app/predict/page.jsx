'use client'
import './predict.css'

import { useState } from 'react'

export default function PredictPage() {
  const [formData, setFormData] = useState({
    Gender: 'Male',
    Married: 'Yes',
    Dependents: '0',
    Education: 'Graduate',
    Self_Employed: 'No',
    ApplicantIncome: '',
    CoapplicantIncome: '',
    LoanAmount: '',
    Loan_Amount_Term: '',
    Credit_History: '1',
    Property_Area: 'Urban',
  })

  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mapping readable form values to numeric values for model
    const map = {
      Male: 1, Female: 0,
      Yes: 1, No: 0,
      Graduate: 1, 'Not Graduate': 0,
      Rural: 0, Semiurban: 1, Urban: 2
    }

    const payload = {
      Gender: map[formData.Gender],
      Married: map[formData.Married],
      Dependents: parseInt(formData.Dependents),
      Education: map[formData.Education],
      Self_Employed: map[formData.Self_Employed],
      ApplicantIncome: Number(formData.ApplicantIncome),
      CoapplicantIncome: Number(formData.CoapplicantIncome),
      LoanAmount: Number(formData.LoanAmount),
      Loan_Amount_Term: Number(formData.Loan_Amount_Term),
      Credit_History: Number(formData.Credit_History),
      Property_Area: map[formData.Property_Area],
    }

    const res = await fetch('http://127.0.0.1:5000/predict/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()
    setResult(data.loan_approval ? 'Approved ✅' : 'Rejected ❌')
  }

  return (
    <main style={{ padding: 30 }}>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label htmlFor="Gender">Gender</label>
        <select id="Gender" name="Gender" onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
        </select>


        <label htmlFor="Married">Marital Status</label>
        <select id="Married" name="Married" onChange={handleChange}>
          <option>Yes</option>
          <option>No</option>
        </select>

        <label htmlFor="Dependents">Dependents</label>
        <select id="Dependents" name="Dependents" onChange={handleChange}>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <label htmlFor="Education">Education</label>
        <select id="Education" name="Education" onChange={handleChange}>
          <option>Graduate</option>
          <option>Not Graduate</option>
        </select>
        <label htmlFor="Self_Employed">Self Employed</label>
        <select id="Self_Employed" name="Self_Employed" onChange={handleChange}>
          <option>Yes</option>
          <option>No</option>
        </select>

        <div>
          <label htmlFor="applicant-income">Applicant Monthly Income in INR:</label>
          <input type="number" id="applicant-income" name="ApplicantIncome" onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="coapplicant-income">Coapplicant Monthly Income in INR:</label>
          <input type="number" id="coapplicant-income" name="CoapplicantIncome" onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="loan-amount">Loan Amount (in thousands INR):</label>
          <input type="number" id="loan-amount" name="LoanAmount" onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="loan-term">Loan Term (in months):</label>
          <input type="number" id="loan-term" name="Loan_Amount_Term" onChange={handleChange} required />
        </div>


        <label htmlFor="Credit_History">Credit History</label>
        <select id="Credit_History" name="Credit_History" onChange={handleChange}>
          <option value="1">1 (Good)</option>
          <option value="0">0 (Bad)</option>
        </select>
        <label htmlFor="Property_Area">Property Area</label>
        <select id="Property_Area" name="Property_Area" onChange={handleChange}>
          <option>Urban</option>
          <option>Semiurban</option>
          <option>Rural</option>
        </select>

        <button type="submit">Check Approval</button>
      </form>

      {result && (
        <div className={`result-box ${result === 'Approved ✅' ? 'approved' : 'rejected'}`}>
          Loan Status: {result}
        </div>
      )}

    </main>
  )
}
