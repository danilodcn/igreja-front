FROM node:16-alpine3.15

RUN apk update && apk add git

CMD [ "sh", "tail", "-f", "/dev/null" ]