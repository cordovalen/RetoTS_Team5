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
    
    
    const url: string = "https://rickandmortyapi.com/api/character";
    const response: Response = await fetch(url);
    const characters: Characters = await response.json();
    characters.results.map(item => {
        console.log(item);
    })
    
    const newCharacter: Character = new Character(122, "Pepito El Magnifico", "Hada", "Strong");
    
    console.log(newCharacter);
    
    })()