import React from 'react';
import { ShieldCheck, Clock, Trash2, Volume2 } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

export const ResidentRulesPage: React.FC = () => {
  const { rules } = useBoardingHouse();

  const getRuleIcon = (category: string) => {
    switch (category) {
      case 'security':
        return <ShieldCheck size={20} color="#2563eb" />;
      case 'cleanliness':
        return <Trash2 size={20} color="#10b981" />;
      case 'noise':
        return <Volume2 size={20} color="#f59e0b" />;
      default:
        return <Clock size={20} color="#8b5cf6" />;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '840px' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Nội quy & Hướng dẫn sinh hoạt</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Quy định chung xây dựng nếp sống văn minh, an toàn và sạch sẽ cho toàn thể cư dân
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {rules.map((rule, index) => (
          <div
            key={rule.id}
            className="dashboard-card"
            style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {getRuleIcon(rule.category)}
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>
                Điều {index + 1}: {rule.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                {rule.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ResidentRulesPage;
