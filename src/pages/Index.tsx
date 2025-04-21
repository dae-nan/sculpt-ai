import * as React from "react";  // Added import to fix TS2686 error

import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import GoalSetupFlow from '@/components/GoalSetup/GoalSetupFlow';
import CoachMatchingResults from '@/components/CoachMatching/CoachMatchingResults';
import useStore from '@/store/useStore';
import InitialAssessmentForm from "@/components/Assessment/InitialAssessmentForm";
import useAssessmentStore from "@/store/useAssessmentStore";
import DailyPlanPreview from "@/components/DailyPlan/DailyPlanPreview";
import MorningCheckIn from "@/components/DailyPlan/MorningCheckIn";
import EndOfDayReflection from "@/components/DailyPlan/EndOfDayReflection";
import { Link } from "react-router-dom";
import useCheckInStore from "@/store/useCheckInStore";
import useReflectionStore from "@/store/useReflectionStore";

const Index = () => {
  const { isGoalSetupComplete, selectedCoach, generateMockDailyPlan, dailyPlan } = useStore();
  const [showCoachMatching, setShowCoachMatching] = React.useState(false);
  const [assessmentStarted, setAssessmentStarted] = React.useState(false);
  const [setupComplete, setSetupComplete] = React.useState(false);
  const { assessment } = useAssessmentStore();

  const { checkIn } = useCheckInStore();
  const { reflection } = useReflectionStore();

  const handleGoalSetupComplete = () => {
    setShowCoachMatching(true);
  };

  const handleCoachMatchingComplete = () => {
    setAssessmentStarted(true);
  };

  const handleAssessmentComplete = () => {
    setSetupComplete(true);
    console.log("Assessment complete:", assessment);
  };

  React.useEffect(() => {
    if (setupComplete && !dailyPlan) {
      generateMockDailyPlan(selectedCoach, assessment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupComplete, selectedCoach, assessment]);

  const today = new Date().toISOString().slice(0, 10);
  const showCheckIn = setupComplete && (!checkIn || checkIn.date !== today);
  const showEndOfDayReflection = setupComplete && dailyPlan && (!reflection || reflection.date !== today);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background py-6 border-b">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Sculpt
            <span className="text-primary ml-1">AI</span>
          </h1>
          <nav>
            <Link to="/progress" className="ml-4 text-sm text-primary underline hover:opacity-70 transition">
              Progress
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-10 min-h-[calc(100vh-180px)]">
        {!isGoalSetupComplete && !showCoachMatching && (
          <GoalSetupFlow onComplete={handleGoalSetupComplete} />
        )}

        {(isGoalSetupComplete || showCoachMatching) && !assessmentStarted && !setupComplete && (
          <CoachMatchingResults onComplete={handleCoachMatchingComplete} />
        )}

        {assessmentStarted && !setupComplete && (
          <InitialAssessmentForm onComplete={handleAssessmentComplete} />
        )}

        {setupComplete && (
          <>
            {showCheckIn && <MorningCheckIn />}
            {(!showCheckIn) && (
              <>
                <div className="max-w-md mx-auto text-center space-y-4 py-20">
                  <h2 className="text-2xl font-bold">All Set!</h2>
                  <p className="text-muted-foreground">
                    Your personalized fitness and nutrition plan is ready. In a full application, 
                    you would now proceed to the dashboard to see your program.
                  </p>
                </div>
                <DailyPlanPreview />
                {showEndOfDayReflection && <EndOfDayReflection />}
              </>
            )}
          </>
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
