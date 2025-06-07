// app/about/about.jsx
import './about.css';

export default function AboutPage() {
  return (
    <main className="about">
      <h1>About the Loan Prediction Model</h1>
      <p>This model predicts loan approval using ML based on applicant data.</p>
      <ul>
        <li>📊 Model: Logistic Regression</li>
        <li>📁 Trained on public loan dataset</li>
        <li>🎯 Accuracy: ~81%</li>
        <li>🧠 Preprocessing: StandardScaler</li>
        <li>🚀 Built with: Flask + Next.js</li>
      </ul>
    </main>
  );
}
