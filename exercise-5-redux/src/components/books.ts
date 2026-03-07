export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    genre: string;
    rating: number;
    price: number;
}

export const books = [
  {
      id: 1,
      title: "Мастер и Маргарита",
      author: "Михаил Булгаков",
      year: 1967,
      genre: "Фантастика, Классика",
      rating: 4.9,
      price: 7.5
  },
  {
      id: 2,
      title: "1984",
      author: "Джордж Оруэлл",
      year: 1949,
      genre: "Антиутопия",
      rating: 4.8,
      price: 8.5
  },
  {
      id: 3,
      title: "Цветы для Элджернона",
      author: "Дэниел Киз",
      year: 1959,
      genre: "Научная фантастика, Драма",
      rating: 4.7,
      price: 6.5
  },
  {
      id: 4,
      title: "Sapiens: Краткая история человечества",
      author: "Юваль Ной Харари",
      year: 2011,
      genre: "Научпоп, История",
      rating: 4.6,
      price: 7.0
  },
  {
      id: 5,
      title: "Ведьмак: Последнее желание",
      author: "Анджей Сапковский",
      year: 1993,
      genre: "Фэнтези",
      rating: 4.8,
      price: 7.0
  },
  {
      id: 6,
      title: "Маленький принц",
      author: "Антуан де Сент-Экзюпери",
      year: 1943,
      genre: "Сказка, Философия",
      rating: 5.0,
      price: 9.0
  },
  {
      id: 7,
      title: "Атлант расправил плечи",
      author: "Айн Рэнд",
      year: 1957,
      genre: "Философия, Роман",
      rating: 4.3,
      price: 8.0
  },
  {
      id: 8,
      title: "Дюна",
      author: "Фрэнк Герберт",
      year: 1965,
      genre: "Научная фантастика",
      rating: 4.7,
      price: 10.5
  },
  {
  id: 9,
      title: "Краткая история времени",
      author: "Стивен Хокинг",
      year: 1988,
      genre: "Научпоп, Физика",
      rating: 4.5,
      price: 10.5
  },
  {
      id: 10,
      title: "Преступление и наказание",
      author: "Федор Достоевский",
      year: 1866,
      genre: "Классика, Психология",
      rating: 4.9,
      price: 7.5
  }
 ]