### Справочные таблицы

**1. `Segments`**
*   `id` (PK, SERIAL)
*   `code` (VARCHAR, UNIQUE, NOT NULL) -- 'instincts', 'intellect', 'balance'
*   `name` (VARCHAR, NOT NULL)

**2. `Topics`**
*   `id` (PK, SERIAL)
*   `slug` (VARCHAR, UNIQUE, NOT NULL) -- 'eas', 'selfx', 'live', 'doc', 'srl'
*   `name` (VARCHAR, NOT NULL)

---

### Основные сущности

**3. `Creators`**
*   `id` (PK, SERIAL)
*   `segment_id` (FK -> Segments.id, NOT NULL)
*   `name` (VARCHAR, NOT NULL)
*   `bio` (TEXT)
*   `photo_url` (VARCHAR)
*   `birth_date` (DATE)
*   `created_at` (TIMESTAMP)

**4. `Movies`**
*   `id` (PK, SERIAL)
*   `segment_id` (FK -> Segments.id, NOT NULL)
*   `title` (VARCHAR, NOT NULL)
*   `description` (TEXT)
*   `release_year` (INTEGER)
*   `duration_minutes` (INTEGER)
*   `poster_url` (VARCHAR)
*   `video_url` (VARCHAR)
*   `created_at` (TIMESTAMP)

**5. `Music_Albums`**
*   `id` (PK, SERIAL)
*   `segment_id` (FK -> Segments.id, NOT NULL)
*   `title` (VARCHAR, NOT NULL)
*   `release_year` (INTEGER)
*   `cover_art_url` (VARCHAR)
*   `created_at` (TIMESTAMP)

**6. `Music_Tracks`**
*   `id` (PK, SERIAL)
*   `album_id` (FK -> Music_Albums.id, NOT NULL)
*   `title` (VARCHAR, NOT NULL)
*   `duration_seconds` (INTEGER)
*   `track_number` (INTEGER)
*   `audio_url` (VARCHAR)
*   `created_at` (TIMESTAMP)

**7. `Books`**
*   `id` (PK, SERIAL)
*   `segment_id` (FK -> Segments.id, NOT NULL)
*   `title` (VARCHAR, NOT NULL)
*   `description` (TEXT)
*   `publication_year` (INTEGER)
*   `cover_image_url` (VARCHAR)
*   `isbn` (VARCHAR)
*   `created_at` (TIMESTAMP)

**8. `Artworks`**
*   `id` (PK, SERIAL)
*   `segment_id` (FK -> Segments.id, NOT NULL)
*   `title` (VARCHAR, NOT NULL)
*   `description` (TEXT)
*   `creation_year` (INTEGER)
*   `image_url` (VARCHAR)
*   `created_at` (TIMESTAMP)

---

### Связующие таблицы

**9. `Taggings` (Полиморфная связь для Topics)**
*   `topic_id` (FK -> Topics.id, NOT NULL)
*   `taggable_id` (INTEGER, NOT NULL)
*   `taggable_type` (VARCHAR, NOT NULL) -- 'creator', 'movie', 'album', 'book', 'artwork'
*   PRIMARY KEY (`topic_id`, `taggable_id`, `taggable_type`)

**10. `Movie_Directors`**
*   `movie_id` (FK -> Movies.id, NOT NULL)
*   `creator_id` (FK -> Creators.id, NOT NULL)
*   PRIMARY KEY (`movie_id`, `creator_id`)

**11. `Album_Artists`**
*   `album_id` (FK -> Music_Albums.id, NOT NULL)
*   `creator_id` (FK -> Creators.id, NOT NULL)
*   PRIMARY KEY (`album_id`, `creator_id`)

**12. `Book_Authors`**
*   `book_id` (FK -> Books.id, NOT NULL)
*   `creator_id` (FK -> Creators.id, NOT NULL)
*   PRIMARY KEY (`book_id`, `creator_id`)

**13. `Artwork_Artists`**
*   `artwork_id` (FK -> Artworks.id, NOT NULL)
*   `creator_id` (FK -> Creators.id, NOT NULL)
*   PRIMARY KEY (`artwork_id`, `creator_id`)



















-- Справочные таблицы
CREATE TABLE segments (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL, -- 'instincts', 'intellect', 'balance'
    name VARCHAR(255) NOT NULL
);

CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL, -- 'eas', 'selfx', 'live', 'doc', 'srl'
    name VARCHAR(255) NOT NULL
);

-- Основные сущности
CREATE TABLE creators (
    id SERIAL PRIMARY KEY,
    segment_id INT NOT NULL REFERENCES segments(id),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    photo_url VARCHAR(255),
    birth_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    segment_id INT NOT NULL REFERENCES segments(id),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_year INT,
    duration_minutes INT,
    poster_url VARCHAR(255),
    video_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE music_albums (
    id SERIAL PRIMARY KEY,
    segment_id INT NOT NULL REFERENCES segments(id),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    release_year INT,
    cover_art_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE music_tracks (
    id SERIAL PRIMARY KEY,
    album_id INT NOT NULL REFERENCES music_albums(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    duration_seconds INT,
    track_number INT,
    audio_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    segment_id INT NOT NULL REFERENCES segments(id),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    publication_year INT,
    cover_image_url VARCHAR(255),
    isbn VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE artworks (
    id SERIAL PRIMARY KEY,
    segment_id INT NOT NULL REFERENCES segments(id),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    creation_year INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Связующие таблицы
CREATE TABLE taggings (
    topic_id INT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    taggable_id INT NOT NULL,
    taggable_type VARCHAR(255) NOT NULL, -- 'creator', 'movie', 'album', 'book', 'artwork'
    PRIMARY KEY (topic_id, taggable_id, taggable_type)
);

CREATE TABLE movie_directors (
    movie_id INT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    creator_id INT NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, creator_id)
);

CREATE TABLE album_artists (
    album_id INT NOT NULL REFERENCES music_albums(id) ON DELETE CASCADE,
    creator_id INT NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    PRIMARY KEY (album_id, creator_id)
);

CREATE TABLE book_authors (
    book_id INT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    creator_id INT NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, creator_id)
);

CREATE TABLE artwork_artists (
    artwork_id INT NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
    creator_id INT NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    PRIMARY KEY (artwork_id, creator_id)
);



openapi: 3.0.0
info:
  title: Content Aggregator API
  version: 1.0.0
  description: API for aggregating movies, music, books, and artworks.
servers:
  - url: /api/v1

paths:
  /segments:
    get:
      summary: Get all segments
      responses:
        '200':
          description: A list of segments
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Segment'
  /topics:
    get:
      summary: Get all topics
      responses:
        '200':
          description: A list of topics
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Topic'
  /music:
    get:
      summary: Get music feed (albums and creators)
      parameters:
        - $ref: '#/components/parameters/SegmentQuery'
        - $ref: '#/components/parameters/TopicQuery'
        - $ref: '#/components/parameters/ViewQuery'
        - $ref: '#/components/parameters/PageQuery'
        - $ref: '#/components/parameters/LimitQuery'
      responses:
        '200':
          description: A paginated list of music albums and creators
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MusicFeedResponse'
  /films:
    get:
      summary: Get films feed (movies and creators)
      parameters:
        - $ref: '#/components/parameters/SegmentQuery'
        - $ref: '#/components/parameters/TopicQuery'
        - $ref: '#/components/parameters/ViewQuery'
        - $ref: '#/components/parameters/PageQuery'
        - $ref: '#/components/parameters/LimitQuery'
      responses:
        '200':
          description: A paginated list of movies and creators
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FilmsFeedResponse'
  
  # ... (Analogous paths for /books and /artworks) ...

  /creators/slug/{slug}:
    get:
      summary: Get a creator by slug
      parameters:
        - name: slug
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Detailed creator information
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreatorFull'
  /albums/slug/{slug}:
    get:
      summary: Get a music album by slug
      parameters:
        - name: slug
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Detailed album information
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MusicAlbumFull'
  
  # ... (Analogous paths for /movies/slug/{slug}, /books/slug/{slug}, etc.) ...

components:
  parameters:
    SegmentQuery:
      name: segment
      in: query
      schema:
        type: string
        enum: [instincts, intellect, balance]
    TopicQuery:
      name: topic
      in: query
      schema:
        type: string
        enum: [eas, selfx, live, doc, srl]
    ViewQuery:
      name: view
      in: query
      schema:
        type: string
        enum: [works, creators]
    PageQuery:
      name: page
      in: query
      schema:
        type: integer
        default: 1
    LimitQuery:
      name: limit
      in: query
      schema:
        type: integer
        default: 20

  schemas:
    # Base Entities
    Creator:
      type: object
      properties:
        id:
          type: integer
        slug:
          type: string
        name:
          type: string
        photo_url:
          type: string
    Movie:
      type: object
      properties:
        id:
          type: integer
        slug:
          type: string
        title:
          type: string
        poster_url:
          type: string
        release_year:
          type: integer
    MusicAlbum:
      type: object
      properties:
        id:
          type: integer
        slug:
          type: string
        title:
          type: string
        cover_art_url:
          type: string
        release_year:
          type: integer
    
    # ... (Analogous base schemas for Book, Artwork, MusicTrack) ...
    MusicTrack:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        duration_seconds:
          type: integer
        track_number:
          type: integer
        audio_url:
          type: string

    # Reference Entities
    Segment:
      type: object
      properties:
        code:
          type: string
        name:
          type: string
    Topic:
      type: object
      properties:
        slug:
          type: string
        name:
          type: string

    # Feed Items (with discriminator)
    CreatorFeedItem:
      allOf:
        - $ref: '#/components/schemas/Creator'
        - type: object
          properties:
            type:
              type: string
              enum: [creator]
    MovieFeedItem:
      allOf:
        - $ref: '#/components/schemas/Movie'
        - type: object
          properties:
            type:
              type: string
              enum: [movie]
    MusicAlbumFeedItem:
      allOf:
        - $ref: '#/components/schemas/MusicAlbum'
        - type: object
          properties:
            type:
              type: string
              enum: [album]
              
    # Feed Responses
    Pagination:
      type: object
      properties:
        total_items:
          type: integer
        total_pages:
          type: integer
        current_page:
          type: integer
    
    MusicFeedResponse:
      type: object
      properties:
        pagination:
          $ref: '#/components/schemas/Pagination'
        data:
          type: array
          items:
            oneOf:
              - $ref: '#/components/schemas/MusicAlbumFeedItem'
              - $ref: '#/components/schemas/CreatorFeedItem'
              
    FilmsFeedResponse:
      type: object
      properties:
        pagination:
          $ref: '#/components/schemas/Pagination'
        data:
          type: array
          items:
            oneOf:
              - $ref: '#/components/schemas/MovieFeedItem'
              - $ref: '#/components/schemas/CreatorFeedItem'

    # Full Detail Models
    CreatorFull:
      allOf:
        - $ref: '#/components/schemas/Creator'
        - type: object
          properties:
            bio:
              type: string
            birth_date:
              type: string
              format: date
            works:
              type: object
              properties:
                movies:
                  type: array
                  items:
                    $ref: '#/components/schemas/Movie'
                music_albums:
                  type: array
                  items:
                    $ref: '#/components/schemas/MusicAlbum'
                # ... (books, artworks) ...
    
    MusicAlbumFull:
      allOf:
        - $ref: '#/components/schemas/MusicAlbum'
        - type: object
          properties:
            artists:
              type: array
              items:
                $ref: '#/components/schemas/Creator'
            tracks:
              type: array
              items:
                $ref: '#/components/schemas/MusicTrack'
                
    # ... (Analogous full schemas for MovieFull, BookFull, etc.) ...






    export type NavSegments = typeof NAV_SEGMENTS[keyof typeof NAV_SEGMENTS];
export type SegmentCategory<S extends NavSegments> = (typeof SEGMENT_CATEGORIES)[S][number];
export type SegmentRoutes<S extends NavSegments> = Record<SegmentCategory<S>, string>;

export const NAV_SEGMENTS = {
  INSTINCTS: "instincts",
  INTELLECT: "intellect",
  BALANCE: "balance",
} as const;

export const SEGMENT_CATEGORIES = {
  [NAV_SEGMENTS.INSTINCTS]: ["music", "movies", "books", "art"] as const,
  [NAV_SEGMENTS.INTELLECT]: ["music", "movies", "books", "art"] as const,
  [NAV_SEGMENTS.BALANCE]: ["music", "movies", "books", "art"] as const,
} as const;

function buildRZSegmentRoutes<S extends NavSegments>(
  segment: S
): SegmentRoutes<S> {
  return Object.fromEntries(
    SEGMENT_CATEGORIES[segment].map((category) => [
      category,
      `/rz/${segment}/${category}`,
    ])
  ) as SegmentRoutes<S>;
}

export const ROUTES = {
  feed: "/feed",
  radio: "/radio",
  rz: {
    root: "/rz",
    [NAV_SEGMENTS.INSTINCTS]: buildRZSegmentRoutes(NAV_SEGMENTS.INSTINCTS),
    [NAV_SEGMENTS.INTELLECT]: buildRZSegmentRoutes(NAV_SEGMENTS.INTELLECT),
    [NAV_SEGMENTS.BALANCE]: buildRZSegmentRoutes(NAV_SEGMENTS.BALANCE),
  },
} as const;

/**
 * Возвращает URL для страницы списка (фида) категории.
 * @example /rz/instincts/music
 */
export const getRzCategoryRoute = <S extends NavSegments>(
  segment: S,
  category: SegmentCategory<S>
) => {
  return ROUTES.rz[segment][category];
};

/**
 * Возвращает URL для страницы детализации работы (фильма, альбома и т.д.).
 * @example /rz/instincts/music/works/everyday-robots
 */
export const getRzWorkRoute = <S extends NavSegments>(
  segment: S,
  category: SegmentCategory<S>,
  workSlug: string
) => {
  return `/rz/${segment}/${category}/works/${workSlug}`;
};

/**
 * Возвращает канонический URL для страницы детализации создателя.
 * @example /rz/instincts/creators/damon-albarn
 */
export const getRzCreatorRoute = <S extends NavSegments>(
  segment: S,
  creatorSlug: string
) => {
  return `/rz/${segment}/creators/${creatorSlug}`;
};






-- Основные таблицы (улучшенный нейминг: descriptive, consistent prefixes)

CREATE TABLE content_creators (
    id SERIAL PRIMARY KEY,
    segment_id INT NOT NULL REFERENCES segments(id),
    slug VARCHAR(500) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,  -- Улучшено: name -> full_name
    biography TEXT,
    profile_image_url VARCHAR(500),
    birth_date DATE,
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    segment_id INT NOT NULL REFERENCES segments(id),
    slug VARCHAR(500) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    synopsis TEXT,  -- Улучшено: description -> synopsis
    publication_year INT CHECK (publication_year >= 1900 AND publication_year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    runtime_minutes INT CHECK (runtime_minutes > 0),  -- Улучшено: duration_minutes -> runtime_minutes
    poster_image_url VARCHAR(500),
    poster_media_mime_type VARCHAR(50),
    trailer_video_url VARCHAR(500),  -- Улучшено: video_url -> trailer_video_url
    embedded_directors JSONB DEFAULT '[]'::JSONB,  -- Улучшено: directors -> embedded_directors
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE music_releases (
    id SERIAL PRIMARY KEY,
    segment_id INT NOT NULL REFERENCES segments(id),
    slug VARCHAR(500) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    publication_year INT CHECK (publication_year >= 1900 AND publication_year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    release_cover_image_url VARCHAR(500),  -- Улучшено: cover_art_url -> release_cover_image_url
    cover_media_mime_type VARCHAR(50),
    embedded_artists JSONB DEFAULT '[]'::JSONB,  -- Улучшено: artists -> embedded_artists
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE music_tracks (
    id SERIAL PRIMARY KEY,
    release_id INT NOT NULL REFERENCES music_releases(id) ON DELETE SET NULL,  -- Улучшено: album_id -> release_id
    title VARCHAR(255) NOT NULL,
    track_duration_seconds INT CHECK (track_duration_seconds > 0),  -- Улучшено: duration_seconds -> track_duration_seconds
    track_sequence_number INT CHECK (track_sequence_number > 0),  -- Улучшено: track_number -> track_sequence_number
    audio_file_url VARCHAR(500),
    audio_media_mime_type VARCHAR(50),
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    segment_id INT NOT NULL REFERENCES segments(id),
    slug VARCHAR(500) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    synopsis TEXT,  -- Улучшено: description -> synopsis
    publication_year INT CHECK (publication_year >= 1900 AND publication_year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    cover_image_url VARCHAR(500),
    cover_media_mime_type VARCHAR(50),
    isbn VARCHAR(20),
    embedded_authors JSONB DEFAULT '[]'::JSONB,  -- Улучшено: authors -> embedded_authors
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE visual_artworks (
    id SERIAL PRIMARY KEY,
    segment_id INT NOT NULL REFERENCES segments(id),
    slug VARCHAR(500) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    creation_year INT CHECK (creation_year >= 1000 AND creation_year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    artwork_image_url VARCHAR(500),  -- Улучшено: image_url -> artwork_image_url
    image_media_mime_type VARCHAR(50),
    embedded_artists JSONB DEFAULT '[]'::JSONB,  -- Уже было, но consistently
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Связующие таблицы (улучшенный нейминг: associations для many-to-many)

CREATE TABLE content_taggings (
    topic_id INT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    taggable_id INT NOT NULL,
    taggable_type VARCHAR(255) NOT NULL CHECK (taggable_type IN ('content_creator', 'film', 'music_release', 'book', 'visual_artwork')),  -- Улучшено: обновлён enum
    PRIMARY KEY (topic_id, taggable_id, taggable_type)
);

CREATE TABLE film_director_associations (
    film_id INT NOT NULL REFERENCES films(id) ON DELETE SET NULL,
    creator_id INT NOT NULL REFERENCES content_creators(id) ON DELETE CASCADE,  -- Улучшено: creator_id -> creator_id (consistent), но таблица descriptive
    PRIMARY KEY (film_id, creator_id)
);

CREATE TABLE music_artist_associations (
    release_id INT NOT NULL REFERENCES music_releases(id) ON DELETE SET NULL,  -- Улучшено: album_id -> release_id
    creator_id INT NOT NULL REFERENCES content_creators(id) ON DELETE CASCADE,
    PRIMARY KEY (release_id, creator_id)
);

CREATE TABLE book_author_associations (
    book_id INT NOT NULL REFERENCES books(id) ON DELETE SET NULL,
    creator_id INT NOT NULL REFERENCES content_creators(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, creator_id)
);

CREATE TABLE artwork_artist_associations (
    artwork_id INT NOT NULL REFERENCES visual_artworks(id) ON DELETE SET NULL,
    creator_id INT NOT NULL REFERENCES content_creators(id) ON DELETE CASCADE,
    PRIMARY KEY (artwork_id, creator_id)
);

-- Функции и триггеры (обновлены под новые имена)

-- Функция для updated_at (без изменений)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры для updated_at (обновлены имена таблиц)
CREATE TRIGGER update_content_creators_updated_at BEFORE UPDATE ON content_creators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_films_updated_at BEFORE UPDATE ON films FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_music_releases_updated_at BEFORE UPDATE ON music_releases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_music_tracks_updated_at BEFORE UPDATE ON music_tracks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_visual_artworks_updated_at BEFORE UPDATE ON visual_artworks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_taggings_updated_at BEFORE UPDATE ON content_taggings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Функции для денормализации (обновлены)

-- Для films.embedded_directors
CREATE OR REPLACE FUNCTION update_film_directors() RETURNS TRIGGER AS $$
BEGIN
    UPDATE films 
    SET embedded_directors = COALESCE((
        SELECT jsonb_agg(jsonb_build_object('id', cc.id, 'slug', cc.slug, 'full_name', cc.full_name))
        FROM film_director_associations fda 
        JOIN content_creators cc ON fda.creator_id = cc.id 
        WHERE fda.film_id = COALESCE(NEW.film_id, OLD.film_id)
    ), '[]'::JSONB)
    WHERE id = COALESCE(NEW.film_id, OLD.film_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_film_directors 
AFTER INSERT OR UPDATE OR DELETE ON film_director_associations 
FOR EACH ROW EXECUTE FUNCTION update_film_directors();

-- Для music_releases.embedded_artists
CREATE OR REPLACE FUNCTION update_music_artist_associations() RETURNS TRIGGER AS $$
BEGIN
    UPDATE music_releases 
    SET embedded_artists = COALESCE((
        SELECT jsonb_agg(jsonb_build_object('id', cc.id, 'slug', cc.slug, 'full_name', cc.full_name))
        FROM music_artist_associations maa 
        JOIN content_creators cc ON maa.creator_id = cc.id 
        WHERE maa.release_id = COALESCE(NEW.release_id, OLD.release_id)
    ), '[]'::JSONB)
    WHERE id = COALESCE(NEW.release_id, OLD.release_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_music_artist_associations 
AFTER INSERT OR UPDATE OR DELETE ON music_artist_associations 
FOR EACH ROW EXECUTE FUNCTION update_music_artist_associations();

-- Для books.embedded_authors
CREATE OR REPLACE FUNCTION update_book_authors() RETURNS TRIGGER AS $$
BEGIN
    UPDATE books 
    SET embedded_authors = COALESCE((
        SELECT jsonb_agg(jsonb_build_object('id', cc.id, 'slug', cc.slug, 'full_name', cc.full_name))
        FROM book_author_associations baa 
        JOIN content_creators cc ON baa.creator_id = cc.id 
        WHERE baa.book_id = COALESCE(NEW.book_id, OLD.book_id)
    ), '[]'::JSONB)
    WHERE id = COALESCE(NEW.book_id, OLD.book_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_book_authors 
AFTER INSERT OR UPDATE OR DELETE ON book_author_associations 
FOR EACH ROW EXECUTE FUNCTION update_book_authors();

-- Для visual_artworks.embedded_artists
CREATE OR REPLACE FUNCTION update_artwork_artists() RETURNS TRIGGER AS $$
BEGIN
    UPDATE visual_artworks 
    SET embedded_artists = COALESCE((
        SELECT jsonb_agg(jsonb_build_object('id', cc.id, 'slug', cc.slug, 'full_name', cc.full_name))
        FROM artwork_artist_associations aaa 
        JOIN content_creators cc ON aaa.creator_id = cc.id 
        WHERE aaa.artwork_id = COALESCE(NEW.artwork_id, OLD.artwork_id)
    ), '[]'::JSONB)
    WHERE id = COALESCE(NEW.artwork_id, OLD.artwork_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_artwork_artists 
AFTER INSERT OR UPDATE OR DELETE ON artwork_artist_associations 
FOR EACH ROW EXECUTE FUNCTION update_artwork_artists();

-- Триггер для обновления при изменениях в content_creators (full_name/slug)
CREATE OR REPLACE FUNCTION propagate_creator_changes() RETURNS TRIGGER AS $$
BEGIN
    -- Обновляем все связанные films (перестройка JSONB)
    UPDATE films 
    SET embedded_directors = (
        SELECT jsonb_agg(jsonb_build_object('id', cc.id, 'slug', cc.slug, 'full_name', cc.full_name))
        FROM film_director_associations fda JOIN content_creators cc ON fda.creator_id = cc.id
        WHERE fda.film_id = films.id
    )
    WHERE films.id IN (SELECT film_id FROM film_director_associations WHERE creator_id = NEW.id);
    
    -- Аналогично для music_releases, books, visual_artworks (расширь по необходимости)
    -- ... (добавь UPDATE для других)
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_propagate_creator_changes 
AFTER UPDATE OF full_name, slug ON content_creators 
FOR EACH ROW EXECUTE FUNCTION propagate_creator_changes();

-- Индексы (обновлены под новые имена)
CREATE INDEX idx_content_creators_segment_id ON content_creators(segment_id);
CREATE INDEX idx_content_creators_slug ON content_creators(slug);
CREATE INDEX idx_films_segment_id ON films(segment_id);
CREATE INDEX idx_films_slug ON films(slug);
CREATE INDEX idx_films_embedded_directors_gin ON films USING GIN (embedded_directors);
CREATE INDEX idx_music_releases_segment_id ON music_releases(segment_id);
CREATE INDEX idx_music_releases_slug ON music_releases(slug);
CREATE INDEX idx_music_releases_embedded_artists_gin ON music_releases USING GIN (embedded_artists);
CREATE INDEX idx_music_tracks_release_id ON music_tracks(release_id);
CREATE INDEX idx_books_segment_id ON books(segment_id);
CREATE INDEX idx_books_slug ON books(slug);
CREATE INDEX idx_books_embedded_authors_gin ON books USING GIN (embedded_authors);
CREATE INDEX idx_visual_artworks_segment_id ON visual_artworks(segment_id);
CREATE INDEX idx_visual_artworks_slug ON visual_artworks(slug);
CREATE INDEX idx_visual_artworks_embedded_artists_gin ON visual_artworks USING GIN (embedded_artists);
CREATE INDEX idx_content_taggings_topic_id ON content_taggings(topic_id);
CREATE INDEX idx_content_taggings_type_id ON content_taggings(taggable_type, taggable_id);

-- Индексы для soft deletes
CREATE INDEX idx_films_deleted_at ON films(deleted_at) WHERE deleted_at IS NULL;
-- Аналогично для других таблиц (добавь по необходимости)