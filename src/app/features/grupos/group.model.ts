import { signal } from "@angular/core";

export interface fixedGroupsInterface {
    src: string,
    shoIcon: boolean,
    text: string,
    description: string,
    linkGroup: string,
}

export const _fixeGroups = signal<fixedGroupsInterface[]>([]);
