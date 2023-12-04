/// <reference types="cypress" />

describe('Manipulação Trello via API', () => {
    let id_board;
    let id_list;
    let id_card;

    it('Deve criar um novo board', () => {
        const name = 'Test board api trello';
        const apiKey = Cypress.env("api_key");
        const apiToken = Cypress.env("api_token");

        cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/boards/?name=${name}&key=${apiKey}&token=${apiToken}`,
            body: { defaultLists: false }
        }).then((response) => {
            expect(response.status).to.equal(200);
            id_board = response.body.id;
            expect(response.body.name).to.equal(name);
        });
    });

    it('Deve criar uma nova lista no board', () => {
        const listName = 'Coluna trello api test';
        const apiKey = Cypress.env("api_key");
        const apiToken = Cypress.env("api_token");

        expect(id_board).to.not.be.undefined;

        cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/lists?name=${listName}&idBoard=${id_board}&key=${apiKey}&token=${apiToken}`,
        }).then((response) => {
            expect(response.status).to.equal(200);
            id_list = response.body.id; // Salva o id da lista na variável id_list
            expect(response.body.name).to.equal(listName);
        });
    });

    it('Deve criar um card na lista', () => {
        const cardName = 'Card test api';
        const apiKey = Cypress.env("api_key");
        const apiToken = Cypress.env("api_token");

        expect(id_list).to.not.be.undefined;

        cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/cards?idList=${id_list}&key=${apiKey}&token=${apiToken}`,
            body: { name: cardName },
        }).then((response) => {
            expect(response.status).to.equal(200);
            id_card = response.body.id;
            expect(response.body.name).to.equal(cardName);
        })

    })

    it('Deve excluir o card criado', ()=>{
        const apiKey = Cypress.env("api_key");
        const apiToken = Cypress.env("api_token");

        expect(id_card).to.not.be.undefined;

        cy.request({
            method: 'DELETE',
            url: `https://api.trello.com/1/cards/${id_card}?key=${apiKey}&token=${apiToken}`,
          }).then((response) => {
            expect(response.status).to.equal(200);
          });
    })

    it('Deve excluir o board criado', ()=>{
        const apiKey = Cypress.env("api_key");
        const apiToken = Cypress.env("api_token");

        expect(id_board).to.not.be.undefined;

        cy.request({
            method: 'DELETE',
            url: `https://api.trello.com/1/boards/${id_board}?key=${apiKey}&token=${apiToken}`,
          }).then((response) => {
            expect(response.status).to.equal(200);
          });
    })
});
