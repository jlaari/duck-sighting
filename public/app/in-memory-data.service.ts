import { InMemoryDbService } from "angular-in-memory-web-api";
import { Sighting } from "./sightings/shared/sighting";

export class InMemoryDataService implements InMemoryDbService {
  private sightings = [
    {
      "id": "1",
      "species": "gadwall",
      "description": "All your ducks are belong to us",
      "dateTime": "2016-10-01T01:01:00Z",
      "count": 1
    },
    {
      "id": "2",
      "species": "lesser scaup",
      "description": "This is awesome",
      "dateTime": "2016-12-13T12:05:00Z",
      "count": 5
    }
  ];

  genId() {
    return this.sightings.length + 1;
  }
  createDb() {
    const species = [
      {
        name: "mallard"
      },
      {
        name: "redhead"
      },
      {
        name: "gadwall"
      },
      {
        name: "canvasback"
      },
      {
        name: "lesser scaup"
      }
    ];
    const sightings = this.sightings;
    return {sightings, species};
  }
}
