import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from "@angular/core";
import { CdkAccordionItem, CdkAccordionModule } from "@angular/cdk/accordion";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faBorderAll,
  faBorderTopLeft,
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
import { RouterLinkWithHref } from "@angular/router";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { BtnComponent } from "@shared/btn/btn.component";
import { NavbarComponent } from "@shared/navbar/navbar.component";
import { AccordionItem } from "@models/accordeon.model";
import { MeService } from "@services/me.service";
import { Board } from "@models/board.model";
import { CardColorComponent } from "@shared/card-color/card-color.component";

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
    RouterLinkWithHref,
    CdkAccordionItem,
    BtnComponent,
    NavbarComponent,
    CardColorComponent,
    BtnComponent,
  ],
  templateUrl: "./boards.component.html",
})
export class BoardsComponent implements OnInit {
  @ViewChild(CdkAccordionItem) accordionItem!: CdkAccordionItem;

  private meService: MeService = inject(MeService);
  boards: WritableSignal<Board[]> = signal([]);
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

  ngOnInit() {
    this.getMeBoards();
  }

  ngOnChanges() {
    console.log(this.accordionItem);
  }

  getMeBoards(): void {
    this.meService.getMeBoards().subscribe({
      next: (boards: Board[]) => {
          this.boards.set(boards);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
