import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  color?: 'blue' | 'teal' | 'green' | 'yellow' | 'red' | 'purple';
  onClick?: () => void;
}

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  color = 'teal',
  onClick 
}: StatsCardProps) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          iconBg: 'bg-blue-100',
          iconText: 'text-blue-600',
          hover: onClick ? 'hover:shadow-lg hover:border-blue-200' : ''
        };
      case 'teal':
        return {
          iconBg: 'bg-teal-100',
          iconText: 'text-teal-600',
          hover: onClick ? 'hover:shadow-lg hover:border-teal-200' : ''
        };
      case 'green':
        return {
          iconBg: 'bg-green-100',
          iconText: 'text-green-600',
          hover: onClick ? 'hover:shadow-lg hover:border-green-200' : ''
        };
      case 'yellow':
        return {
          iconBg: 'bg-yellow-100',
          iconText: 'text-yellow-600',
          hover: onClick ? 'hover:shadow-lg hover:border-yellow-200' : ''
        };
      case 'red':
        return {
          iconBg: 'bg-red-100',
          iconText: 'text-red-600',
          hover: onClick ? 'hover:shadow-lg hover:border-red-200' : ''
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-100',
          iconText: 'text-purple-600',
          hover: onClick ? 'hover:shadow-lg hover:border-purple-200' : ''
        };
      default:
        return {
          iconBg: 'bg-gray-100',
          iconText: 'text-gray-600',
          hover: onClick ? 'hover:shadow-lg hover:border-gray-200' : ''
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div 
      className={`medical-card transition-all duration-200 ${colorClasses.hover} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="medical-card-body">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-full ${colorClasses.iconBg} flex items-center justify-center flex-shrink-0`}>
            <div className={`text-xl ${colorClasses.iconText}`}>
              {icon}
            </div>
          </div>
        </div>

        {trend && (
          <div className="flex items-center">
            <span 
              className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isPositive ? '↗' : '↘'} {trend.value}
            </span>
            <span className="text-sm text-gray-500 mr-2">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
