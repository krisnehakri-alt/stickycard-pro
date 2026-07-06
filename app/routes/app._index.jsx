import { useLoaderData, useNavigate } from "react-router";
import { authenticate } from "../shopify.server";
import { 
  Page, 
  Text,
  Badge,
  Icon
} from "@shopify/polaris";
import { 
  ChevronRightIcon
} from "@shopify/polaris-icons";

export const loader = async ({ request }) => {
  try {
    const { billing } = await authenticate.admin(request);
    
    // Check active subscription
    const billingCheck = await billing.check({
      plans: ["STARTER", "GROWTH", "PREMIUM"],
      isTest: true,
    });
  
    const activeSubscription = billingCheck.hasActivePayment 
      ? billingCheck.appSubscriptions[0].name 
      : "FREE";
      
    return {
      activeSubscription,
    };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error("[app._index.jsx] Critical loader error:", error);
    throw error;
  }
};

export default function Dashboard() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const customStyles = `
    .dashboard-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    
    .ui-card {
      background: #ffffff;
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }

    .flex-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .flex-center {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .black-btn {
      background: #111111;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    .black-btn:hover {
      background: #000000;
    }

    .badge-free {
      background: #e3f1df;
      color: #2e6b28;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      margin-left: 8px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #111;
      margin-bottom: 20px;
    }

    .icon-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-green {
      background: #e6f6eb;
      color: #23a059;
    }
    .icon-purple {
      background: #f3effc;
      color: #7b4cf6;
    }
    .icon-orange {
      background: #fef4e8;
      color: #f39c12;
    }

    .stat-label {
      font-size: 13px;
      color: #666;
      margin-bottom: 4px;
    }
    .stat-value {
      font-size: 16px;
      font-weight: 700;
      color: #111;
    }

    .vertical-divider {
      width: 1px;
      height: 40px;
      background: #e5e5e5;
      margin: 0 40px;
    }

    .quick-actions-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    
    .quick-action-card {
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.2s;
      background: #ffffff;
    }
    
    .quick-action-card:hover {
      border-color: #d0d0d0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      transform: translateY(-2px);
    }
    
    .action-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .action-text {
      font-size: 14px;
      font-weight: 500;
      color: #111;
    }

    @media (max-width: 768px) {
      .quick-actions-grid {
        grid-template-columns: 1fr;
      }
      .vertical-divider {
        display: none;
      }
      .flex-between {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      .subs-layout {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 20px;
      }
    }
  `;

  return (
    <Page fullWidth>
      <style>{customStyles}</style>
      
      <div className="dashboard-container">
        {/* Welcome Banner */}
        <div className="ui-card flex-between">
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#111' }}>
              Welcome back to Stickycards Pro
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#555' }}>
              Your store is currently on the 
              <span className="badge-free">{data.activeSubscription} PLAN</span>
            </div>
          </div>
          <div>
            <button className="black-btn" onClick={() => navigate("/app/templates")}>
              Create Sticky Card
            </button>
          </div>
        </div>

        {/* Subscription Plan */}
        <div className="ui-card">
          <div className="section-title">Subscription Plan</div>
          
          <div className="flex-between subs-layout" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div className="flex-center">
                <div className="icon-circle icon-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
                </div>
                <div>
                  <div className="stat-label">Current Plan</div>
                  <div className="stat-value">{data.activeSubscription} PLAN</div>
                </div>
              </div>

              <div className="vertical-divider"></div>

              <div className="flex-center">
                <div className="icon-circle icon-purple">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>
                </div>
                <div>
                  <div className="stat-label">Templates Unlocked</div>
                  <div className="stat-value">
                    {data.activeSubscription === 'FREE' ? '1 / 7' : 
                     data.activeSubscription === 'STARTER' ? '3 / 7' : 
                     data.activeSubscription === 'GROWTH' ? '5 / 7' : '7 / 7'}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button className="black-btn" onClick={() => navigate("/app/billing")}>
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="ui-card">
          <div className="section-title">Quick Actions</div>
          
          <div className="quick-actions-grid">
            <div className="quick-action-card" onClick={() => navigate("/app/templates")}>
              <div className="action-left">
                <div className="icon-circle icon-green" style={{ width: '40px', height: '40px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </div>
                <div className="action-text">Create Sticky Card</div>
              </div>
              <div style={{ color: '#999' }}>
                <Icon source={ChevronRightIcon} />
              </div>
            </div>

            <div className="quick-action-card" onClick={() => navigate("/app/templates")}>
              <div className="action-left">
                <div className="icon-circle icon-purple" style={{ width: '40px', height: '40px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>
                </div>
                <div className="action-text">Templates</div>
              </div>
              <div style={{ color: '#999' }}>
                <Icon source={ChevronRightIcon} />
              </div>
            </div>

            <div className="quick-action-card" onClick={() => navigate("/app/billing")}>
              <div className="action-left">
                <div className="icon-circle icon-orange" style={{ width: '40px', height: '40px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <div className="action-text">Billing</div>
              </div>
              <div style={{ color: '#999' }}>
                <Icon source={ChevronRightIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
