export default class Film {
  constructor(
    image,
    name,
    desc,
    actors,
    director,
    genre,
    rating,
    calendar,
    user = null,
    id = null
  ) {
    this.image = image;
    this.name = name;
    this.desc = desc;
    this.actors = actors;
    this.director = director;
    this.genre = genre;
    this.rating = rating;
    this.calendar = calendar;
    this.user = user;
    this.id = id;
  }
}
