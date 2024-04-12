import { NgModule } from "@angular/core";
import { CardComponent } from "./card.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        CardComponent
    ],
    exports: [
        CardComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ]
})
export class CardModule {}