# prototype-client

## 배포

### 로컬

```sh
npm run build && docker build -t pilot/prototype-client . && docker run -p 20000:80 -d pilot/prototype-client
```

### gh-page

```sh
npm run build && npm run deploy
```