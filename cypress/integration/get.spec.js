import { Characters, Titan } from '../fixtures/populate.json';

describe('Get /characters', function () {
    before(function () {
        cy.populateCharacters(Characters);
    })

    it('Deve retornar uma lista de personagens', function () {
        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200);
            expect(response.body).to.be.a('array');
            expect(response.body.length).greaterThan(0);
        })
    })

    it('Deve buscar personagem por nome', function () {
        cy.searchCharacters('Wade W. Wilson').then(function (response) {
            expect(response.status).to.eql(200);
            expect(response.body.length).to.eql(1);
            expect(response.body[0].alias).to.eql('Deadpool');
            expect(response.body[0].team).to.eql(['Quatro Terríveis']);
        })
    })
})

describe('GET /characters/id', function () {
    context('Quando tenho um personagem cadastrado', function () {
        before(function () {
            cy.postCharacter(Titan).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve buscar o personagem pelo ID', function () {
            const id = Cypress.env('characterId')
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(200);
                expect(response.body.alias).to.eql('Titã Louco');
                expect(response.body.team).to.eql(['Ordem Negra']);
            })
        })
    })

    context('Quando não tenho um personagem cadastrado', function () {

        it('deve retornar 404 ao buscar por id não cadastrado', function () {
            const id = '62c4c53da8d0b277770b9a01'
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(404);
            })
        })
    })

})