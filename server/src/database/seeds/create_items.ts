import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: 'Lâmpadas', image: 'lampadas.svg' },
        { title: 'Pilhas e Baterias', image: 'baterias.svg'},
        { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'},
        { title: 'Oléo', image: 'lampadas.svg'},
        { title: 'Resíduos Orgânicos', image: 'organicos.svg'},
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
    ]);
}