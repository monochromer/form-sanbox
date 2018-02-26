# Form Sandbox

Небольшой сервер на Node.js для тестирования отправленных форм.

Адрес отправки - https://form-sandbox.herokuapp.com/  
Ответ - в виде json, например:
```json
{
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "d0b78a83-a40f-422b-87d8-840c920eff34",
    "user-agent": "PostmanRuntime/7.1.1",
    "accept": "*/*",
    "host": "some-host",
    "accept-encoding": "gzip, deflate",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443",
    "x-region": "eu",
    "x-forwarded-for": "0.0.0.0",
    "connection": "keep-alive"
  },
  "parsedUrl": {},
  "parsedBody": {}
}
```
