export class GOTBookModel {
    constructor(
        public url: string,
        public name: string,
        public isbn: string,
        public authors: Array<string>,
        public numberOfPages: number,
        public publisher: string,
        public country: string,
        public mediaType: string,
        public released: string,
        public characters: Array<string>,
        public povCharacters: Array<string>
    ) {}
}
