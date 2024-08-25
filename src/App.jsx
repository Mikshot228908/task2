import React, { useEffect, useState } from "react";

const booksData = [
  {
    title: "1984",
    author: "Джордж Оруэлл",
    description:
      "мрачный роман-предупреждение об авторитарном правительстве, контролирующем каждый аспект общественной и частной жизни.",
    review: "test text (Reviewer)",
  },
  {
    title: "Повелитель мух",
    author: "Уильям Голдинг",
    description:
      "аллегорический роман о группе мальчиков, оказавшихся на необитаемом острове, который служит метафорой для темной стороны человеческой природы.",
    review: "test text (Reviewer)",
  },
  {
    title: "Над пропастью во ржи",
    author: "Джереми Сэлинджер",
    description:
      "история подростка Холдена Колфилда, отвергающего лицемерие и притворство взрослого мира, предпочитая честность и непосредственность.",
    review: "test text (Reviewer)",
  },
  {
    title: "Война и мир",
    author: "Лев Толстой",
    description:
      "эпическая история о жизни русского дворянства на фоне наполеоновских войн, исследующая темы любви, войны, смерти и смысла жизни.",
    review: "test text (Reviewer)",
  },
  {
    title: "Гордость и предубеждение",
    author: "Джейн Остин",
    description:
      "комедийный роман о жизни английского провинциального дворянства начала 19 века, рассказывающий историю Элизабет Беннет и ее борьбы за любовь и независимость.",
    review: "test text (Reviewer)",
  },
  {
    title: "Убить пересмешника",
    author: "Харпер Ли",
    description:
      "классический роман о расовой сегрегации и борьбе за справедливость в американском южном городке, глазами восьмилетней девочки.",
    review: "test text (Reviewer)",
  },
  {
    title: "Гроздья гнева",
    author: "Джон Стейнбек",
    description:
      "эпический роман о Великой депрессии, рассказывающий о семье Джоудов, вынужденных покинуть свою ферму и отправиться в Калифорнию в поисках лучшей жизни.",
    review: "test text (Reviewer)",
  },
  {
    title: "На дороге",
    author: "Джек Керуак",
    description:
      "автобиографический роман, описывающий жизнь поколения битников, их поиски себя и своего места в мире.",
    review: "test text (Reviewer)",
  },
  {
    title: "Великий Гэтсби",
    author: "Фрэнсис Скотт Фицджеральд",
    description:
      "роман о разочаровании, предательстве и американской мечте, рассказывающий историю Джея Гэтсби, его стремления вернуть свою утраченную любовь и его трагический конец.",
    review: "test text (Reviewer)",
  },
  {
    title: "Идиот",
    author: "Федор Достоевский",
    description:
      "психологический роман о князе Мышкине, который приезжает в Россию после нескольких лет пребывания в Швейцарии, и его столкновении с жестокостью и порочностью русской жизни.",
    review: "test text (Reviewer)",
  },
];

const requestBooks = async (query) => {
  const filteredBooks = booksData.filter((book) => {
    const filterTitle = query.title ? book.title.includes(query.title) : true;
    const filterAuthor = query.author
      ? book.author.includes(query.author)
      : true;
    return filterTitle && filterAuthor;
  });

  const offset = query.offset || 0;
  const limit = query.limit || 4;
  return filteredBooks.slice(offset, offset + limit);
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(4);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await requestBooks({
          title: titleFilter,
          author: authorFilter,
          limit,
          offset: (page - 1) * limit,
        });
        setBooks(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [titleFilter, authorFilter, page, limit]);

  const handleTitleChange = (e) => {
    setTitleFilter(e.target.value);
    setPage(1);
  };

  const handleAuthorChange = (e) => {
    setAuthorFilter(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <h1>Список книг</h1>

      <input
        type="text"
        placeholder="Фильтр по названию"
        value={titleFilter}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Фильтр по автору"
        value={authorFilter}
        onChange={handleAuthorChange}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && books.length === 0 && <p>Книги не найдены</p>}

      <ul>
        {!loading &&
          !error &&
          books.map((book, index) => (
            <li key={index}>
              <strong>{book.title}</strong>
              <br />
              Автор: {book.author}
              <br />
              Описание: {book.description}
              <br />
              Отзыв: {book.review}
              <br />
            </li>
          ))}
      </ul>

      <button onClick={handlePrevPage} disabled={page === 1}>
        Назад
      </button>
      <button onClick={handleNextPage} disabled={books.length < limit}>
        Вперед
      </button>
    </div>
  );
};

export default BookList;
