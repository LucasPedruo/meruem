import { signal } from "@angular/core";

export interface fixedGroupsInterface {
    src: string,
    shoIcon: boolean,
    text: string,
    description: string,
    linkGroup: string,
}

export const _fixeGroups = signal<fixedGroupsInterface[]>([
    {
        src: 'fulldev.png', //Icone
        shoIcon: true,
        text: 'Vagas 1',
        description: '1022 de 1024 Membros',
        linkGroup: 'J6V7iaZv8AFFO05RG7SpEs'
    },
    {
        src: 'fulldev.png', //Icone
        shoIcon: true,
        text: 'Vagas 2',
        description: '156 de 1024 Membros',
        linkGroup: 'DiEyNx37vLe3pQQvBg9x9U'
    },
    {
        src: 'icon-white-red.png', //Icone
        shoIcon: true,
        text: 'Off Topic - 1',
        description: '381 de 1024 Membros',
        linkGroup: 'LlqIsyvg1zn62m7TdvJthb'
    },
    {
        src: 'icon-white-red.png', //Icone
        shoIcon: true,
        text: 'Off Topic - 2',
        description: '445 de 1024 Membros',
        linkGroup: 'ElrsyS77NHj9YOirwP3I0b'
    },
    {
        src: 'fulldev.png', //Icone
        shoIcon: true,
        text: 'Games',
        description: '10 de 1024 Membros',
        linkGroup: 'CfM0zq1T8Oo9b9yvs0HZRK'
    },
])
