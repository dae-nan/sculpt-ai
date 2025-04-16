
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import GoalSetupFlow from '@/components/GoalSetup/GoalSetupFlow';
import CoachMatchingResults from '@/components/CoachMatching/CoachMatchingResults';
import useStore from '@/store/useStore';

const Index = () => {
  const { isGoalSetupComplete } = useStore();
  const [showCoachMatching, setShowCoachMatching] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);

  // Display the appropriate step based on the user's progress
  const handleGoalSetupComplete = () => {
    setShowCoachMatching(true);
  };

  const handleCoachMatchingComplete = () => {
    setSetupComplete(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background py-6 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">
            Sculpt
            <span className="text-primary ml-1">AI</span>
          </h1>
        </div>
      </header>

      <main className="container mx-auto py-10 min-h-[calc(100vh-180px)]">
        {/* Show Goal Setup by default */}
        {!isGoalSetupComplete && !showCoachMatching && (
          <GoalSetupFlow onComplete={handleGoalSetupComplete} />
        )}

        {/* Show Coach Matching Results after Goal Setup */}
        {(isGoalSetupComplete || showCoachMatching) && !setupComplete && (
          <CoachMatchingResults onComplete={handleCoachMatchingComplete} />
        )}

        {/* Show Success Message after completing both steps */}
        {setupComplete && (
          <div className="max-w-md mx-auto text-center space-y-4 py-20">
            <h2 className="text-2xl font-bold">All Set!</h2>
            <p className="text-muted-foreground">
              Your personalized fitness and nutrition plan is ready. In a full application, 
              you would now proceed to the dashboard to see your program.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-muted py-6 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Sculpt AI. Your AI-powered fitness and nutrition coach.</p>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
