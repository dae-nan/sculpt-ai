
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Coach } from "@/store/useStore";

interface CoachCardProps {
  coach: Coach;
  isSelected: boolean;
  onSelect: (coach: Coach) => void;
}

const CoachCard = ({ coach, isSelected, onSelect }: CoachCardProps) => {
  return (
    <Card className={`h-full flex flex-col ${coach.recommended ? 'border-primary' : ''} ${isSelected ? 'bg-secondary/50' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="w-16 h-16 bg-secondary/80 rounded-full overflow-hidden">
            <img 
              src={coach.photoUrl} 
              alt={coach.name} 
              className="w-full h-full object-cover"
            />
          </div>
          {coach.recommended && (
            <Badge variant="default" className="ml-auto">Recommended</Badge>
          )}
        </div>
        <CardTitle className="text-xl">{coach.name}</CardTitle>
        <CardDescription>
          <div className="flex flex-wrap gap-1 mt-1">
            {coach.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {specialty}
              </Badge>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="text-sm font-semibold mb-2">Key Achievements</h4>
        <ul className="text-sm list-disc pl-5 mb-4">
          {coach.achievements.map((achievement, index) => (
            <li key={index} className="mb-1">{achievement}</li>
          ))}
        </ul>
        
        <h4 className="text-sm font-semibold mb-1">Coaching Philosophy</h4>
        <p className="text-sm text-muted-foreground">{coach.philosophy}</p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelect(coach)} 
          variant={isSelected ? "default" : "outline"}
          className="w-full"
        >
          {isSelected ? "Selected" : "Select Coach"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoachCard;
