import { Gender } from "./gender";
import { Pronouns } from "./pronouns";

export interface Person {
  givenName: string;
  surname: string;
  preferredName: string;
  // honorific?: string; // "title coming before the surname, e.g. Mr., Lady, Sir, Princess"
  // appellation?: string; // "title coming after the name, e.g. X the Slave Maker, X the Bold, X the Cumslut"
  // TODO: flags for breasts and genitals rather than gender?
  gender: Gender;
  pronouns: Pronouns;
  race?: string;
}
