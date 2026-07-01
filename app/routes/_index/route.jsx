import { redirect, Form, useLoaderData } from "react-router";
import { login } from "../../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData();

  return (
    <div className="landing-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        body, html {
          margin: 0;
          padding: 0;
          background-color: #08080c;
          font-family: 'Inter', sans-serif;
          color: white;
          overflow-x: hidden;
        }

        .landing-container {
          min-height: 100vh;
          background: radial-gradient(circle at 70% 30%, rgba(100, 30, 200, 0.15) 0%, rgba(0, 0, 0, 0) 50%), #08080c;
          display: flex;
          flex-direction: column;
          padding: 40px 8%;
          box-sizing: border-box;
        }

        /* Navbar */
        .navbar {
          display: flex;
          align-items: center;
          margin-bottom: 80px;
        }
        
        .logo-icon {
          background: linear-gradient(135deg, #4f2d91 0%, #d51786 100%);
          border-radius: 6px;
          padding: 6px 10px;
          font-weight: 800;
          font-size: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
          transform: skew(-8deg);
        }
        .logo-icon-text {
          transform: skew(8deg);
        }
        .logo-text {
          margin-left: 16px;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1;
        }
        .logo-text span {
          color: #d51786;
        }
        .logo-pro {
          display: block;
          font-size: 10px;
          letter-spacing: 6px;
          color: #d51786;
          text-transform: uppercase;
          margin-top: 4px;
          text-align: center;
        }

        /* Main Content Grid */
        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          flex: 1;
        }

        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }

        .hero-content h1 {
          font-size: 52px;
          line-height: 1.2;
          font-weight: 800;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }
        .hero-content h1 span {
          background: linear-gradient(90deg, #9b4dff 0%, #ff3399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-content p {
          font-size: 18px;
          line-height: 1.6;
          color: #a0a0b0;
          margin-bottom: 40px;
          max-width: 500px;
        }
        @media (max-width: 900px) {
          .hero-content p {
            margin: 0 auto 40px auto;
          }
        }

        /* Form */
        .login-form {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 4px;
          max-width: 500px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        @media (max-width: 900px) {
          .login-form {
            margin: 0 auto;
          }
        }
        .login-input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          padding: 16px 20px;
          font-size: 16px;
          outline: none;
        }
        .login-input::placeholder {
          color: #666;
        }
        .login-button {
          background: linear-gradient(90deg, #7c3aed 0%, #db2777 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0 32px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .login-button:hover {
          box-shadow: 0 10px 20px rgba(219, 39, 119, 0.3);
        }

        /* Feature Cards */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 80px;
        }
        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
        .feature-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: background 0.3s;
        }
        .feature-card:hover {
          background: rgba(255, 255, 255, 0.04);
        }
        .feature-icon {
          background: rgba(255, 255, 255, 0.05);
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          color: #b566ff;
        }
        .feature-text h3 {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
        }
        .feature-text p {
          margin: 0;
          font-size: 14px;
          color: #888;
          line-height: 1.5;
        }

        /* Mockup Right Side */
        .mockup-container {
          position: relative;
          perspective: 1000px;
        }
        .mockup-board {
          background: rgba(15, 15, 25, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 100px rgba(136, 68, 238, 0.15);
          transform: rotateY(-15deg) rotateX(5deg);
          transform-style: preserve-3d;
        }
        .mockup-header {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }
        .mockup-sidebar {
          width: 60px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mockup-line {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          width: 100%;
        }
        .mockup-line.active {
          background: #8844ee;
        }
        .mockup-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .mockup-cards {
          display: flex;
          gap: 16px;
        }
        .mockup-card {
          flex: 1;
          height: 60px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mockup-chart {
          height: 220px;
          background: linear-gradient(180deg, rgba(136, 68, 238, 0.1) 0%, rgba(136, 68, 238, 0) 100%);
          border: 1px solid rgba(136, 68, 238, 0.2);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          padding: 24px;
        }
        .mockup-chart-title {
          font-size: 13px;
          color: #a0a0b0;
        }
        .mockup-chart-path {
          position: absolute;
          bottom: 50px;
          left: 0;
          width: 100%;
          height: 100px;
        }
        .mockup-chart-line {
          fill: none;
          stroke: #8844ee;
          stroke-width: 3;
          filter: drop-shadow(0 0 10px rgba(136, 68, 238, 0.8));
        }
      `}</style>

      {/* Navbar */}
      <div className="navbar">
        <div className="logo-icon">
          <div className="logo-icon-text">%<span style={{fontWeight: 400}}>=</span></div>
        </div>
        <div className="logo-text">
          sticky<span>card</span>
          <span className="logo-pro">— PRO —</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            Create High-Converting<br/>
            <span>Sticky Discount Cards</span><br/>
            That Increase Sales
          </h1>
          <p>
            Create beautiful sticky discount cards, floating offers, 
            coupon bars, and promotional widgets for your Shopify store. 
            Increase conversions without writing a single line of code.
          </p>

          {showForm && (
            <Form className="login-form" method="post" action="/auth/login">
              <input 
                className="login-input" 
                type="text" 
                name="shop" 
                placeholder="your-store.myshopify.com" 
                required
              />
              <button className="login-button" type="submit">
                Open Dashboard <span>→</span>
              </button>
            </Form>
          )}
        </div>

        <div className="mockup-container">
          <div className="mockup-board">
            <div className="mockup-header">
              <div className="mockup-sidebar">
                <div className="mockup-line" style={{width: '80%'}}></div>
                <div className="mockup-line"></div>
                <div className="mockup-line active"></div>
                <div className="mockup-line" style={{marginTop: '20px'}}></div>
                <div className="mockup-line" style={{width: '60%'}}></div>
              </div>
              <div className="mockup-main">
                <div className="mockup-cards">
                  <div className="mockup-card">
                    <div className="mockup-line" style={{width: '40%'}}></div>
                    <div className="mockup-line" style={{width: '80%', height: '8px', marginTop: 'auto'}}></div>
                  </div>
                  <div className="mockup-card">
                    <div className="mockup-line" style={{width: '60%'}}></div>
                    <div className="mockup-line" style={{width: '70%', height: '8px', marginTop: 'auto'}}></div>
                  </div>
                </div>
                <div className="mockup-chart">
                  <div className="mockup-chart-title">Dashboard Overview</div>
                  <svg className="mockup-chart-path" viewBox="0 0 500 100" preserveAspectRatio="none">
                    <path className="mockup-chart-line" d="M0,80 Q50,90 100,50 T150,70 T200,40 T250,60 T300,20 T350,50 T400,30 T450,50 T500,10" />
                  </svg>
                  <div style={{display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: '24px', left: '24px', right: '24px'}}>
                     <div className="mockup-line" style={{width: '50px'}}></div>
                     <div className="mockup-line" style={{width: '50px'}}></div>
                     <div className="mockup-line" style={{width: '50px'}}></div>
                     <div className="mockup-line" style={{width: '50px'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <div className="feature-text">
            <h3>Easy Setup</h3>
            <p>Install and set up in less than a minute.</p>
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📦</div>
          <div className="feature-text">
            <h3>No Coding Required</h3>
            <p>Everything works without any coding.</p>
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <div className="feature-text">
            <h3>Mobile Responsive</h3>
            <p>Looks perfect on every device and screen size.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
