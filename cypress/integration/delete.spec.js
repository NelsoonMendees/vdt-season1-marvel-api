import {Cyclops} from '../fixtures/cyclops.json'

describe('DELETE /characters/id', function () {
    context('Quando tenho um personagem cadastrado', function () {
        before(function () {
            cy.postCharacter(Cyclops).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve remover o personagem pelo ID', function () {
            const id = Cypress.env('characterId')
            cy.deleteCharacterById(id).then(function (response) {
                expect(response.status).to.eql(204);
            })
        })

        after(function () {
            const id = Cypress.env('characterId')
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })

    context('Quando não tenho um personagem cadastrado', function () {

        it('deve retornar 404 ao remover por id não cadastrado', function () {
            const id = '62c4c53da8d0b277770b9a01'
            cy.deleteCharacterById(id).then(function (response) {
                expect(response.status).to.eql(404);
            })
        })
    })
})