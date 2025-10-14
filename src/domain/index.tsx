interface Track {}

interface AudioTrack extends Track {}

interface VideoTrack extends Track {}

interface Creator {}

interface MusicCreator extends Creator {
    albums: MusicAlbum[]
}
interface VideoCreator extends Creator {
    movies: Movie[]
}
interface BooksCreator extends Creator {
    books: Book[]
}
interface ArtCreator extends Creator {
    albums: ArtAlbum[]
}

interface Album {}

interface MusicAlbum extends Album {
    tracks: AudioTrack[]
}
interface ArtAlbum extends Album {
    arts: Art[]
}

interface Book {}

interface Movie {
    track: VideoTrack
}

interface Art {}

interface User {}
interface Guest {}

// личный кабинет
interface PrivateCabinet {}








