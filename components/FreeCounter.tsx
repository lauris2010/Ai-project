import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FRE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

interface ISidebarProps {
  apiLimitCount: number;
}

const FreeCounter = ({ apiLimitCount = 0 }: ISidebarProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4">
            <p>
              {apiLimitCount} / {MAX_FRE_COUNTS} Free generations
            </p>
            <Progress
              className="h-3 mt-2"
              value={(apiLimitCount / MAX_FRE_COUNTS) * 100}
            />
          </div>
          <Button className="w-full" variant="premium">
            Upgrade
            <Zap className="w-4 h-4 fill-white ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
