import { type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: 'white' | 'blue' | 'purple' | 'green' | 'orange' | 'pink';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

const variantStyles = {
  white: {
    gradient: 'from-white/10 to-card',
    icon: 'text-white',
    glow: 'hover:shadow-white/20',
  },
  blue: {
    gradient: 'from-chart-1/20 to-card',
    icon: 'text-chart-1',
    glow: 'hover:shadow-chart-1/20',
  },
  purple: {
    gradient: 'from-chart-4/20 to-card',
    icon: 'text-chart-4',
    glow: 'hover:shadow-chart-4/20',
  },
  green: {
    gradient: 'from-chart-2/20 to-card',
    icon: 'text-chart-2',
    glow: 'hover:shadow-chart-2/20',
  },
  orange: {
    gradient: 'from-chart-3/20 to-card',
    icon: 'text-chart-3',
    glow: 'hover:shadow-chart-3/20',
  },
  pink: {
    gradient: 'from-chart-5/20 to-card',
    icon: 'text-chart-5',
    glow: 'hover:shadow-chart-5/20',
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  variant = 'blue',
  trend,
  delay = 0,
}: StatCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  // Animates the number counting up when the component mounts or when the value changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(true);
      const duration = 800;
      const steps = 60;
      const stepValue = value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep === steps) {
          clearInterval(timer);
          setIsAnimating(false);
          setDisplayValue(value);
        } else {
          setDisplayValue(Math.floor(stepValue * currentStep));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  const styles = variantStyles[variant];

  return (
    <Card
      className={cn(
        'group relative overflow-hidden rounded-sm border-border/50 bg-linear-to-br transition-all duration-300 ease-in-out',
        'hover:scale-[1.02] hover:shadow-lg',
        styles.gradient,
        styles.glow,
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3
                className={cn(
                  'text-3xl font-bold tracking-tight transition-all duration-300',
                  isAnimating && 'scale-110',
                )}
              >
                {displayValue.toLocaleString()}
              </h3>
              {trend && (
                <span
                  className={cn(
                    'text-xs font-medium',
                    trend.isPositive
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400',
                  )}
                >
                  {trend.isPositive ? '+' : ''}
                  {trend.value}%
                </span>
              )}
            </div>
          </div>
          <div
            className={cn(
              'rounded-lg bg-background/50 p-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12',
              styles.icon,
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatCardSkeleton() {
  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-12 w-12 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}
