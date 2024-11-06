import { IconDefinition } from "@fortawesome/angular-fontawesome";

export interface AccordionItem {
  label: string;
  expanded: boolean;
  items: {label: string}[];
}
