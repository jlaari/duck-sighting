export class Sighting {
  constructor(
      public species: string,
      public description: string,
      public dateTime: string,
      public count: number,
      public id?: string
    ) {
  }
}
