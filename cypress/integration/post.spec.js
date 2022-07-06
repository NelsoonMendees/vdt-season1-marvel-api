import { validaCampos } from '../fixtures/validateCharacters.json';
import { Wanda } from '../fixtures/wanda.json';
import { Rogers } from '../fixtures/rogers.json';

describe('POST /characters', function () {
    it('Deve cadastrar um personagem', function () {
        cy.postCharacter(Wanda)
            .then(function (response) {
                expect(response.status).to.eql(201)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context('Quando o personagem já existe', function () {
        before(function () {
            cy.postCharacter(Rogers).then(function (response) {
                expect(response.status).to.eql(201)
            })
        })

        it('não deve cadastrar duplicado', function () {
            cy.postCharacter(Rogers).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })

    context('Quando um campo obrigatorio não é informado', function () {
        validaCampos.forEach(function (character) {
            it(`O campo '${character.campo}' é obrigatório!`, function () {
                cy.postCharacter(character).then(function (response) {
                    expect(response.status).to.be.eql(400)
                    expect(response.body.validation.body.message).to.be.eql(`"${character.campo}" is required`)
                })
            })
        })
    })
})