// app/page.jsx
import Link from 'next/link';
import './globals.css';

export default function Home() {
  return (
    <main className="landing">
      <h1>Welcome to the Loan Approval App</h1>
      <p>Check your loan eligibility using our AI model.</p>
      <div className="btn-group">
        <Link href="/predict"><button>Check Eligibility</button></Link>
        <Link href="/about"><button className="secondary">About This App</button></Link>
      </div>
    </main>
  );
}
