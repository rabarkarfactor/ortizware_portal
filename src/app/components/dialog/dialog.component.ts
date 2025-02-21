import { Component, inject } from '@angular/core';
import {
    MatDialog,
    MatDialogModule,
    MAT_DIALOG_DATA,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export enum DialogOps {
    Ok,
    OkCancel
}

export enum DialogType {
    Info,
    Alert,
    Directions,
    Error
}

export enum DialogResult {
    Ok,
    Cancel,
    Escape
}

export class DialogArgs {
    public title: string = '';
    public message: string = '';
    public ops: DialogOps = DialogOps.Ok;
    public type: DialogType = DialogType.Info;
}

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.css',
    imports: [
        MatDialogModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule
    ],
})
export class AppCommonDialog {
    protected DialogOps = DialogOps;
    protected dialogArgs: DialogArgs = inject(MAT_DIALOG_DATA);
}