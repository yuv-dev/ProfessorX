"use client";
import { motion } from "framer-motion";
import Progress from "@/components/ui/Progress";
import { Card, CardContent } from "@/components/ui/Card";

export default function AnalyticsCard({
  icon: Icon,
  title,
  value,
  subtitle,
  progress,
  color = "text-blue-600",
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="hover:shadow-md transition">
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Icon className={`w-8 h-8 ${color}`} />
            <div>
              <p className="text-sm text-gray-500">{title}</p>
              <h3 className="text-2xl font-semibold">{value}</h3>
            </div>
          </div>

          {progress !== undefined && (
            <div className="space-y-1">
              <Progress value={progress} />
              {subtitle && (
                <p className="text-xs text-gray-400">{subtitle}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
