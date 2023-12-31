# URL-shortener-API

## Description

This is a URL shortener API. It takes a long URL and returns a short URL. When the short URL is visited, it redirects to the long URL.

## Installation

1. Clone the repository
2. Run `npm install`
3. Setup PostgreSQL database as you can see in `src/config/database.js`
4. Run `npm run start`

## Usage

### Create a short URL

Send a POST request to `/api/v1/url/shorten` with a JSON body containing the long URL.

Example:

```json
{
  "url": "https://www.github.com"
}
```

Response:

```json
{
  "shortUrl": "http://localhost:3000/V8E4X",
  "shortUrlCode": "V8E4X"
}
```

### Get long URL from short URL

Send a GET request to `/api/v1/url/shorten/:code` where `:code` is the short URL code.

Example:

```http
GET /api/v1/url/shorten/V8E4X
```

Response:

```json
{
  "url": "https://www.github.com"
}
```

### Front-end

You can use the front-end to create a short URL. It is available at `/`.

## License

[MIT](https://choosealicense.com/licenses/mit/)
