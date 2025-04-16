
import { Coach } from '@/store/useStore';

export const coaches: Coach[] = [
  {
    id: '1',
    name: 'Dr. James Morehen',
    photoUrl: '/placeholder.svg',
    specialties: ['Sport Nutrition', 'Periodized Strength', 'Athletic Performance'],
    achievements: [
      'PhD in Sports Nutrition',
      'Worked with elite field hockey players',
      'Published research on body composition optimization'
    ],
    philosophy: 'Integrating nutrition timing with training periodization for optimal performance and body composition.',
    recommended: true
  },
  {
    id: '2',
    name: 'Mike Boyle',
    photoUrl: '/placeholder.svg',
    specialties: ['Mobility', 'Hockey Conditioning', 'Injury Prevention'],
    achievements: [
      'Trained Olympic athletes',
      'Developed the joint-by-joint approach to training',
      'Author of multiple strength & conditioning books'
    ],
    philosophy: 'Focus on movement quality first, then layering sport-specific conditioning.'
  },
  {
    id: '3',
    name: 'Greg Nuckols',
    photoUrl: '/placeholder.svg',
    specialties: ['Strength Periodization', 'Evidence-Based Training', 'Hypertrophy'],
    achievements: [
      'Elite powerlifter',
      'Founded Stronger By Science',
      'Data-driven approach to strength development'
    ],
    philosophy: 'Using scientific principles to maximize strength and muscle gains while minimizing injury risk.'
  },
  {
    id: '4',
    name: 'Layne Norton',
    photoUrl: '/placeholder.svg',
    specialties: ['Contest Prep', 'Nutrition Science', 'Metabolism Optimization'],
    achievements: [
      'PhD in Nutritional Sciences',
      'Natural pro bodybuilder and powerlifter',
      'Developed metabolic adaptation protocols'
    ],
    philosophy: 'Science-based nutrition and training for optimal body composition with sustainable approaches.'
  },
  {
    id: '5',
    name: 'Natalie Rigby',
    photoUrl: '/placeholder.svg',
    specialties: ['Female Athletic Performance', 'Team Sport Conditioning', 'Recovery Optimization'],
    achievements: [
      'Former national team hockey player',
      'Specialized in female-specific training adaptations',
      'Developed periodization for dual-sport athletes'
    ],
    philosophy: 'Tailoring training approaches to female physiology and the specific demands of team sports.'
  }
];

export const getCoachesByObjectives = (objectives: string[], sport?: string): Coach[] => {
  // This is a mock matching algorithm
  // In a real app, this would be more sophisticated
  const matchedCoaches = coaches.filter(coach => {
    // Check if the coach has any specialty that matches the objectives
    const hasMatchingSpecialty = coach.specialties.some(specialty => 
      objectives.some(objective => 
        specialty.toLowerCase().includes(objective.toLowerCase())
      )
    );
    
    // Check if the coach specializes in the selected sport
    const matchesSport = !sport || coach.specialties.some(
      specialty => specialty.toLowerCase().includes(sport.toLowerCase())
    );
    
    return hasMatchingSpecialty || matchesSport;
  });
  
  // If no matches, return all coaches
  return matchedCoaches.length > 0 ? matchedCoaches : coaches;
};
