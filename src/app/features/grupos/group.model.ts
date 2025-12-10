import { signal } from "@angular/core";

export interface fixedGroupsInterface {
    src: string,
    shoIcon: boolean,
    text: string,
    linkGroup: string,
}

export const _fixeGroups = signal<fixedGroupsInterface[]>([
    {
        src: 'fd-g-1.jpg', //Icone
        shoIcon: true,
        text: 'Geral 2',
        linkGroup: 'H3uqzOSGodo9URWQbKQBgq'
    },
    {
        src: 'fd-default.jpg', //Icone
        shoIcon: true,
        text: 'Linkedin',
        linkGroup: 'KtO57yX6Ytx7Shee1SUUWZ'
    },
    {
        src: 'fd-default.jpg', //Icone
        shoIcon: true,
        text: 'Promoções',
        linkGroup: 'DtHVvrUZL2c1slBnfqvaN7'
    },
    {
        src: 'fd-default.jpg', //Icone
        shoIcon: true,
        text: 'Vagas e Freelas 1',
        linkGroup: 'J6V7iaZv8AFFO05RG7SpEs'
    },
    {
        src: 'fd-default.jpg', //Icone
        shoIcon: true,
        text: 'Vagas e Freelas 2',
        linkGroup: 'DiEyNx37vLe3pQQvBg9x9U'
    },
    {
        src: 'fd-default.jpg', //Icone
        shoIcon: true,
        text: 'BackEnd',
        linkGroup: 'ElrsyS77NHj9YOirwP3I0b'
    },
    {
        src: 'fd-default.jpg', //Icone
        shoIcon: true,
        text: 'FrontEnd',
        linkGroup: 'LlqIsyvg1zn62m7TdvJthb'
    },
    {
        src: 'fd-english.jpg', //Icone
        shoIcon: true,
        text: 'Only English',
        linkGroup: 'HcDc5HtAHzr0q4a7vPBJfS'
    },
    {
        src: 'fd-default.jpg', //Icone
        shoIcon: true,
        text: 'Strong',
        linkGroup: 'IWEV2ThDLrxK0crZXrAT4X'
    },
])
