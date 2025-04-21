
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const steps = [
  "Weight & Sleep",
  "Experience",
  "Diet",
  "Equipment",
  "Body Fat % Guide",
];

interface AssessmentBreadcrumbsProps {
  currentStep: number;
}

const AssessmentBreadcrumbs = ({ currentStep }: AssessmentBreadcrumbsProps) => (
  <Breadcrumb className="mb-6">
    <BreadcrumbList>
      {steps.map((label, idx) => (
        <span key={label} className="flex items-center">
          <BreadcrumbItem>
            {currentStep === idx + 1 ? (
              <BreadcrumbPage>{label}</BreadcrumbPage>
            ) : (
              <span className={currentStep > idx + 1 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                {label}
              </span>
            )}
          </BreadcrumbItem>
          {idx < steps.length - 1 && <BreadcrumbSeparator />}
        </span>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
);

export default AssessmentBreadcrumbs;
