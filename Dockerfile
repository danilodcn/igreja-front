FROM node:16-alpine3.15

RUN apk update && apk add git gpg gnupg gpg-agent socat

CMD [ "sh", "tail", "-f", "/dev/null" ]