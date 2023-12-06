"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    class Character {
        constructor(id, name, species, status) {
            this.id = id;
            this.name = name;
            this.species = species;
            this.status = status;
        }
    }
    function loadCharacters() {
        return __awaiter(this, void 0, void 0, function* () {
            const charactersLS = localStorage.getItem("charactersAPI");
            if (charactersLS) {
                console.log("Cargando desde localStorage...");
                return JSON.parse(charactersLS);
            }
            console.log("Cargando desde API...");
            const url = "https://rickandmortyapi.com/api/character";
            const response = yield fetch(url);
            const characters = yield response.json();
            localStorage.setItem("charactersAPI", JSON.stringify(characters.results));
            return characters.results;
        });
    }
    function saveCharacter(character) {
        return __awaiter(this, void 0, void 0, function* () {
            const listCharacters = yield loadCharacters();
            listCharacters.push(character);
            localStorage.setItem("charactersAPI", JSON.stringify(listCharacters));
        });
    }
    console.log("Personajes iniciales:");
    console.table(yield loadCharacters());
    console.log("Personajes a agregar: ");
    const newCharacter = new Character(122, "El Magnifico", "Hada", "Strong");
    console.table(newCharacter);
    yield saveCharacter(newCharacter);
    console.log("Nueva lista:");
    console.table(yield loadCharacters());
}))();
