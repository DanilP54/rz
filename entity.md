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