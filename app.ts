(async() => {
    class Character implements ICharacter {
        constructor(
        public id:  number,
        public name: string,
        public species: string,
        public status: string
        ){}
    }
    
    interface Characters {
        results: Character[]
    }
    
    interface ICharacter {
        id:       number;
        name:     string;
        status:   string;
        species:  string;
        type?:     string;
        gender?:   string;
        origin?:   Location;
        location?: Location;
        image?:    string;
        episode?:  string[];
        url?:      string;
        created?:  Date;
    }
    
    interface Location {
        name: string;
        url:  string;
    }
    
    async function  loadCharacters(): Promise<Character[]>{
        const charactersLS: string | null = localStorage.getItem("charactersAPI");
        if(charactersLS){
            console.log("Cargando desde localStorage...")
            return JSON.parse(charactersLS)
        }
        console.log("Cargando desde API...")
        const url: string = "https://rickandmortyapi.com/api/character";
        const response: Response = await fetch(url);
        const characters: Characters = await response.json();
        localStorage.setItem("charactersAPI", JSON.stringify(characters.results));
        return characters.results
    }
    
    async function saveCharacter(character: Character): Promise<void>{
        const listCharacters: Character[] = await loadCharacters();
        listCharacters.push(character);
        localStorage.setItem("charactersAPI", JSON.stringify(listCharacters));
    }
    
    console.log("Personajes iniciales:");
    console.table(await loadCharacters());
    
    console.log("Personajes a agregar: ");
    const newCharacter: Character = new Character(122, "El Magnifico", "Hada", "Strong");
    console.table(newCharacter);
    
    await saveCharacter(newCharacter);
    console.log("Nueva lista:");
    console.table(await loadCharacters());
    })()