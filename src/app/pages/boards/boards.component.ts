import { Component, signal, ViewChild, WritableSignal } from "@angular/core";
import { CdkAccordionItem, CdkAccordionModule } from "@angular/cdk/accordion";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faBorderAll,
  faBorderTopLeft,
  faChevronDown,
  faChevronUp,
  faClock,
  faGear,
  faHeart,
  faHomeUser,
  faStar,
  faSuitcase,
  faTableColumns,
  faUser,
  faUsers,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { BtnComponent } from "@shared/btn/btn.component";
import { NavbarComponent } from "@shared/navbar/navbar.component";
import { AccordionItem } from "@models/accordeon.model";
import { BoardCardComponent } from "../board/components/board-card/board-card.component";

export interface ExpandStatus {
  visible: string;
  icon: IconDefinition;
}
@Component({
  selector: "app-boards",
  standalone: true,
  imports: [
    FontAwesomeModule,
    CdkAccordionModule,
    CdkAccordionItem,
    BtnComponent,
    NavbarComponent,
    BoardCardComponent,
    BtnComponent,
  ],
  templateUrl: "./boards.component.html",
})
export class BoardsComponent {
  @ViewChild(CdkAccordionItem) accordionItem!: CdkAccordionItem;

  faGear = faGear;
  faTrello = faTrello;
  faTableColumn = faTableColumns;
  faBorderTopLeft = faBorderTopLeft;
  faHomeUser = faHomeUser;
  faStar = faStar;
  faClock = faClock;
  faUser = faUser;
  faBorderAll = faBorderAll;
  faSuitcase = faSuitcase;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faHeart = faHeart;
  faUsers = faUsers;

  items: WritableSignal<AccordionItem[]> = signal([
    {
      label: "Item 1",
      expanded: false,
      items: [
        {
          label: "Item 1.1",
        },
      ],
    },
    {
      label: "Item 2",
      expanded: false,
      items: [
        {
          label: "item 2.1",
        },
        {
          label: "item 2.2",
        },
      ],
    },
    {
      label: "Item 3",
      expanded: false,
      items: [
        {
          label: "item 3.1",
        },
        {
          label: "item 3.2",
        },
        {
          label: "item 3.3",
        },
      ],
    },
  ]);

  expandDisplay = signal<string>("none");
  expandIcon = signal<IconDefinition>(faAngleDown);

  singleExpanded(expanded: boolean): void {
    this.expandDisplay.set(expanded ? "" : "none"),
    this.expandIcon.set(expanded ? faAngleUp : faAngleDown);
  }

  isExpanded(expanded: boolean, index: number): void {
    console.log(expanded);
    this.items.update((items: AccordionItem[]) =>
      items.map((items, i) => {
        console.log(expanded);
        if (i === index) {
          return {
            ...items,
            expanded,
          };
        }
        return items;
      })
    );
  }

  ngOnChanges() {
    console.log(this.accordionItem);
  }
}
